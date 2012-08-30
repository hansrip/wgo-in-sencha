Ext.define('Wgo.view.UserList', {
    extend: 'Ext.navigation.View',
    xtype: 'userlist',
    requires: [
        'Wgo.store.IssueStore',
        'Ext.dataview.List' ],
    config: {
        cls:'clsUsers',
        iconCls: 'team',
        id:'idUserListConfig',
        title: 'Users', //Icon subtext
        badgeText: '0',
        items: [
            {
                title: 'Users', //Title appear in Title bar
                xtype: 'list',
                id: 'idUserList', // we are using this inside the controller @ control
                itemTpl: Ext.create('Ext.XTemplate',
                    '<div class="vm-wgo-monthly-issues">',
                    '<img src="resources/images/Issues.png" />',
                    '<div class="issue">{username}</div>',
                    '</div>'
                ),
                store: null,
                //store:'AllUsersStore', // Used to fetch data from local storage. To setData from localstorage see initialize function
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
            },
            {
                    xtype:"toolbar",
                    ui:"dark",
                    docked:"top",
                    items: [
                            {xtype: 'spacer'},
                            {   xtype: 'title' ,
                                title:"Users"
                            },
                            {xtype: 'spacer'},
                            {
                                iconMask:true,
                                iconCls: 'add',
                                ui: 'plain',
                                align: 'right',
                                action:'btnAddUser',
                                id:'idBtnAdd'
                            },
                            {
                                iconMask:true,
                                iconCls: 'reply',
                                ui: 'plain',
                                hidden:true,
                                align: 'right',
                                action:'btnBack',
                                id:'idBtnBack'
                            }
                            ]
                }
            ]
    },

    initialize: function() {
        console.log("User List Initialize (Start)");
        this.callParent();
        console.log("User List Initialize (End)");
    }
});