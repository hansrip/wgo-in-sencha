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
            type: 'ajax', //for cross domain calls
            url : 'Issue.json'
        }
    }
});
