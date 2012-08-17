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
        Ext.Ajax.request({            
            url: 'http://localhost:3000/users/authenticate',
            method: 'POST',
            type:'json',
            params: {
                username: user,
                password: pwd
            },
            callback: this.onAuthenticateCallback, //Why do we add a callback? I should read but it's to tell the client that the Server is ready to send data back? But this seems like we are calling a fn.
            scope: this //What is scope? The scope in which the action should be called.  Unclear what this means. 
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
        console.log(success); 
        console.log(response.responseText);
        // Parsing the responseText as an object
        var usr = JSON.parse(response.responseText);
        debugger;
        if(success == true) {
            Ext.Viewport.unmask();
            //Stringifying the parsed object and storing it in localStorage
            localStorage.setItem('userData',JSON.stringify(usr.Data));
            var getUserData = localStorage.getItem('userData');
            localStorage.setItem('rememberUserLogged',getUserData);
            localStorage.setItem('rememberUser',1);
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
                            window.location.reload();
                        }
                    });
            }
        console.log("btnDashboardClick (End)")
    },
            
        
});
