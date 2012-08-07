Ext.define('wgo-hung.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            //Refs enable us to do component query or query by xtype.  Sencha auto creates a function like getMain or getLoginform for us
            //<anyKey> : <object / dom identifier / xtype> is the structure for refs
            main: 'main',
            loginForm:'#loginForm',
            festivallist: 'festivallist'
        },
        control: {
            //Attach event handlers for controls matched by component queries
            'button[action=btnLoginSubmit]' : {tap:"submitLoginForm"}, //Uses ComponentQuery selector to find the matching component and attaches a function
            'festivallist list': {disclose: 'showDetail'}, //"#idFestivalList" is a component query (can be a DOM selector)
            'button[action=btnDashBoardClick]' : {tap:"btnDashboardClick"},
            'button[action=btnGetIssues]' : {tap:"btnGetIssues"},
            'button[action=btnGetFestivals]' : {tap:"btnGetFestivals"}   
        }
    },
    
    //called when the Application is launched, remove if not needed
    init: function() {
        console.log("Main controller init(Start")
        console.log("Main controller init(End)")
        
    },

    //Event Handler for login button tap action
    submitLoginForm: function(){
        var form = this.getLoginForm(); //the getLoginForm function was created by making loginForm a ref
        console.log("Before Form Submit")
        form.submit({
            url:'login.json', //Fires an AJAX call to authenticate. This is a Sencha Touch function
            success: function(){Ext.Viewport.setActiveItem({xtype:'home'},{xtype:'slide',direction:'right'});}, //on success - show the home panel with animation? check to see if necessary
            failure: function(){console.log("Form submit callback Failure - Authentication Fail")}
        })
    },
   //Event Handler for DashboardClick tap action
    btnDashboardClick:function(){
        console.log("btnDashboardClick (Start)")
        Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        Ext.Viewport.setActiveItem({xtype:'home'},{type: 'slide', direction: 'right'});
        console.log("btnDashboardClick (End)")
    },
       //Event Handler for GetFestivals tap action
    btnGetFestivals:function(){
        console.log("btnGetFestivals (Start)")
        //Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        Ext.Viewport.setActiveItem({xtype:'festivallist'},{type: 'slide', direction: 'right'});
        console.log("btnGetFestivals (End)")
    },
       //Event Handler for GetIssues tap action
    btnGetIssues:function(){
        console.log("btnGetIssues (Start)")
        //Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
        Ext.Viewport.setActiveItem({xtype:'issueslist'},{type: 'slide', direction: 'right'});
        console.log("btnGetIssues (End)")
    },
    showDetail: function(list, record) {
        console.log("item disclose " + record.get('name'))
        //Ext.Viewport.remove(Ext.Viewport.getActiveItem(), true);
       
        this.getFestivallist().push({
            xtype:'festivaldetail',
            title: record.get('name'),
            data: record.getData()
        })
    }
 });