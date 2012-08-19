using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Quartz.Util;
using log4net.Config;
using System.IO;
using log4net;

namespace Chinook.QuartzScheduler
{
    public class StartTheScheduler
    {
  
       private static readonly IExample adpiorscomparerscheduler = ObjectUtils.InstantiateType<IExample>(typeof(AdpIorsComparerScheduler));
       private static readonly ILog log = LogManager.GetLogger(typeof(StartTheScheduler));
       /// <summary>
       /// 
       /// </summary>
       public StartTheScheduler()
       {
          
       }
       /// <summary>
       /// 
       /// </summary>
       public void Start()
       {
           
               
               try
               {
                   XmlConfigurator.Configure(new FileInfo(Path.Combine(
                                 AppDomain.CurrentDomain.BaseDirectory,
                                 "Chinook.QuartzScheduler.log4net.config")));

                   //IExample adpiorscomparerscheduler = ObjectUtils.InstantiateType<IExample>(eType);                   
                   adpiorscomparerscheduler.Run();                 
                   
               }
               catch (Exception ex)
               {
                   log.Error("Error running example: " + ex.Message);
                   log.Error(ex.ToString());
               }
          
       }
       public void Stop() {
           adpiorscomparerscheduler.Stop();
       }
      
    }
}
