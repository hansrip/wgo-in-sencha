Ext.define('Wgo.view.FestivalList', {
    extend: 'Ext.navigation.View',
    xtype: 'festivallist',
    requires: [
        'Wgo.store.FestivalStore',
        'Ext.dataview.List'
    ],
    config: {
        iconCls: 'favorites',
        title: 'Festivals',
        items: [
            {
            title: 'Festivals',
            xtype: 'list',
            id: 'idFestivalList',
            itemTpl: '<div class="vm-festival"><div><span class="vm-festival-title">{name}</span><span class="vm-festival-timings">{period}</span><div class="vm-festival-content">{details}</div></div></div>',
            store: 'FestivalStore'
            ,onItemDisclosure: true
        },
            {
                xtype: 'header',
                docked: 'top'
            }]
    }
});