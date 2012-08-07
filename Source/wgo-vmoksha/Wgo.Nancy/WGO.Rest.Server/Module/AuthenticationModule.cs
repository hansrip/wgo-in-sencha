using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Application.Model.Core;
using System.Dynamic;
using Nancy.Json;

namespace Nancy.Rest.Server.Module
{
    public class AuthenticationModule : ModuleBase
    {
        public AuthenticationModule()
            : base("/Authenticate")
        {
            Get["/"] = parameters =>
                {
                    string username = this.Request.Query.username;
                    string password = this.Request.Query.password;
                    string device = this.Request.Query.device;
                    var user = DocumentSession.Query<User>()
                        .Where(x => x.userName.Equals(username) && x.password.Equals(password))
                        .FirstOrDefault();
                    dynamic response = new ExpandoObject();
                    response.Success = !(user == null);
                    response.Message = string.Empty;                   
                    response.TotalCount = 1;
                    response.Data = user;
                    return new JavaScriptSerializer().Serialize(response);
                };
        }
    }
}