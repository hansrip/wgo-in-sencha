#region Header
//************************************************************************************
// Name: IDao
// Description: Dao Interface
// Created On:  02-Aug-2011
// Created By:  Swathi
// Last Modified On:
// Last Modified By:
// Last Modified Reason:
//*************************************************************************************
#endregion Header
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Raven.Client;

namespace Base.Common
{
    public interface IDao<T, TIdT>
    {
        IDocumentSession DocumentSession { set; get; }
        IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate);
        List<T> FindAll();
        void Save(T entity);
        void SaveOrUpdate(T entity);
        void Delete(T entity);
        void CommitChanges();
        PagedList<T> GetPaged(int pageIndex, int pageSize);
        IList<T> GetAll(Expression<Func<T, bool>> expression , int skip, int take); 
    }

    public enum SaveAction
    {
        /// <summary>
        /// Default. Nothing happened.
        /// </summary>
        None,
        /// <summary>
        /// It's a new object that has been inserted.
        /// </summary>
        Insert,
        /// <summary>
        /// It's an old object that has been updated.
        /// </summary>
        Update,
        /// <summary>
        /// The object was deleted.
        /// </summary>
        Delete
    }
}
