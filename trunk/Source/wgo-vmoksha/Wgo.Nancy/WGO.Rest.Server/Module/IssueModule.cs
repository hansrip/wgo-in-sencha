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
    public class IssueModule : ModuleBase
    {
        public IssueModule(IIssueRepository repository)
            : base("/Issues")
        {


            Get["/"] = parameters =>
            {
                repository.DocumentSession = this.DocumentSession;
                return this.JsonResponseString(repository.FindAll());
            };
            Get["/Paginate"] = parameters =>
            {
                Int32 page = (this.Request.Query.page != null && this.Request.Query.page != "0") ? (this.Request.Query.page - 1) : 0;
                Int32 limit = this.Request.Query.limit != null ? this.Request.Query.limit : 0;
                //not being used currently
                Int32 start = this.Request.Query.start != null ? this.Request.Query.start : 0;
                repository.DocumentSession = this.DocumentSession;
                //pagination              
                var issues = repository.FindAll().Skip(page * limit).Take(limit);
                dynamic response = new ExpandoObject();
                response.Success = true;
                response.Data = issues;
                response.CurrentPage = page * limit;
                response.PageSize = limit;
                return new JavaScriptSerializer().Serialize(response);
            };

            Post["/"] = parameters =>
            {
                var user = this.Bind<User>();
                //Implement unique username constraint.
                DocumentSession.Store(user);
                return Response.AsJson(user);
            };

            //List all the employees reporting to a given manager
            Get["/Data/Load"] = parameters =>
            {
            var issue1=new Issue {month= "January",year= 2011, coverpage= "jan-2011.png",sort=1};
            var issue2=new Issue {month= "February",year= 2011, coverpage= "feb-2011.png",sort=2};
            var issue3=new Issue{month= "March",year= 2011, coverpage= "mar-2011.png",sort=3};
            var issue4=new Issue{month= "April",year= 2011, coverpage= "apr-2011.png",sort=4};
            var issue5=new Issue{month= "May",year= 2011, coverpage= "may-2011.png",sort=5};
            var issue6=new Issue{month= "June",year= 2011, coverpage= "jun-2011.png",sort=6};
            var issue7=new Issue{month= "July",year= 2011, coverpage= "jul-2011.png",sort=7};
            var issue8=new Issue{month= "August",year= 2011, coverpage= "aug-2011.png",sort=8};
            var issue9=new Issue{month= "September",year= 2011, coverpage= "sep-2011.png",sort=9};
            var issue10=new Issue{month= "October",year= 2011, coverpage= "oct-2011.png",sort=10};
            var issue11=new Issue{month= "November",year= 2011, coverpage= "nov-2011.png",sort=11};
            var issue12=new Issue{month= "December",year= 2011, coverpage= "dec-2011.png",sort=12};
            var issue13=new Issue{month= "January",year= 2012, coverpage= "jan-2012.png",sort=1};
            var issue14=new Issue{month= "February",year= 2012, coverpage= "feb-2012.png",sort=2};
            var issue15=new Issue{month= "March",year= 2012, coverpage= "mar-2012.png",sort=3};
            var issue16=new Issue{month= "April",year= 2012, coverpage= "apr-2012.png",sort=4};
            var issue17=new Issue{month= "May",year= 2012, coverpage= "may-2012.png",sort=5};
            var issue18=new Issue{month= "June",year= 2012, coverpage= "jun-2012.png",sort=6};
            var issue19=new Issue{month= "July",year= 2012, coverpage= "jul-2012.png",sort=7};
            var issue20=new Issue{month= "August",year= 2012, coverpage= "aug-2012.png",sort=8};
            var issue21=new Issue{month= "September",year= 2012, coverpage= "sep-2012.png",sort=9};
            var issue22=new Issue{month= "October",year= 2012, coverpage= "oct-2012.png",sort=10};
            var issue23=new Issue{month= "November",year= 2012, coverpage= "nov-2012.png",sort=11};
            var issue24=new Issue{month= "December",year= 2012, coverpage= "dec-2012.png",sort=12};


            List<Issue> issues = new List<Issue>();
            issues.Add(issue1);
            issues.Add(issue2);
            issues.Add(issue3);
            issues.Add(issue4);
            issues.Add(issue5);
            issues.Add(issue6);
            issues.Add(issue7);
            issues.Add(issue8);
            issues.Add(issue9);
            issues.Add(issue10);
            issues.Add(issue11);
            issues.Add(issue12);
            issues.Add(issue13);
            issues.Add(issue14);
            issues.Add(issue15);
            issues.Add(issue16);
            issues.Add(issue17);
            issues.Add(issue18);
            issues.Add(issue19);
            issues.Add(issue20);
            issues.Add(issue21);
            issues.Add(issue22);
            issues.Add(issue23);
            issues.Add(issue24);
            issues.ForEach(delegate(Issue issue) { DocumentSession.Store(issue); });
            return Response.AsJson("Issues loaded successfully into RavenDB");
            };
        }
    }
}