Ext.define('Wgo.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginForm:'#loginForm' // <anyKey> : <object/dom identifier> this will freely create a function called get<AnyKey>()
                                   // We can also use xtype i.e. loginForm:'login'
            },
        control: {
            //Attach event handlers for controls matched by component queries. In this case button whose action="btnLoginSubmit" is queried
            // and for the query result, event handler function "submitLoginForm" is attached
            'button[action=btnLoginSubmit]' : {tap:"submitLoginForm"}, //Uses ComponentQuery selector to find the matching
            'button[action=btnDashboardClick]' : {tap:"btnDashboardClick"} //Uses ComponentQuery selector to find the matching
        }
    },
    init: function() {
        console.log("Main controller init(Start)");
        console.log("Main controller init(End)");
    },

    //Event Handler for login button tap action
    submitLoginForm:function(){
        // Mask the viewport
        Ext.Viewport.mask();
        //console.log("login button tap event (Start)");
        var form = this.getLoginForm(); //We got this for free through refs above
        //get username and password from form elements
        var user = form.getValues().txtUserName;
        var pwd = form.getValues().txtPassword;

        //debugger;
        console.log("Before Form Submit")
        /*form.submit({
            url:'http://wgo-1.apphb.com/authenticate?username=senthil&password=senthil', //Fire a ajax call to authenticate. This can be a RoR Rest call
            //
            success : function(){Ext.Viewport.setActiveItem({xtype:'home'},{type: 'slide', direction: 'right'});}, //On Success show home panel. In our case this should be the Home/Dashboard page
            failure: function(){console.log("Form Submit callback Failure - Authentication Success")}
        })*/

        Ext.util.JSONP.request({
            url: 'http://wgo-1.apphb.com/authenticate',
            dataType: "jsonp",
            params: {
                username: user,
                password: pwd
            },
            success: function(result, request) {
               //result.Success
                // Unmask the viewport
                Ext.Viewport.unmask();
                Ext.Viewport.setActiveItem({xtype:'home'},{type: 'slide', direction: 'right'});            },
            failure: function(result, request) {
                // Unmask the viewport
                Ext.Viewport.unmask();
                Ext.Msg.alert("Login attempt failed");            }
        });
    },
    //Event Handler for login button tap action
    btnDashboardClick:function(){
        console.log("btnDashboardClick (Start)")
        Ext.Viewport.setActiveItem({xtype:'main'},{type: 'slide', direction: 'right'});
        console.log("btnDashboardClick (End)")
    }
});
