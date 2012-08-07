using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;
using Raven.Client;
using Nancy.Extensions;
using Nancy.Json;
using System.Dynamic;
using log4net;

namespace Nancy.Rest.Server.Module
{
    //http://elegantcode.com/2010/11/28/introducing-nancy-a-lightweight-web-framework-inspired-by-sinatra/
    //http://stuff-for-geeks.com/category/RavenDB.aspx
    //http://iamnotmyself.com/2011/04/22/new-sample-nancyfx-app-tickerviewer/
    //http://www.picnet.com.au/blogs/Guido/post/2011/03/22/Understanding-Nancy-Sinatra-for-Net.aspx
    public abstract class ModuleBase : NancyModule
    {
        protected ModuleBase()
        {
           
        }

        protected ModuleBase(string modulePath)
            : base(modulePath)
        {
           
        }

        public IDocumentSession DocumentSession
        {
            get { return Context.Items["RavenSession"] as IDocumentSession; }           
        }

        public IDocumentStore DocumentStore
        {
            get { return Context.Items["RavenStore"] as IDocumentStore; }
        }

        public ILog Logger { get {return (ILog)Context.Items["logger"];} }
        
         //response.Success = true;
         //       response.Message = string.Empty;
         //       response.PageIndex = 0;
         //       response.PageSize = 0;
         //       response.TotalCount = employees.Count;
         //       response.Data = employees;
         //       return new JavaScriptSerializer().Serialize(response);

        public String JsonResponseString(Object entity)
        {
            dynamic response = new ExpandoObject();
            response.Success = true;
            response.Data = entity;
            return new JavaScriptSerializer().Serialize(response);
        }



    }
}