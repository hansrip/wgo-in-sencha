using Nancy;
using Nancy.Bootstrapper;
using Nancy.Rest.Server.RavenDB;
using log4net.Config;
using log4net;
namespace Nancy.Rest.Server
{
    public class Bootstrapper : DefaultNancyBootstrapper
{
    protected override NancyInternalConfiguration InternalConfiguration
    {
        get { return NancyInternalConfiguration.WithOverrides(x => x.NancyModuleBuilder = typeof(RavenSessionModule)); }
    }
    protected override void ApplicationStartup(TinyIoC.TinyIoCContainer container, Nancy.Bootstrapper.IPipelines pipelines)
    {
        base.ApplicationStartup(container, pipelines);
        XmlConfigurator.Configure();
    }


    protected override void RegisterInstances(TinyIoC.TinyIoCContainer container, System.Collections.Generic.IEnumerable<InstanceRegistration> instanceRegistrations)
    {
        base.RegisterInstances(container, instanceRegistrations);
        container.Register(typeof(ILog), (c, o) => LogManager.GetLogger(typeof(Bootstrapper)));
    }

    protected override void RequestStartup(TinyIoC.TinyIoCContainer container, IPipelines pipelines, NancyContext context)
    {
        base.RequestStartup(container, pipelines, context);
        var logger = container.Resolve<ILog>();       
        pipelines.BeforeRequest += c =>
        {
            c.Items.Add("logger", logger);         
            return null;
        };


        pipelines.AfterRequest += c =>
        {
            
        };

        pipelines.OnError += (c, e) =>
        {
            logger.ErrorFormat("Error on request({0}):{1}", c.Request.Url, e.Message);
            return c.Response;
        };

    }
}
}
