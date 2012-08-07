Ext.define('wgo-hung.store.FestivalStore', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'wgo-hung.model.Festival',
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