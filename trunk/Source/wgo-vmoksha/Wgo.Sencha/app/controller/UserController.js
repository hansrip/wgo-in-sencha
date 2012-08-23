Ext.define('Wgo.controller.UserController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //For the matching component query / xtype, sencha will create a free function for us whose name will be get<KeyName>()            
            userlist:'userlist', //this will give the instance of 'userlist' view
            userForm:'#userForm'
        },
        control: {
            'button[action=btnAddUser]' : {tap:"showUserForm"},
            'button[action=btnBack]' : {tap:"showUserList"},
            'button[action=btnUserSubmit]' : {tap:"btnUserSubmitClick"},
            '#idUserList': {disclose: 'showEdit'} //"#idUserList" is a component query (can say dom selector)
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
        this.toggleAddFormButtons()
        console.log("User controller showDetail(End)")
    },
    showUserList: function() {
        console.log("User controller showUserList(Start)")
        // Syncing Online to Offline again to make sure that the changes are shown
        console.log('Syncing data from OnlineUserStore to OfflineUserStore');
        // Getting the online store and storing it in a local variable
        var onlineStore = Ext.getStore('OnlineUserStore');
        // Getting the offline store and storing it in a local variable
        var offlineStore = Ext.getStore('OfflineUserStore'); 
        //Adding an listener called 'load' to the Online Store        
        onlineStore.addListener('load', function () {            
            //Copying records from Online Store to Offline Store
            this.each(function (record) {
                //For proper syncing of data this is required
                //when the store has unchanged data being synced the below must be used to sync the data
                //record.phantom = true; // POST Operation
                //Reference URL -> http://stackoverflow.com/questions/11360028/problems-with-store-syncing
                record.dirty = true;//PUT Operation
                //Adding data to Offline Store
                offlineStore.add(record.data)[0];
            });
            //Syncing data to offline store
            offlineStore.sync();
            console.log(Ext.getCmp('idUserList'));
            //Setting store to offlineStore
            Ext.getCmp('idUserList').setStore(offlineStore);
        });
        // Loading the online store
        onlineStore.load();
        // Popping out the Add/Edit User form 
        this.getUserlist().pop();
        // Toggling the Back to Add button
        Ext.getCmp('idBtnAdd').show();
        Ext.getCmp('idBtnBack').hide();         
        console.log("User controller showUserList(End)");
    },
    btnUserSubmitClick: function() {
        //debugger;
        console.log("User controller btnUserSubmitClick(Start)")
        var username = Ext.getCmp('txtUser').getValue(), // Get form value by Dom identifier
            password = Ext.getCmp('txtPwd').getValue(),
            email = Ext.getCmp('txtEmail').getValue(),
            id = Ext.getCmp('txtUserId').getValue() 
        Ext.getCmp('userForm').setMasked({
            xtype: 'loadmask',
            message: 'Adding New user...'
        });
        //Run with "chrome.exe --disable-web-security" to allow cross domain call (recommended for development)
        //PhoneGap supports Cross Domain.
        //Reference:
        //a) http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy
        //b)
        //CORS / Cross Domain Request
        //JSONP
        Ext.Ajax.request({
            //url: 'http://wgo-1.apphb.com/user', //http://localhost:4404/user/update/2
            url: 'http://wgo-hung-ror.herokuapp.com/users/saveUser',//RoR url
            method: 'post',
            type:'json',
            params: {
                id: id,
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
        console.log(success);
        var userString;        
        var username = Ext.getCmp('txtUser').getValue(), // Get form value by Dom identifier
            password = Ext.getCmp('txtPwd').getValue(),
            email = Ext.getCmp('txtEmail').getValue(),
            id = Ext.getCmp('txtUserId').getValue() 
        if(success==true)
        {
            Ext.getCmp('userForm').setMasked(false);
            //Ext.getStore('UserStore').load();
            //Ext.Viewport.setActiveItem(Ext.getCmp('userlist'));
            // Calling the showUserList function to pop the Add/Edit User form and display the UserList
            this.showUserList();
        }
        else
        {
            userString +='{"id":"'+id+'","username":"'+username+'","password":"'+password+'","email":"'+email+'"}';
            console.log(userString);
            console.log('true');
            var records=[];
            records[0]=JSON.parse(userString);
            localStorage['records']=JSON.stringify(records[0]);
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    showEdit: function(list, record) {
         //debugger;
        //Todo: Detailsview not showingup after first attempt
        console.log("User controller showEdit(Start)")
        var auv = Ext.create("Wgo.view.AddUser");
            auv.setValues({
                txtUserId: record.get("id"),
                txtUser: record.get("username"),
                txtEmail: record.get("email"),
                txtPwd: record.get("password")
        });
            //Hack
            var but = auv.getAt(4)
            but.setText("Edit")

            this.getUserlist().push(auv);
            this.toggleAddFormButtons()
        console.log("User controller showEdit(End)")
    },
    toggleAddFormButtons : function(){
        Ext.getCmp('idBtnAdd').hide();
        Ext.getCmp('idBtnBack').show();
        //Ext.getCmp('btnUserSubmit').setText("");
    }


});
