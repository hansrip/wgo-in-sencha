Ext.define('Wgo.view.FestivalList', {
    extend: 'Ext.navigation.View',
    xtype: 'festivallist',
    requires: [
        'Wgo.store.FestivalStore',
        'Ext.dataview.List'
    ],
    config: {
        fullscreen: true,
        iconCls: 'favorites',
        title: 'Festivals',
        items: [
            {
            title: 'Festivals',
            xtype: 'list',
            id: 'idFestivalList',
            itemTpl: '<div class="vm-festival"><div><span class="vm-festival-title">{name}</span><span class="vm-festival-timings">{period}</span><div class="vm-festival-content">{details}</div></div></div>',
            store: 'FestivalStore',
            onItemDisclosure: true,
                plugins: [
                    {
                        //http://stackoverflow.com/questions/7321446/sencha-list-paging-plugin
                        xclass: 'Ext.plugin.ListPaging',
                        autoPaging: true,
                        // These override the text; use CSS for styling
                        loadMoreText: 'Loading...',
                        noMoreRecordsText: 'All messages loaded'
                    }
                ]
        },
            {
                xtype: 'header',
                docked: 'top'
            }]
    }
});