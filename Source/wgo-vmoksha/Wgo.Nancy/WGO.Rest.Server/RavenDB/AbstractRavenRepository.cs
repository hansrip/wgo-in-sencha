using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Raven.Client;
using Application.Model.Core;
using Base.Common;
using System.Linq.Expressions;

namespace Nancy.Rest.Server.RavenDB
{
    public abstract class AbstractRavenRepository<T, IdT> : IDao<T, IdT> where T : class
    {
        //public IDocumentSession DocumentSession { set; get; }
        private Type persitentType = typeof(T);

        public List<T> FindAll()
        {
            return DocumentSession.Query<T>().ToList();
        }

        public void Save(T entity)
        {
           DocumentSession.Store(entity);
        }

        public void SaveOrUpdate(T entity)
        {
            DocumentSession.Store(entity);
        }

        public void Delete(T entity)
        {
            DocumentSession.Delete(entity);
        }

        public void CommitChanges()
        {
            DocumentSession.SaveChanges();
            DocumentSession.Dispose();
        }

        public PagedList<T> GetPaged(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public IList<T> GetAll(System.Linq.Expressions.Expression<Func<T, bool>> expression, int skip, int take)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return DocumentSession.Query<T>().Where(predicate);
        }

        public IDocumentSession DocumentSession
        {
            get;
            set;
        }
    }
}