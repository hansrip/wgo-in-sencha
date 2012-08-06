Ext.define("wgo-hung.view.Login", {
    extend: 'Ext.form.Panel',
    xtype: 'login',
    id: 'loginForm', //check what id's are for (controllers)
    fullscreen:'true',
    autoMaximize:'true',
    requires: [
    'Ext.field.Password'
    ],
    config: {
        cls: "vm-form", //this css class overrides sencha's form bg color to white from grey"
        items: [
            {
                xtype: 'header',
                docked: 'top'
            },
            {
                xtype: 'footer',
                docked: 'bottom',
                minHeight: '100px',
                style: {
                    background: '#99CCFF'
                }
            },
            {
                xtype: 'textfield',
                name: 'txtUserName',
                labelWidth:"0%", // if not set then text box is right aligned due to space allocated for label
                id: "id-txtUserName",
                cls: "vm-txt-username", //decorates text box with "user" icon and border radius
                ClearIcon: false, //what does this mean?
                placeHolder: 'Username',
                style: 'align: center',
                margin: '0 0 10 0' //give bottom of this text field a 10px margin
                
            },
            {
                xtype: 'passwordfield',
                name: 'txtPassword',
                labelWidth:"0%",
                id: "id-txtPassword",
                cls: "vm-txt-Password",
                //ClearIcon: false,
                placeHolder: 'Password',
                margin: '0 0 30 0' //gives bottom of this text field a 30px margin
            },
            {
                xtype: 'button',
                name: 'btnLoginSubmit',
                action: 'btnLoginSubmit', // Find button by action name inside the controller to attach event handlers?
                text: 'Sign In',
                width: "100%",
                ui: 'confirm' //Green Themed default Sencha UI
            }

        ]
    },
    //what's this for??
    initialize: function(){

    }
});
