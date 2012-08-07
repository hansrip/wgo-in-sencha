Ext.define('wgo-hung.view.FestivalDetail', {
    extend: 'Ext.Panel',
    xtype: 'festivaldetail',

    config: {
        title: 'Festivals',
        // html: '<div id="post">'
        //     + '<p>'
        //     + 'The tradition of fishing with cormorants goes back at least a thousand years.'
        //     + 'In Ozu it started as a tourist attraction in 1957 and it is one of the three most'
        //     + 'famous ukai spots in Japan. The fishing is done from boats called ubune, which is lit by'
        //     + 'torches as it sails down the Hiji-kawa, the river that runs through Ozu. Cormorant'
        //     + 'fishermen called usho, beat the sides of the boats to encourage the trained cormorants to'
        //     + 'catch fish. They are pulled by long strings attached to rings around the birds\' necks which'
        //     + 'prevent them from swallowing the fish. The torchlight attracts fish. When a cormorant'
        //     + 'makes a catch the fisherman pulls the bird in and has it cough up the fish on the boat.'
        //     + 'You can watch this from special sightseeing boats called yakatabune. A meal is served'
        //     + 'while on the yakatabune'
        //     + '</p>'
        //     + '<p>'
        //     + 'The fare is as follows:'
        //     + 'Adult                Child'
        //     + 'Daytime (12:30- every Sunday)   2,000 yen            1,000 yen'
        //     + 'Night (18:00-)                  3,000 yen            1,500 yen (not including food)'
        //     + '(With a guide                  4,000 yen            2,000 yen)'
        //     + '</p>'
        //     + '<p>'
        //     + 'You need to make a reservation in advance at Kanko-kyokai (Tel.             0893-24-2664      ).'
        //     + 'The boarding area is at the river near Garyu-sanso, about a ten-minute walk from the '
        //     + 'Route 56 bridge crossing the Hijikawa.'
        //     + 'Transportation: Take the Iyotetsu bus bound for Yawatahama from Shieki, gate #4, and get '
        //     + 'off at Ozu Honmachi. It is a one-and-a-half-hour ride and the one-way fare is 1,380 yen.'
        //     + 'Or take the JR express train from Matsuyama and get off at Ozu. It is a 40-minute- ride '
        //     + 'and a round trip S-kippu is 2,680 yen.'
        //     + 'From Ozu Station take a taxi or walk for 30 minutes. (Tel.             0896-72-2617      )'
        //     + '</p>'
        // + '</div>',
        
        tpl: '<div class="vm-festival"><div><span class="vm-festival-title">{name}</span><span class="vm-festival-timings">{period}</span><div class="vm-festival-content">{details}</div></div></div>',
        styleHtmlContent: true,
        scrollable: 'vertical'
    }
});
