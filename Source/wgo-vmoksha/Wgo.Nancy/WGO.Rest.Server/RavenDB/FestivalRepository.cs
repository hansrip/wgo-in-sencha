using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Application.Model.Core;

namespace Nancy.Rest.Server.RavenDB
{
    public class FestivalRepository : AbstractRavenRepository<Festival, long>, IFestivalRepository
    {

    }
}