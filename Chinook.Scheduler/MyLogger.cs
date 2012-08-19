using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Timers;
using log4net;

namespace Chinook.TopShelfService
{
   public class MyLogger
    {
       
        readonly Timer _timer;
        readonly ILog _log = LogManager.GetLogger(typeof(MyLogger));

        public MyLogger()
        {
            _timer = new Timer(1000) { AutoReset = true };
            _timer.Elapsed += (sender, eventArgs) => _log.Info("Senthilnathan ->" + DateTime.Now.ToString());
        }
        public void Start() { _timer.Start(); }
        public void Stop() { _timer.Stop(); }
    }
}
