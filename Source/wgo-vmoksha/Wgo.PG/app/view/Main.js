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

        /*Attach Tap event*/
        control : {
                'tab' : {
                    tap : function(ev, target){
                        Wgo.app.fireEvent('ToolBarTap',ev._text);
                        //console.log("event-tap")
                    }
                }
            },
        layout: {
            type: 'hbox',
            align: 'middle'
        }},
        items: [
            { xtype: 'home' },
            { xtype: 'issuelist' },
            { xtype: 'festivallist'},
            { xtype: 'userlist' },
            { xtype: 'settings'} 
        ]
    }
});
