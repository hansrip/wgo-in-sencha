using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Base.Common;
using Application.Model.Core;

namespace Nancy.Rest.Server.RavenDB
{
    public interface IIssueRepository : IDao<Issue, long>
    {

    }
}
