Ext.define('Wgo.view.Home', {
    extend: 'Ext.Panel',
    xtype: 'home',
    config: {
        cls:"vm-dashboard",  //this class will override sencha's form background color to white",
        layout:'vbox',
        scrollable:true,
        iconCls:'home',
        title:'Home',
        items: [
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/issues.png" align="center" height="48px" width="48px"></div><div class="vm-dashboard-notes">Home</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard-top'
                    }, {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/icon-text.png" align="center" height="48px" width="48px"></div><div class="vm-dashboard-notes">Haiku</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard-top'
                    },
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/icon-calendar.png" align="center" height="48px" width="48px"></div><div class="vm-dashboard-notes">Issues</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard-top'
                    }]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/Movie File.png" align="center" height="48px" width="48px"></div><div class="vm-dashboard-notes">Movies</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
                    }, {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/news_512.png" align="center" height="48px" width="48px"></div><div class="vm-dashboard-notes">Announcements</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
                    },
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/icon-band.png" align="center" height="48px" width="48px"></div><div class="vm-dashboard-notes">Performances</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
                    }]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/Settings.png" align="center" height="48px" width="48px"></div><div class="vm-dashboard-notes">Settings</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
                    }, {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/Hot_Dog_Car.png" align="center" height="48px" width="48px"></div><div class="vm-dashboard-notes">Festivals</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
                    },
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/Logout.png" align="center" height="48px" width="48px"></div><div class="vm-dashboard-notes">Logout</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
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
        ],

        listeners: {
            painted: function() {
                console.log('painted');
                Ext.getCmp('idMain').getTabBar().hide();
            }
        }
    }
});
