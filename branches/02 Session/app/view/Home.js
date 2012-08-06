Ext.define('Wgo.view.Home', {
    extend: 'Ext.Panel',
    xtype: 'home',
    config: {
        cls:"vm-dashboard",  //this class will override sencha's form background color to white",
        items: [
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/Issues.png" align="center"></div><div class="vm-dashboard-notes">Issues</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'btnDashboard',
                        listeners: {
                            tap: function() {
                                console.log("Tap event for isssues")
                            }
                        }
                    }]
            },
            {
                xtype:'header',
                docked:'top'
            },
            {
                xtype: 'footer',
                docked: 'bottom'
            }
        ]
    }
});
