Ext.define('Wgo.store.IssueStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'Wgo.model.Issue',
        sorters: 'sort',
        grouper : function(record) {
            return record.get('year');
        },
        autoLoad: false, //If set to true then the data will be retrieved during application launch
        clearOnPageLoad: false, //True to empty the store when loading another page via loadPage, nextPage or previousPage (defaults to true). Setting to false keeps existing records, allowing large data sets to be loaded one page at a time but rendered all together.
        pageSize: 12,
        proxy: {
            type: 'jsonp', //for cross domain calls
            url : 'http://wgo-1.apphb.com/issues/paginate', //ROR Url
            reader: {
                type: 'json'
                ,rootProperty:'Data' //The result json is (may be) complex and nested objects hence we specify the root property to look for
            }
        }
    }
});
