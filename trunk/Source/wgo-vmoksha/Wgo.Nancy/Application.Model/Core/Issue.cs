using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.Model.Core
{
   public class Issue : EntityBase
    {
       public string month { get; set; }
       public long year { get; set; }
       public string coverpage { get; set; }  
       public long sort { get; set; }  
       protected override void CheckForBrokenRules()
       {
           throw new NotImplementedException();
       }
    }
}
