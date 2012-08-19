using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Chinook.QuartzScheduler
{
   public class Program
    {
       [STAThread]
       public static void Main()
       {
           new StartTheScheduler().Start();
       }
    }
}
