using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Base.Common
{  
    /// <summary>
    /// 
    /// </summary>
    /// <remarks>Reference from http://blogs.planetcloud.co.uk/mygreatdiscovery/post/Simple-paging-with-ASPNET-MVC-and-NHibernate.aspx</remarks>
    /// <typeparam name="T"></typeparam>
        public class PagedList<T> : List<T>, IPagedList<T>
        {
            public PagedList(IQueryable<T> source, int pageSize, int pageIndex, int rowCount)
            {
                int total = rowCount;
                this.TotalCount = total;
                this.TotalPages = total / pageSize;
                if (total % pageSize > 0)
                    TotalPages++;
                this.PageSize = pageSize;
                this.PageIndex = pageIndex;
                this.AddRange(source.Skip(pageIndex * pageSize).Take(pageSize).ToList());
            }

            public PagedList(List<T> source, int pageSize, int pageIndex, int rowCount)
            {
                int total = rowCount;
                this.TotalCount = total;
                this.TotalPages = total / pageSize;
                if (total % pageSize > 0)
                    TotalPages++;
                this.PageSize = pageSize;
                this.PageIndex = pageIndex;
                //this.AddRange(source.Skip(pageIndex * pageSize).Take(pageSize).ToList());
                this.AddRange(source);
            }
            public int PageIndex { get; private set; }
            public int PageSize { get; private set; }
            public int TotalCount { get; private set; }
            public int TotalPages { get; private set; }
            public bool HasPreviousPage
            {
                get { return (PageIndex > 0); }
            }
            public bool HasNextPage
            {
                get { return (PageIndex + 1 < TotalPages); }
            }
        }   
 
}
