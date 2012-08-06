Ext.define('Wgo.controller.Main', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //For the matching component query / xtype, sencha will create a free function for us whose name will be get<KeyName>()
            main: 'main',
            loginForm:'#loginForm' // <anyKey> : <object/dom identifier> this will freely create a function called get<AnyKey>()
                                   // We can also use xtype i.e. loginForm:'login'
            },
        control: {
            //Attach event handlers for controls matched by component queries. In this case button whose action="btnLoginSubmit" is queried
            // and for the query result, event handler function "submitLoginForm" is attached
            'button[action=btnLoginSubmit]' : {tap:"submitLoginForm"}, //Uses ComponentQuery selector to find the matching
            '#idFestivalList': {disclose: 'showDetail'}, //"#idFestivalList" is a component query (can say dom selector)
            'button[action=btnDashboardClick]' : {tap:"btnDashboardClick"} //Uses ComponentQuery selector to find the matching
        }
    },
    init: function() {
        console.log("Main controller init(Start)")
        console.log("Main controller init(End)")
    },

    //Event Handler for login button tap action
    submitLoginForm:function(){
        //console.log("login button tap event (Start)");
        var form = this.getLoginForm(); //We got this for free through refs above
        console.log("Before Form Submit")
        form.submit({
            url:'loginform.aspx', //Fire a ajax call to authenticate. This can be a RoR Rest call
            //
            success : function(){Ext.Viewport.setActiveItem({xtype:'home'},{type: 'slide', direction: 'right'});}, //On Success show home panel. In our case this should be the Home/Dashboard page
            failure: function(){console.log("Form Submit callback Failure - Authentication Success")}
        })

    },
    //Event Handler for login button tap action
    btnDashboardClick:function(){
        console.log("btnDashboardClick (Start)")
        Ext.Viewport.setActiveItem({xtype:'main'},{type: 'slide', direction: 'right'});
        console.log("btnDashboardClick (End)")
    },
    showDetail: function(list, record) {
        console.log("item disclose")
    }

});
