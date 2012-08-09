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
            //hidden:true,
            layout: {pack: 'center'}},
        items: [
            //{ xtype: 'home' },
            { xtype: 'festivallist' }
        ]
    }
});
