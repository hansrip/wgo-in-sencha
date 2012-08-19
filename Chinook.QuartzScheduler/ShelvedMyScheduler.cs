using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Topshelf.Shelving;
using Topshelf.Configuration.Dsl;
using log4net.Config;
using System.IO;

namespace Chinook.QuartzScheduler
{
    public class ShelvedMyScheduler : Bootstrapper<StartTheScheduler>
   {
        public void InitializeHostedService(IServiceConfigurator<StartTheScheduler> cfg)
       {
           cfg.HowToBuildService(n => new StartTheScheduler());
           cfg.WhenStarted(s =>
           {
               s.Start();
           });
           cfg.WhenStopped(s => s.Stop());
       }

       
   }
}
