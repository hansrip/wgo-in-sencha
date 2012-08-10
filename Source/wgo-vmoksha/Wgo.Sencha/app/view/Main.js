/*
* Author:
* Description:
*
*
* */
Ext.define('Wgo.view.Main', {
    extend: 'Ext.TabPanel',
    xtype: 'main',
    id: 'idMain'
    ,
    config: {
        tabBar: {
        docked: 'bottom',
        layout: {
            type: 'hbox',
            align: 'middle'
        }},
        items: [
            { xtype: 'home' },
            { xtype: 'issuelist' },
            { xtype: 'festivallist' },
            { xtype: 'userlist' } 
        ]
    }
});
