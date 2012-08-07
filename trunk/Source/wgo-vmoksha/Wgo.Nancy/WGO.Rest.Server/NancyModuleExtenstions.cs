using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;

namespace Nancy.Rest.Server
{
    public static class NancyModuleExtenstions
    {

        public static void RegisterCacheCheck(this NancyModule nancyModule)
        {
            nancyModule.After.AddItemToEndOfPipeline(CheckForCached);
        }

        static void CheckForCached(NancyContext context)
        {
            var responseHeaders = context.Response.Headers;
            var requestHeaders = context.Request.Headers;

            string currentFileEtag;
            if (responseHeaders.TryGetValue("ETag", out currentFileEtag))
            {
                if (requestHeaders.IfNoneMatch.Contains(currentFileEtag))
                {
                    context.Response = HttpStatusCode.NotModified;
                    return;
                }
            }

            string responseLastModifiedString;
            if (responseHeaders.TryGetValue("Last-Modified", out responseLastModifiedString))
            {
                var responseLastModified = DateTime.ParseExact(responseLastModifiedString, "R", CultureInfo.InvariantCulture, DateTimeStyles.None);
                if (responseLastModified <= requestHeaders.IfModifiedSince)
                {
                    context.Response = HttpStatusCode.NotModified;
                }
            }
        }
    }
}