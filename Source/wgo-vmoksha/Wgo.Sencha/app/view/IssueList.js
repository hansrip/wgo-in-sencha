Ext.define('Wgo.view.IssueList', {
    extend: 'Ext.navigation.View',
    xtype: 'issuelist',
    requires: [
        'Wgo.store.IssueStore',
        'Ext.dataview.List'    ],
    config: {
        fullscreen: true,
        iconCls: 'time',
        title: 'Issues', //Icon subtext
        items: [
            {
            title: 'Monthly Issues', //Title appear in Title bar
            xtype: 'list',
            id: 'idIssueList', // we are using this inside the controller @ control
                itemTpl: Ext.create('Ext.XTemplate',
                    '<div class="vm-wgo-monthly-issues">',
                    '<img src="resources/images/issues.png" />',
                    '<div class="issue">{month}, {year}</div>',
                    '</div>'
                ),
            store: 'IssueStore',
            grouped: true,
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
            }]
    },

    initialize: function() {
        console.log("Issue List Initialize (Start)")
        this.callParent();
        //Loading Store on page load
        Ext.getStore('IssueStore').load();
        console.log("Issue List Initialize (End)")

        }
});