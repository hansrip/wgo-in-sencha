/*
* Author:
* Description:
*
*
* */
Ext.define('Wgo.view.Main', {
    extend: 'Ext.TabPanel',
    xtype: 'main'
    ,
    config: {
        tabBar: {
            docked: 'bottom',
            layout: {pack: 'center'}},
        items: [
            { xtype: 'festivallist' }
        ]
    }
});
