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
                        html: '<div class="image"><img alt="CAB" src="resources/images/issues.png" align="center"></div><div class="vm-dashboard-notes">Home</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard-top'
                    }, {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/nav-articles.png" align="center"></div><div class="vm-dashboard-notes">Articles</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard-top'
                    },
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/nav-settings.png" align="center"></div><div class="vm-dashboard-notes">Settings</div>',
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
                        html: '<div class="image"><img alt="CAB" src="resources/images/nav-stats.png" align="center"></div><div class="vm-dashboard-notes">Stats</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
                    }, {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/nav-custom.png" align="center"></div><div class="vm-dashboard-notes">Announcements</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
                    },
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/nav-users.png" align="center"></div><div class="vm-dashboard-notes">Users</div>',
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
                        html: '<div class="image"><img alt="CAB" src="resources/images/nav-twitter.png" align="center"></div><div class="vm-dashboard-notes">Twitter</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
                    }, {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/nav-comments.png" align="center"></div><div class="vm-dashboard-notes">Comments</div>',
                        width:'33%',
                        action: 'btnDashboardClick',
                        ui:'round',
                        cls: 'vm-btn-dashboard'
                    },
                    {
                        xtype: 'button',
                        html: '<div class="image"><img alt="CAB" src="resources/images/nav-gallery.png" align="center"></div><div class="vm-dashboard-notes">Gallery</div>',
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
        ]
    }
});
