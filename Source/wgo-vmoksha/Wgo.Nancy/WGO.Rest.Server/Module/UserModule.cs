using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Application.Model.Core;
using Nancy.ModelBinding;
using System.Dynamic;
using Nancy.Json;
using Nancy.Rest.Server.RavenDB;

namespace Nancy.Rest.Server.Module
{
    public class UserModule : ModuleBase
    {
        public UserModule(IUserRepository repository)
            : base("/User")
        {


            Get["/"] = parameters =>
            {
                repository.DocumentSession = this.DocumentSession;
                return this.JsonResponseString(repository.FindAll());
            };

            Post["/"] = parameters =>
            {
                var user = this.Bind<User>();
                //Implement unique username constraint.
                DocumentSession.Store(user);
                return Response.AsJson(user);
            };

            Get["/update/{id}"] = parameters =>
            {

                string username = this.Request.Query.username;
                string email = this.Request.Query.email;
                long id = parameters.id;
                //Implement unique username constraint.
                var user = DocumentSession.Query<User>().Where(x => x.Id == id).FirstOrDefault();
                user.username = username;
                user.email = email;
                DocumentSession.Store(user);
                return Response.AsJson(user);
            };

            //List all the employees reporting to a given manager
            Get["/Data/Load"] = parameters =>
            {
                var senthil = new User { username = "senthil", password = "senthil", DateCreated = Convert.ToDateTime("2012-08-06") };
                var karthiga = new User { username = "karthiga", password = "karthiga", DateCreated = Convert.ToDateTime("2012-08-06") };
                var sivaprasad = new User { username = "sivaprasad", password = "sivaprasad", DateCreated = Convert.ToDateTime("2012-08-06") };
                var ramaraju = new User { username = "ramaraju", password = "ramaraju", DateCreated = Convert.ToDateTime("2012-08-06") };
                var princeton = new User { username = "princeton", password = "princeton", DateCreated = Convert.ToDateTime("2012-08-06") };
                var swathi = new User { username = "swathi", password = "swathi", DateCreated = Convert.ToDateTime("2012-08-06") };

                List<User> users = new List<User>();
                users.Add(senthil);
                users.Add(karthiga);
                users.Add(sivaprasad);
                users.Add(princeton);
                users.Add(swathi);
                users.Add(ramaraju);
                users.ForEach(delegate(User user) { DocumentSession.Store(user); });
                return Response.AsJson("Users loaded successfully into RavenDB");
            };
        }
    }
}