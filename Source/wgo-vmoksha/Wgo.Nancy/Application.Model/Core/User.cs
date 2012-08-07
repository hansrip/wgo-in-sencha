using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Application.Model.Core
{
   public class User : EntityBase
    {
       public string userName { get; set; }
       public string password { get; set; }
       public string email { get; set; }  

       protected override void CheckForBrokenRules()
       {
           throw new NotImplementedException();
       }
    }
}
