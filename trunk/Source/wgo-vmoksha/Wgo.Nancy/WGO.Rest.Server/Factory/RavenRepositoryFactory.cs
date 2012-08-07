#region Header
//************************************************************************************
// Name: FacadeFactory
// Description: FacadeFactory class
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
using Nancy.Rest.Server.Ioc;
using Raven.Client;

namespace Nancy.Rest.Server.Factory
{
    public class RavenRepositoryFactory : IRepositoryFactory
    {
       
       public IDocumentSession DocumentSession { get; set; }
        public RavenRepositoryFactory() {  }
        public RavenRepositoryFactory(IDocumentSession documentSession) { DocumentSession = documentSession; }       
        //private IEmployeeRepository _employeeRepository;
        //public IEmployeeRepository EmployeeRepository
        //{
        //    //get the Employee app servcie from Facade exposer
        //    get
        //    {
        //        if (_employeeRepository == null)
        //        {
        //            _employeeRepository = new Exposer().EmployeeRepository;
        //            _employeeRepository.DocumentSession = DocumentSession;
        //        }               
        //        return _employeeRepository;
        //    }
        //}
    }
}
