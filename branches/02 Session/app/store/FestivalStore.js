Ext.define('Wgo.store.FestivalStore', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'Wgo.model.Festival',
        //totalCount:null,
        autoLoad: true,
        clearOnPageLoad: false,
        //pageSize: 2,
        proxy: {
            type: 'ajax',
            pageParam: 'currentPage',
            limitParam: 'pageSize',
            url : 'festival.json',
            reader: 'json'
        }
    }
});
