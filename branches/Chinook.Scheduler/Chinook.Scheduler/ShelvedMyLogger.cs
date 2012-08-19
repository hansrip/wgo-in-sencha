using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Topshelf.Shelving;
using Topshelf.Configuration.Dsl;
using log4net.Config;
using System.IO;

namespace Chinook.TopShelfService
{
   public class ShelvedMyLogger : Bootstrapper<MyLogger>
   {
       public void InitializeHostedService(IServiceConfigurator<MyLogger> cfg)
       {
           cfg.HowToBuildService(n => new MyLogger());
           cfg.WhenStarted(s =>
           {
               XmlConfigurator.Configure(new FileInfo(Path.Combine(
                              AppDomain.CurrentDomain.BaseDirectory,
                              "Chinook.TopShelfService.log4net.config")));//
               s.Start();
           });
           cfg.WhenStopped(s => s.Stop());
       }
   }
}
