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
            'button[action=btnDashboardClick]' : {tap:"btnDashboardClick"} //Uses ComponentQuery selector to find the matching
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
        Ext.util.JSONP.request({
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
        });
        //console.log("login button tap event (End)");
    },
    //------------------------------------------------------------------------------------------------------------------
    //Event Handler Home dashboard button
    btnDashboardClick:function(){
        console.log("btnDashboardClick (Start)")
        Ext.getCmp('idMain').setActiveItem(1,{type: 'slide', direction: 'right'}).getTabBar().show();
        console.log("btnDashboardClick (End)")
    }
});
