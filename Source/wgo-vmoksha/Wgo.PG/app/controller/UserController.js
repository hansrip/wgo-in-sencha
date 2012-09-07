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
            'button[action=btnUserSync]' : {tap:"btnUserSyncClick"},
            '#idUserList': {disclose: 'showEdit'} //"#idUserList" is a component query (can say dom selector)
        }
    },    
    //------------------------------------------------------------------------------------------------------------------
    init: function() {
        console.log("User controller init(Start)")
        // getting the local storage variable into an local variable 
        var offlineDataStorage = localStorage.getItem('concatenatedUserData');
        console.log(offlineDataStorage);
        // Checking whether the local variable is null or not
        if(offlineDataStorage!=null)
        {
            // if not null assign the data to global variable
            Wgo.app.allData = offlineDataStorage; 
        }
        else 
        {   
            // else make the global variable as null
            Wgo.app.allData = '';        
        }            
        console.log("User controller init(End)")
    },
    //------------------------------------------------------------------------------------------------------------------
    showUserForm: function() {
        //Todo: Detailsview not showingup after first attempt
        console.log("User controller showUserForm(Start)")        
        auv = Ext.create("Wgo.view.AddUser");        
        if(navigator.onLine != true)
        {
            console.log('Online');
            console.log(auv);
        }
        else
        {
            console.log('Offline');
            auv.items.items[4].setWidth('50%');
            auv.items.items[5].setHidden(false);
        }
        this.getUserlist().push(auv);
        this.toggleAddFormButtons();
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
        //Get the length of the offlineStorage to set the Badge dynamically
        if(localStorage.offlineUserData!='')
        {
            var badgeDataLength = JSON.parse(localStorage.offlineUserData).length;
            console.log(badgeDataLength);
            // Setting the badge text dynamically by getting the user tab bar item
            Ext.getCmp('idMain').getTabBar().getItems().items[3].setBadgeText(badgeDataLength);
        }
        else
        {
            Ext.getCmp('idMain').getTabBar().getItems().items[3].setBadgeText('0');
        }
        // Popping out the Add/Edit User form 
        this.getUserlist().pop();
        // Toggling the Back to Add button
        Ext.getCmp('idBtnAdd').show();
        Ext.getCmp('idBtnBack').hide();        
        console.log("User controller showUserList(End)");
    },
    btnUserSubmitClick: function() {
        //debugger;
        console.log(navigator.onLine);
        console.log("User controller btnUserSubmitClick(Start)")
        /*var username = Ext.getCmp('txtUser').getValue(), // Get form value by Dom identifier
            password = Ext.getCmp('txtPwd').getValue(),
            email = Ext.getCmp('txtEmail').getValue(),
            id = Ext.getCmp('txtUserId').getValue() */
      
        Ext.getCmp('userForm').setMasked({
            xtype: 'loadmask',
            message: 'Adding New user...'
        });

        if(navigator.onLine!=true)
        {
            console.log("Online");
            // getting all the form values into a local variable
            var userFormVal = this.getUserForm().getValues(); 
            console.log(userFormVal);
            // stringifying all the local variable object data
            var userVal = JSON.stringify(userFormVal);
            //Run with "chrome.exe --disable-web-security" to allow cross domain call (recommended for development)
            //PhoneGap supports Cross Domain.
            //Reference:
            //a) http://stackoverflow.com/questions/3102819/chrome-disable-same-origin-policy
            //b)
            //CORS / Cross Domain Request
            //JSONP
            Ext.Ajax.request({
                //url: 'http://wgo-1.apphb.com/user', //http://localhost:4404/user/update/2
                url: 'http://wgo-hung-ror.herokuapp.com/users.json',//RoR url
                method: 'post',
                type:'json',
                params: {
                    'user': userVal
                },
                callback: this.onAddUserCallback,
                scope: this
            });            
        }
        else
        {
            console.log("Offline");
            // getting all the form values into a local variable
            var userFormVals = this.getUserForm().getValues();             
            console.log(userFormVals);
            // getting the offline storage to get the values which are stored when user is offline
            var offlineData = localStorage.getItem('offlineUserData');
            // stringifying all the localStorage data
            userDataStringified = JSON.stringify(userFormVals);
            console.log(userDataStringified);
            // check if global variable is null
            if(Wgo.app.allData == '')
            {
                // if null assign the stringified data
                Wgo.app.allData = userDataStringified;
            }
            else
            {
                // if not null we have to append the data so we seperate the data using comma
                Wgo.app.allData = Wgo.app.allData + ',';                
                // After appending a comma add the newly created offline data to the global variable
                Wgo.app.allData += userDataStringified;
            }            
            console.log(Wgo.app.allData);
            // Add the global variable data to another local storage variable
            localStorage.setItem('concatenatedUserData',  Wgo.app.allData );
            // Add  the same to offline User data ALSO but with a particular json format
            localStorage['offlineUserData'] = '[' + Wgo.app.allData + ']';
            //Get the length of the offlineStorage to set the Badge dynamically
            var badgeDataLength = JSON.parse(localStorage.offlineUserData).length;
            console.log(badgeDataLength);
            // Setting the badge text dynamically by getting the user tab bar item
            Ext.getCmp('idMain').getTabBar().getItems().items[3].setBadgeText(badgeDataLength);
            // setting the user form masked as false to prevent it from further masking
            Ext.getCmp('userForm').setMasked(false);  
            this.showUserList();            
        }       

        console.log("User controller btnUserSubmitClick (End)")
    },
    btnUserSyncClick: function() {
        // checking whether the browser is online or offline
         Ext.getCmp('userForm').setMasked({
            xtype: 'loadmask',
            message: 'Syncing Offline to Online...'
        });
        console.log(navigator.onLine);
        //Getting the values from the localStorage to sync 
        var syncData = localStorage.getItem('offlineUserData');
        //Parsing the data of localStorage
        var parseSyncData = JSON.parse(syncData);
        // checking whether the browser is online or offline
        if(navigator.onLine == true)
        {
            //If online sync all the data to the online by calling an AJAX request
            for (i=0;i<parseSyncData.length;i++)
            {               
               //AJAX request to post all the data and create new records
               Ext.Ajax.request({
                    //url: 'http://wgo-1.apphb.com/user', //http://localhost:4404/user/update/2
                    url: 'http://wgo-hung-ror.herokuapp.com/users.json',//RoR url
                    method: 'post',
                    type:'json',
                    params: {
                    'user': JSON.stringify(parseSyncData[i])//Stringifying and passing the entire user model
                    },
                    callback: this.onAddOfflineUserCallback,//to track the response
                    scope: this
                }); 
            }
        }
        else
        {
            Ext.Msg.alert('Unable to sync now as you are offline');
        }
        /*Ext.getCmp('userForm').setMasked({
            xtype: 'loadmask',
            message: 'Adding New user...'
        });
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
        });  */          
    },    
    onAddUserCallback: function(options, success, response) {
        console.log(success);        
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
            Ext.getCmp('userForm').setMasked(false);
            Ext.Msg.alert('Unable to connect');
        }
    },
    onAddOfflineUserCallback: function(options, success, response) {
        console.log(success);
        if(success==true)
        {            
            // removing offline stored data on success as it is no longer required
            localStorage.setItem('offlineUserData','');
            localStorage.setItem('concatenatedUserData','')
            this.showUserList();
        }
        else
        {
            Ext.Msg.alert('Unable to connect');
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    showEdit: function(list, record) {
        //Todo: Detailsview not showingup after first attempt
        console.log("User controller showEdit(Start)")
        var auvEdit = Ext.create("Wgo.view.AddUser");
            auvEdit.setValues({
                id: record.get("id"),
                username: record.get("username"),
                email: record.get("email"),
                password: record.get("password")
        });
            //Hack
        var but = auvEdit.getAt(4)
        but.setText("Edit")

        this.getUserlist().push(auvEdit);
        this.toggleAddFormButtons()
        console.log("User controller showEdit(End)")
    },
    toggleAddFormButtons : function(){
        Ext.getCmp('idBtnAdd').hide();
        Ext.getCmp('idBtnBack').show();
        //Ext.getCmp('btnUserSubmit').setText("");
    }


});
