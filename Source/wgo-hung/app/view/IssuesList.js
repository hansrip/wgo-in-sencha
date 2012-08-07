Ext.define("wgo-hung.view.IssuesList", {
    extend: 'Ext.navigation.View',
    xtype: 'issueslist',
    requires: [
    'wgo-hung.store.IssueStore',
    'Ext.dataview.List'
    ],
    config: {
    	iconCls: 'favorites',
    	title: 'Issues',
    	items: [
    		{title: 'Issues',
    		xtype: 'list',
    		//id: 'idIssuesList',
    		itemTpl: '{year} and {month} and {title}',
    		store:'IssueStore',
    		onItemDisclosure: true
    	},
    		{
    			xtype: 'header',
    			docked: 'top'
            },
            {
                xtype: 'mainbar'
            }

            ]
    }
});