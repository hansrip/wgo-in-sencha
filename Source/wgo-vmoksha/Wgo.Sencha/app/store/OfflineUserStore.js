Ext.define('Wgo.store.OfflineUserStore', {
    extend: 'Ext.data.Store',
    requires: "Ext.data.proxy.LocalStorage",
    config: {
        model: 'Wgo.model.User',
        sorters: [
            {
                property : 'Id',
                direction: 'DESC'
            }
        ],
        autoLoad: false, //If set to true then the data will be retrieved during application launch
        clearOnPageLoad: false, //True to empty the store when loading another page via loadPage, nextPage or previousPage (defaults to true). Setting to false keeps existing records, allowing large data sets to be loaded one page at a time but rendered all together.
        pageSize: 5,
        proxy: {
            type: 'localstorage'
        }
    }
});

