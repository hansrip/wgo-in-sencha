Ext.define('wgo-hung.store.IssueStore', {
    extend: 'Ext.data.Store',
    
    config: {
        model: 'wgo-hung.model.Issue',
        //totalCount:null,
        autoLoad: true,
        clearOnPageLoad: false,
        //pageSize: 2,
        proxy: {
            type: 'ajax',
            pageParam: 'currentPage',
            limitParam: 'pageSize',
            url : 'issues.json',
            reader: 'json'
        }
    }
});