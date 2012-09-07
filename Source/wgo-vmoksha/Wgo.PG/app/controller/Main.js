Ext.define('Wgo.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginForm:'login' // <anyKey> : <object/dom identifier> this will freely create a function called get<AnyKey>()
            // We can also use xtype i.e. loginForm:'login'
        },
        control: {
            //Attach event handlers for controls matched by component queries. In this case button whose action="btnLoginSubmit" is queried
            // and for the query result, event handler function "submitLoginForm" is attached
            'button[action=btnLoginSubmit]' : {tap:"submitLoginForm"}, //Uses ComponentQuery selector to find the matching
            'button[action=btnDashboardClick]' : {tap:"btnDashboardClick"},
            'button[action=btnDashboardLogoutClick]' : {tap:"btnDashboardLogoutClick"} //Uses ComponentQuery selector to find the matching

        }
    },
    //------------------------------------------------------------------------------------------------------------------
    init: function() {        
        console.log("Main controller init(Start)");

        // This is the hack for firing the tap event of the tabBar items in the Main View
        Wgo.app.on({
            // ToolBarTap is the function name which we are firing in the Main view on tap of tabBar items
            // The title of the tabBar Item tapped is passed to tab
            ToolBarTap: function(tab){                               
                // Checking if the item tapped title matches our requirements
                // If users sync data from OnlineUserStore to OfflineUserStore and load the store
                if(tab=="Users")
                {                    
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
                }
                // if the item tapped title matches Festivals we are loading the festival store.
                // The festival store is loaded with auth_token as an param
                else if(tab="Festivals") {
                    // Getting the festival store and storing it in a local variable
                    var festivalStore = Ext.getStore('FestivalStore');
                    // Getting the auth_token from local storage and storing it in a global variable defined in app.js                    
                    Wgo.app.token = localStorage.getItem('auth_token');
                    console.log(Wgo.app.token);      
                    // Loading the store dynamically by passing the token as a query parameter              
                    festivalStore.load({
                        // Passing the query string using params
                        params: {
                            auth_token: Wgo.app.token
                        }
                    });
                }                
            },
            scope: this
        });
        
        // Second way of handling offline data
        // Call a GET request from RoR and store it in localStorage and retrieving the localStorage data through AllUsersStore
        Ext.util.JSONP.request({
            //url : 'http://wgo-1.apphb.com/user',
            url: 'http://wgo-hung-ror.herokuapp.com/users.json',//RoR URL
            dataType: "jsonp",
            success: function(result, request) {
                Ext.Viewport.unmask();
                if (result.Success) {
                    // Storing data locally into a variable called allUsersData
                    localStorage.setItem('allUsersData',JSON.stringify(result.Data));
                }else{
                    Ext.Msg.alert("Unable to fetch all users data");
                }
            },
            failure: function(result, request) {
                Ext.Msg.alert("Unable to fetch all users data");
                //Ext.Msg.alert("Network Failure or Time out happened");
            }
        });
        console.log("Main controller init(End)");
    },
    //------------------------------------------------------------------------------------------------------------------
    //Event Handler for login button tap action
    submitLoginForm:function(){
        console.log("login button tap event (Start)");
        // Mask the viewport
        Ext.Viewport.mask();
        var form = this.getLoginForm(); //We got this for free through refs above
        //get username and password from form elements
        var user = form.getValues().txtUserName;
        var pwd = form.getValues().txtPassword;
        console.log("Before Form Submit")
        // GET request to WebService URL
        /*Ext.util.JSONP.request({
            url: 'http://wgo-1.apphb.com/authenticate',
            dataType: "jsonp",
            params: {
                username: user,
                password: pwd
            },
            success: function(result, request) {
                Ext.Viewport.unmask();
                if (result.Success) {
                    localStorage.setItem("rememberUser",0);
                    localStorage.setItem('userData',JSON.stringify(result.Data));
                    var getUserData = localStorage.getItem('userData');
                    localStorage.setItem('rememberUserLogged',getUserData);
                    Ext.Viewport.setActiveItem({xtype:'main'},{type: 'slide', direction: 'right'});
                }else{
                    Ext.Msg.alert("Un authorized access");
                }
            },
            failure: function(result, request) {
                // Unmask the viewport
                Ext.Viewport.unmask();
                Ext.Viewport.setActiveItem({xtype:'main'},{type: 'slide', direction: 'right'});
                //Ext.Msg.alert("Network Failure or Time out happened");
            }
        });*/
        // POST request to Webservice
        Ext.Ajax.request({
            //url: 'http://wgo-1.apphb.com/authenticate',
            //url: 'http://wgo-hung-ror.herokuapp.com/users/authenticate',//RoR URL            
            url: 'http://wgo-vmoksha-devise.herokuapp.com/api/v1/tokens.json',// RoR URL using Devise and Token Authentication
            method: 'POST',// method should always be POST for Token Authentication to work
            type:'json',
            params: {
                username: user,
                password: pwd
            },
            callback: this.onAuthenticateCallback, //We add a callback to keep track of the response and what intend to do on success and failure
            scope: this //The scope:this will restrict us to this controller.this contains the controller
        }); 
        //console.log("login button tap event (End)");
    },
    //------------------------------------------------------------------------------------------------------------------
    //Event Handler Home dashboard button
    btnDashboardClick:function(){
        console.log("btnDashboardClick (Start)")
        Ext.getCmp('idMain').setActiveItem(1,{type: 'slide', direction: 'right'}).getTabBar().show();
        console.log("btnDashboardClick (End)")
    },
    onAuthenticateCallback: function(options, success, response) {
        // Parsing the responseText as an object
        // var usr = JSON.parse(response.responseText);
        // Creating an object out of the response text
        var authToken = JSON.parse(response.responseText);
        if(success == true) {
            Ext.Viewport.unmask();
            //Stringifying the parsed object and storing it in localStorage
            //localStorage.setItem('userData',JSON.stringify(usr.Data));
            //var getUserData = localStorage.getItem('userData');
            //localStorage.setItem('rememberUserLogged',getUserData);
            // Storing the auth_token in localStorage
            // We are storing it here because if the settings is ON it directly loads the Main View which loses track of the token 
            localStorage.setItem('auth_token',authToken.token);
            // Storing the auth_token in global variable
            Wgo.app.token = authToken.token;
            console.log("Global Variable Token : "+Wgo.app.token);
            // Setting the default value of Keep Me Logged In? to OFF
            localStorage.setItem('rememberUser',0);
            // Redirecting to Login Page on successful login
            Ext.Viewport.setActiveItem({xtype:'main'},{type: 'slide', direction: 'right'});
        }
        else {
            Ext.Viewport.unmask();
            Ext.Msg.alert("Unauthorized access");
        }
    },
    //Logout click functionality
    btnDashboardLogoutClick:function(){
        console.log("btnDashboardClick (Start)")
        var logVal = localStorage.getItem('rememberUser');
        var msg = new Ext.MessageBox();
        console.log(logVal);        
        if(logVal == 1)
            {
                localStorage.setItem('rememberUser',0);
                var getLoggedInData = localStorage.getItem('rememberUserLogged');
                var parseLoggedInData = JSON.parse(getLoggedInData);
                Ext.Viewport.setMasked(false);                
                msg.show({
                    title: 'Logout',
                    message: 'Logged Out Successfully!',
                    ui:'light',
                    cls: 'vm_success',
                    showAnimation: 'fadeIn',
                    hideAnimation: 'fadeOut',
                    buttons: [{text:'OK',itemId:'ok'}],
                    fn:function(){
                        localStorage.removeItem("rememberUserLogged");                        
                        localStorage.removeItem('userData');
                        localStorage.removeItem('allUsersData');
                        Ext.Viewport.setActiveItem({xtype:'login'},{type: 'slide', direction: 'right'});
                        window.location.reload();
                    }
                });
            }
        else 
            {
                Ext.Viewport.setMasked(false);
                msg.show({
                        title: 'Logout',
                        message: 'Logged Out Successfully!',
                        ui:'light',
                        cls: 'vm_success',
                        showAnimation: 'fadeIn',
                        hideAnimation: 'fadeOut',
                        buttons: [{text:'OK',itemId:'ok'}],
                        fn:function(){
                            Ext.Viewport.setActiveItem({xtype:'login'},{type: 'slide', direction: 'right'});
                            window.location.reload();
                        }
                    });
            }
        console.log("btnDashboardClick (End)")
    }
    //ToolBarTap : function() {console.log("ToolBarTap")}
        
});
