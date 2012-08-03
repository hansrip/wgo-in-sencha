Ext.define("Wgo.view.Login", {
    extend: "Ext.form.Panel",
    xtype: 'login',
    id: 'loginForm', //
    config: {
        cls:"vm-form",  //this class with override sencha's form background color to white",
        items: [
            {
                xtype: 'header',
                docked: 'top'
            },
            {
                xtype: 'footer',
                docked: 'bottom'
            },
            {
                xtype: 'textfield',
                name: 'txtUserName',
                labelWidth:"0%", //Hack, if this is not set then the text box is right aligned due to the space allocated for label
                id:"id-txtUserName",
                cls:"vm-txt-username", //this will decorate the text box with "user" icon and also round bord the form control
                ClearIcon: false,
                placeHolder: 'Username',
                style: 'align: center',
                margin:'0 0 10 0' //this will give 10px space between the bottom control
            },
            {
                xtype: 'passwordfield',
                name: 'txtPassword',
                labelWidth:"0%", //same as above
                id:"id-txtPassword",
                cls:"vm-txt-Password",//same as above
                ClearIcon: false,
                placeHolder: 'Password',
                margin:'0 0 30 0'//this will give 30px space between the bottom control
            },
            {
                xtype: 'button',
                name: 'btnLoginSubmit',
                action: 'btnLoginSubmit', //Find button by action name inside the controller to attach event handlers
                text: 'Sign In',
                width:"100%",
                ui: 'confirm' //Green Theme
            }
        ]
    },
    initialize: function() {

    }
});
