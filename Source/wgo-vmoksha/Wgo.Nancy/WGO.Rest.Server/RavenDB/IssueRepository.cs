using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Application.Model.Core;

namespace Nancy.Rest.Server.RavenDB
{
    public class IssueRepository : AbstractRavenRepository<Issue, long>, IIssueRepository
    {

    }
}