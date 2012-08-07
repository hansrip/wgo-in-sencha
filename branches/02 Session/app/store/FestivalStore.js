Ext.define('Wgo.store.FestivalStore', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Wgo.model.Festival',
        //totalCount:null,
        autoLoad: true,
        clearOnPageLoad: false,
        pageSize: 2,
        proxy: {
            type: 'jsonp',
            url : 'http://wgo-1.apphb.com/festival/Paginate',
            reader: {
                type: 'json',
                rootProperty:'Data'
            }
        }
    }
});
