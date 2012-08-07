using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Raven.Client;
using Raven.Client.Document;
using Raven.Client.Extensions;
using System.Configuration;

namespace Nancy.Rest.Server.RavenDB
{
    public class RavenSessionManager : IRavenSessionManager
    {
        private static IDocumentStore _documentStore;

        public static IDocumentStore DocumentStore
        {
            get { return (_documentStore == null || _documentStore.WasDisposed ? _documentStore = CreateDocumentStore() : _documentStore); }
        }

        private static IDocumentStore CreateDocumentStore()
        {
            var documentStore = new DocumentStore
            {
                //ConnectionStringName = "kemwell-workflow",
                ApiKey =  ConfigurationManager.AppSettings.Get("RavenDb-Api"),
                Url = ConfigurationManager.AppSettings.Get("RavenDb-Url")
            }.Initialize();

            //documentStore.DatabaseCommands.EnsureDatabaseExists("senthilsweb-senthilsdb");
            return documentStore;
        }

        public IDocumentSession GetSession()
        {
            var session = DocumentStore.OpenSession(ConfigurationManager.AppSettings.Get("RavenDb-Database"));
            return session;
        }

        public IDocumentStore GetDocumentStore()
        {
            return DocumentStore;
        }
    }
}
