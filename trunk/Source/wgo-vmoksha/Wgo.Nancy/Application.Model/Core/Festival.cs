using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.Model.Core
{
   public class Festival :EntityBase
    {
       public string name { get; set; }
       public string details { get; set; }
       public string city { get; set; }
       public string period { get; set; }
       public string timings { get; set; }
       public string telephone { get; set; }  
       protected override void CheckForBrokenRules()
       {
           throw new NotImplementedException();
       }
    }
}
