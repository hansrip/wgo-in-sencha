﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Application.Model.Core;

namespace Nancy.Rest.Server.RavenDB
{
    public class UserRepository : AbstractRavenRepository<User, long>, IUserRepository
    {

    }
}