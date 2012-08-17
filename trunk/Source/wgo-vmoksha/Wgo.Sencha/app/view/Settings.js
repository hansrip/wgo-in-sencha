Ext.define("Wgo.view.Settings", {
    extend: "Ext.Container",
    xtype:"settings",
    config: {
        id: 'idSetting',
        title: 'Settings',
        iconCls: 'settings',
        items: [
            {
                xtype: 'header',
                docked: 'top'
            },
            {
                xtype: "fieldset",
                items:  [{
                xtype:"togglefield",
                cls:'clsToggle',
                id:'idToggle',
                name:"Toggle",
                label:'Keep me logged in?',
                labelWidth:'45%',
                style:"font-size:0.8em;",
                //setting default value to ON
                value: 1, 
                //on toggle of button adding a listener to it                       
                listeners: {            
                    change:function(value) {
                        //getting value of toggle button
                        var val = Ext.getCmp("idToggle").getValues();
                        console.log(val);
                        // setting a local storage variable to store the value of the toggle button
                        localStorage.setItem("rememberUser",val);
                        if(val == 1)
                            // setting a local storage variable to store the values of the user data
                            localStorage.setItem("rememberUserLogged",localStorage.getItem('userData'));
                        else
                            localStorage.removeItem("rememberUserLogged"); 
                    }
                }
                }]
            },
     ]},
     
     initialize: function() {
         var rememberVal = localStorage.getItem("rememberUser");
         this.down("#idToggle").setValue(rememberVal);
     },
});
