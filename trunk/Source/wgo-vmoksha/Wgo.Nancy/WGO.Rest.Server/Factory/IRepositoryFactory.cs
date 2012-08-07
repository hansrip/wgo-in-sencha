#region Header
//************************************************************************************
// Name: IFacadeFactory
// Description: IFacadeFactory interface
// Created On:  27-Dec-2011
// Created By:  Swathi
// Last Modified On:
// Last Modified By: 
// Last Modified Reason: 
//*************************************************************************************
#endregion Header

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Nancy.Rest.Server.RavenDB;
using Raven.Client;

namespace Nancy.Rest.Server.Factory
{
    public interface IRepositoryFactory
    {
        /// <summary>
        /// Method used to get Employee app service
        /// </summary>
        /// 
      
        IDocumentSession DocumentSession { get; set; }
    }
}
