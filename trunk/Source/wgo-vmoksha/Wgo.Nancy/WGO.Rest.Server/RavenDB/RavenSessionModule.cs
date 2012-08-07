using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy.Routing;
using Nancy.ViewEngines;
using Nancy;
using Nancy.ModelBinding;
using Raven.Client;

using System.IO;
using log4net;

namespace Nancy.Rest.Server.RavenDB
{
    public class RavenSessionModule : INancyModuleBuilder
    {
        private readonly IViewFactory viewFactory;
        private readonly IResponseFormatterFactory responseFormatterFactory;
        private readonly IModelBinderLocator modelBinderLocator;
        private readonly IRavenSessionManager _ravenSessionProvider;

        public RavenSessionModule(IViewFactory viewFactory, IResponseFormatterFactory responseFormatterFactory,
                                       IModelBinderLocator modelBinderLocator,
                                       IRavenSessionManager ravenSessionProvider)
        {
            this.viewFactory = viewFactory;
            this.responseFormatterFactory = responseFormatterFactory;
            this.modelBinderLocator = modelBinderLocator;
            _ravenSessionProvider = ravenSessionProvider;
        }

        public NancyModule BuildModule(NancyModule module, NancyContext context)
        {
            module.Context = context;
            module.Response = this.responseFormatterFactory.Create(context);
            module.ViewFactory = this.viewFactory;
            module.ModelBinderLocator = this.modelBinderLocator;
            context.Items.Add("RavenStore", _ravenSessionProvider.GetDocumentStore());
            context.Items.Add("RavenSession", _ravenSessionProvider.GetSession());            
            module.After.AddItemToStartOfPipeline(ctx =>
            {
                //Add start time             
                ctx.Items.Add("start_time", DateTime.Now);                 
                var session =ctx.Items["RavenSession"] as IDocumentSession;
                session.SaveChanges();
                session.Dispose();
            });
            module.After.AddItemToEndOfPipeline(PrepareJsonp);           
            return module;
        }

        private static void PrepareJsonp(NancyContext context) {

            //Step1: Adds processing time to header           
            var processTime = (DateTime.Now - (DateTime)context.Items["start_time"]).TotalMilliseconds;
            context.Response.WithHeader("x-processing-time", processTime.ToString() + "ms");

            //Step2: Logs the Processing time
            var logger = (ILog)context.Items["logger"];            
            logger.DebugFormat("Processing Time for {0} is {1} ", context.Request.Url, context.Response.Headers["x-processing-time"]);
            context.Items.Add("x-processing-time", context.Response.Headers["x-processing-time"]);

            if (!context.Response.ContentType.Contains("image"))
            {
           

            //Step3: Prepares Jsonp object
            bool hasCallback = context.Request.Query["callback"].HasValue;            
            Action<Stream> original = context.Response.Contents;
            string callback = (hasCallback) ? context.Request.Query["callback"] : "callback";//context.Request.Query["callback"].value;
            context.Response.ContentType = "application/javascript"; 
            context.Response.Contents = stream =>
                {
                    StreamWriter writer = new StreamWriter(stream);
                    writer.AutoFlush = true;
                    writer.Write("{0}(", callback);
                    original(stream);
                    writer.Write(");");
                };
            }
            
        }

     
    }
}