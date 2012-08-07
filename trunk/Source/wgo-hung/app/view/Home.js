Ext.define("wgo-hung.view.Home", {
    extend:'Ext.Panel',
    xtype: 'home',
    config: {
        //cls:'vm-form',
        //id:'idHome',
        //scrollable:true,
        layout: {
            type: 'card'
        },
        items: [
                {
                    xtype:'panel',
                    layout: 'vbox',
                    //scrollable:true,
                    //cls:'clsDashboardPanel', //to Edit
                    items : [
                                {
                                    xtype: 'header',
                                    docked: 'top'
                                },
                                {
                                    xtype: 'mainbar'
                                                                        
                                },
                                {
                                    xtype: 'panel',
                                    //cls:'clsTopPanel',
                                    //id:'idTopPanel',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox'
                                    },
                                    items: [
                                            {
                                                xtype: 'button',
                                                iconCls: 'favorites',
                                                iconMask: true,
                                                cls: 'btnDashboard',
                                                text: 'Festivals',
                                                margin: 2,
                                                flex:1,
                                                action: 'btnGetFestivals'

                                            },
                                            {
                                                xtype: 'button',
                                                iconCls: 'maps',
                                                iconMask: true,
                                                cls: 'btnDashboard',
                                                text: 'Issues',
                                                margin: 2,
                                                flex:1,
                                                action: 'btnGetIssues'

                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btnDashboard',
                                                text: '',
                                                margin: 2,
                                                flex:1
                                            },
                                            ],
                                },
                                {
                                    xtype: 'panel',
                                    //cls:'clsMiddlePanel',
                                    //id:'idMiddlePanel',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align:'stretch',
                                        flex:'auto'
                                    },
                                    items: [
                                            {
                                                xtype: 'button',
                                                cls: 'btnDashboard',
                                                text: '',
                                                margin: 2,
                                                flex:1
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btnDashboard',
                                                text: '',
                                                margin: 2,
                                                flex:1
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btnDashboard',
                                                text: '',
                                                margin: 2,
                                                flex:1
                                            }
                                            ],
                                },                              
                        ]                       
                },
        ]
    }
});