Ext.define('Wgo.controller.UserController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //For the matching component query / xtype, sencha will create a free function for us whose name will be get<KeyName>()            
            userlist:'userlist' //this will give the instance of 'userlist' view
        },
        control: {
            'button[action=btnAddUser]' : {tap:"showUserForm"},
            'button[action=btnBack]' : {tap:"showUserList"}
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    init: function() {
        console.log("User controller init(Start)")
        console.log("User controller init(End)")
    },
    //------------------------------------------------------------------------------------------------------------------
    showUserForm: function() {
        //Todo: Detailsview not showingup after first attempt
        console.log("User controller showUserForm(Start)")
        var auv = Ext.create("Wgo.view.AddUser");        
        this.getUserlist().push(auv);
        Ext.getCmp('idBtnAdd').hide();
        Ext.getCmp('idBtnBack').show();
        console.log("User controller showDetail(End)")
    },
    showUserList: function() {
        console.log("User controller showUserList(Start)")      
        this.getUserlist().pop();
        Ext.getCmp('idBtnAdd').show();
        Ext.getCmp('idBtnBack').hide();
        console.log("User controller showUserList(End)")
    }

});
