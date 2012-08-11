Ext.define('Wgo.controller.UserController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //For the matching component query / xtype, sencha will create a free function for us whose name will be get<KeyName>()            
            userlist:'userlist' //this will give the instance of 'userlist' view
        },
        control: {
            'button[action=btnAddUser]' : {tap:"showUserForm"},
            'button[action=btnBack]' : {tap:"showUserList"},
            'button[action=btnUserSubmit]' : {tap:"btnUserSubmitClick"}
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
    },
    btnUserSubmitClick: function() {
        console.log("User controller btnUserSubmitClick(Start)")
        var username = Ext.getCmp('txtUser').getValue(), // Get form value by Dom identifier
            password = Ext.getCmp('txtPwd').getValue(),
            email = Ext.getCmp('txtEmail').getValue()
        Ext.getCmp('userForm').setMasked({
            xtype: 'loadmask',
            message: 'Adding New user...'
        });
        //Run with "chrome.exe --disable-web-security" to allow cross domain call (recommended for development)
        //PhoneGap supports Cross Domain.
        //Reference:
        //a) http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy
        //b)
        Ext.Ajax.request({
            url: 'http://wgo-1.apphb.com/user',
            method: 'post',
            type:'json',
            params: {
                username: username,
                password: password,
                email: email
            },
            callback: this.onAddUserCallback,
            scope: this
        });
        //adduser
        console.log("password = [" + password + "]")
        console.log("User controller btnUserSubmitClick (End)")
    },
    onAddUserCallback: function(options, success, response) {

        Ext.getCmp('userForm').setMasked(false);
        Ext.getStore('UserStore').load();
        //Ext.Viewport.setActiveItem(Ext.getCmp('userlist'));
        this.showUserList();

    },
    hideForm: function() {
        //Ext.Viewport.setActiveItem(Ext.getCmp('main'));
        //Ext.getCmp('runForm').hide();
    }


});
