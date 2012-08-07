using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Application.Model.Core;
using Nancy.ModelBinding;
using Nancy;
using System.Dynamic;
using Nancy.Json;
using Nancy.Rest.Server.RavenDB;

namespace Nancy.Rest.Server.Module
{
    public class FestivalModule : ModuleBase
    {
        public FestivalModule(IFestivalRepository repository)
            : base("/Festival")
        {


            Get["/{pageNumber}/{rowCountPerPage}"] = parameters =>
            {
                //current page number
                Int32 pgNumber = parameters.pageNumber;
                //row count per page
                Int32 rowCntPerPage = parameters.rowCountPerPage;                
                repository.DocumentSession = this.DocumentSession;
                //pagination              
                var festival=repository.FindAll().Skip(pgNumber * rowCntPerPage).Take(rowCntPerPage);
                dynamic response = new ExpandoObject();
                response.Success = true;
                response.Data = festival;
                response.CurrentPage = pgNumber * rowCntPerPage;
                response.PageSize = rowCntPerPage;                
                return new JavaScriptSerializer().Serialize(response);
            };
            Get["/Paginate"] = parameters =>
            {
                Int32 page = (this.Request.Query.page != null && this.Request.Query.page != "0") ? (this.Request.Query.page - 1) : 0;                
                Int32 limit = this.Request.Query.limit!=null?this.Request.Query.limit:0;
                //not being used currently
                Int32 start = this.Request.Query.start != null ? this.Request.Query.start : 0;
                repository.DocumentSession = this.DocumentSession;
                //pagination              
                var festival = repository.FindAll().Skip(page * limit).Take(limit);
                dynamic response = new ExpandoObject();
                response.Success = true;
                response.Data = festival;
                response.CurrentPage = page * limit;
                response.PageSize = limit;
                return new JavaScriptSerializer().Serialize(response);
            };

            Get["/All"] = parameters =>
            {
                repository.DocumentSession = this.DocumentSession;
                return this.JsonResponseString(repository.FindAll());
            };

            Post["/"] = parameters =>
            {
                var festival = this.Bind<Festival>();
                //Implement unique username constraint.
                DocumentSession.Store(festival);
                return Response.AsJson(festival);
            };

            //List all the employees reporting to a given manager
            Get["/Data/Load"] = parameters =>
            {
                var fest1 = new Festival { name = "UKAI (Cormorant Fishing) On the Hiji-kawa (river)", details = "The tradition of fishing with cormorants", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                var fest2 = new Festival { name = "DOYO YOICHI (Saturday Fair)", details = "The tradition of fishing with cormorants", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                var fest3 = new Festival { name = "OYAMA-BIRAKI (Opening of Mt. Ishizuchi) Mt. Ishiduchi", details = "A meal is served while on the yakatabune. The fare is as follows", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                var fest4 = new Festival { name = "DORONKO MATSURI (Rice Paddy Mud Festival)", details = "The tradition of fishing with cormorants goes back at least a thousand years. In Ozu it started as a tourist attraction in 1957 and it is one of the three most famous ukai spots in Japan. The fishing is done from boats called ubune, which is lit by torches as it sails down the Hiji-kawa, the river that runs through Ozu. Cormorant fishermen called usho, beat the sides of the boats to encourage the trained cormorants to catch fish. They are pulled by long strings attached to rings around the birds' necks which prevent them from swallowing the fish. The torchlight attracts fish. When a cormorant makes a catch the fisherman pulls the bird in and has it cough up the fish on the boat. You can watch this from special sightseeing boats called yakatabune. A meal is served while on the yakatabune. The fare is as follows", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                var fest5 = new Festival { name = "TANABATA (Star Festival) ", details = "The tradition of fishing with cormorants goes back at least a thousand years. In Ozu it started as a tourist attraction in 1957 and it is one of the three most famous ukai spots in Japan. The fishing is done from boats called ubune, which is lit by torches as it sails down the Hiji-kawa, the river that runs through Ozu. Cormorant fishermen called usho, beat the sides of the boats to encourage the trained cormorants to catch fish. They are pulled by long strings attached to rings around the birds' necks which prevent them from swallowing the fish. The torchlight attracts fish. When a cormorant makes a catch the fisherman pulls the bird in and has it cough up the fish on the boat. You can watch this from special sightseeing boats called yakatabune. A meal is served while on the yakatabune. The fare is as follows", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                var fest6 = new Festival { name = "MISHIMA SUIGUN (sea guards) TSURUHIME (Princess Tsuru) FESTIVAL Oyamazumi-jinja (shrine)", details = "The tradition of fishing with cormorants goes back at least a thousand years. In Ozu it started as a tourist attraction in 1957 and it is one of the three most famous ukai spots in Japan. The fishing is done from boats called ubune, which is lit by torches as it sails down the Hiji-kawa, the river that runs through Ozu. Cormorant fishermen called usho, beat the sides of the boats to encourage the trained cormorants to catch fish. They are pulled by long strings attached to rings around the birds' necks which prevent them from swallowing the fish. The torchlight attracts fish. When a cormorant makes a catch the fisherman pulls the bird in and has it cough up the fish on the boat. You can watch this from special sightseeing boats called yakatabune. A meal is served while on the yakatabune. The fare is as follows", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                var fest7 = new Festival { name = "UWAJIMA USHIONI FESTIVAL", details = "The tradition of fishing with cormorants goes back at least a thousand years. In Ozu it started as a tourist attraction in 1957 and it is one of the three most famous ukai spots in Japan. The fishing is done from boats called ubune, which is lit by torches as it sails down the Hiji-kawa, the river that runs through Ozu. Cormorant fishermen called usho, beat the sides of the boats to encourage the trained cormorants to catch fish. They are pulled by long strings attached to rings around the birds' necks which prevent them from swallowing the fish. The torchlight attracts fish. When a cormorant makes a catch the fisherman pulls the bird in and has it cough up the fish on the boat. You can watch this from special sightseeing boats called yakatabune. A meal is served while on the yakatabune. The fare is as follows", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                var fest8 = new Festival { name = "KAZAHAYA UMI MATSURI (Sea Festival) ", details = "The tradition of fishing with cormorants goes back at least a thousand years. In Ozu it started as a tourist attraction in 1957 and it is one of the three most famous ukai spots in Japan. The fishing is done from boats called ubune, which is lit by torches as it sails down the Hiji-kawa, the river that runs through Ozu. Cormorant fishermen called usho, beat the sides of the boats to encourage the trained cormorants to catch fish. They are pulled by long strings attached to rings around the birds' necks which prevent them from swallowing the fish. The torchlight attracts fish. When a cormorant makes a catch the fisherman pulls the bird in and has it cough up the fish on the boat. You can watch this from special sightseeing boats called yakatabune. A meal is served while on the yakatabune. The fare is as follows", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                var fest9 = new Festival { name = "The 14th SHIMANAMI KAIDO TAKIGINO ", details = "The tradition of fishing with cormorants goes back at least a thousand years. In Ozu it started as a tourist attraction in 1957 and it is one of the three most famous ukai spots in Japan. The fishing is done from boats called ubune, which is lit by torches as it sails down the Hiji-kawa, the river that runs through Ozu. Cormorant fishermen called usho, beat the sides of the boats to encourage the trained cormorants to catch fish. They are pulled by long strings attached to rings around the birds' necks which prevent them from swallowing the fish. The torchlight attracts fish. When a cormorant makes a catch the fisherman pulls the bird in and has it cough up the fish on the boat. You can watch this from special sightseeing boats called yakatabune. A meal is served while on the yakatabune. The fare is as follows", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                var fest10 = new Festival { name = "DOGO-MURA (village) FESTIVAL ", details = "The tradition of fishing with cormorants goes back at least a thousand years. In Ozu it started as a tourist attraction in 1957 and it is one of the three most famous ukai spots in Japan. The fishing is done from boats called ubune, which is lit by torches as it sails down the Hiji-kawa, the river that runs through Ozu. Cormorant fishermen called usho, beat the sides of the boats to encourage the trained cormorants to catch fish. They are pulled by long strings attached to rings around the birds' necks which prevent them from swallowing the fish. The torchlight attracts fish. When a cormorant makes a catch the fisherman pulls the bird in and has it cough up the fish on the boat. You can watch this from special sightseeing boats called yakatabune. A meal is served while on the yakatabune. The fare is as follows", city = "Ozu City", period = "June 1-Sept. 20", timings = "18=30-21=00", telePhone = "089-2345-4234" };
                List<Festival> festivals = new List<Festival>();
                festivals.Add(fest1);
                festivals.Add(fest2);
                festivals.Add(fest3);
                festivals.Add(fest4);
                festivals.Add(fest5);
                festivals.Add(fest6);
                festivals.Add(fest7);
                festivals.Add(fest8);
                festivals.Add(fest9);
                festivals.Add(fest10);
                festivals.ForEach(delegate(Festival festival) { DocumentSession.Store(festival); });
                return Response.AsJson("Festivals loaded successfully into RavenDB");
            };
        }
    }
}