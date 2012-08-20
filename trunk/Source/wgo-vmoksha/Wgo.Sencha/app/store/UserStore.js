Ext.define('Wgo.store.UserStore', {
    extend: 'Ext.data.Store',
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
            type: 'jsonp', //for cross domain calls
            //url : 'http://wgo-1.apphb.com/user',
            url : 'http://wgo-hung-ror.herokuapp.com/users.json',//RoR URL
            reader: {
                type: 'json',
                rootProperty:'Data' //The result json is (may be) complex and nested objects hence we specify the root property to look for
            }
        }
    }
});
