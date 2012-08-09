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
        title: 'Festivals', //Icon subtext
        items: [
            {
            title: 'Festivals', //Title appear in Title bar
            xtype: 'list',
            id: 'idFestivalList', // we are using this inside the controller @ control
            itemTpl:
                    '<div class="vm-festival">' +
                    '<div>' +
                    '<span class="vm-festival-title">{name}</span>' +
                    //'<span class="vm-festival-timings">{period}</span>' +
                    //'<div class="vm-festival-content">{details}</div>' +
                    '</div>' +
                    '</div>',
            store: 'FestivalStore',
            onItemDisclosure: true,
                plugins: [ //Reference code from "http://stackoverflow.com/questions/7321446/sencha-list-paging-plugin"
                {
                    xclass: 'Ext.plugin.ListPaging',
                    autoPaging: true,
                    // These override the text; use CSS for styling
                    loadMoreText: 'Loading more records...',
                    noMoreRecordsText: 'All messages loaded'
                }
            ]
        },
            {
                xtype: 'header',
                docked: 'top'
            }],
        listeners: {
            activate: function() {
                //console.log('FestivalList Active Item Id = ' + this.getActiveItem().getId());
                //debugger;
                console.log(' Active Item Check = ' + Number(this.getActiveItem().getActiveItem()).toString() == Number.NaN);
                if(Number(this.getActiveItem().getActiveItem()).toString() == '0')
                {
                    this.pop();
                }
            }
        }
    }
});