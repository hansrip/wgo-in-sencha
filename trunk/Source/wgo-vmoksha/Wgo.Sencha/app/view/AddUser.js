Ext.define("Wgo.view.AddUser", {
    extend: "Ext.form.Panel",
    xtype: 'adduser',
    id: 'userForm',
    config: {
        cls:"vm-form",  //this class will override sencha's form background color to white",
        scrollable:true,
        items: [
            {
                xtype: 'textfield',
                name: 'txtUser', // We use this to get the values from the form object i.e. form.getValues().txtUserName
                labelWidth:'0%', 
                cls:"vm-txt-usr", //this will decorate the text box with "user" icon and also round bord the form control
                ClearIcon: false,
                placeHolder: 'Enter your Username',
                style: 'align: center'
            },
            {
                xtype: 'textfield',
                name: 'txtEmail', // We use this to get the values from the form object i.e. form.getValues().txtEmail
                labelWidth:'0%',
                cls:"vm-txt-email", //this will decorate the text box with "user" icon and also round bord the form control
                ClearIcon: false,
                placeHolder: 'Enter your email',
                style: 'align: center'
            },
            {
                xtype: 'passwordfield',
                name: 'txtPwd',
                labelWidth:'0%',
                cls:"vm-txt-pwd",//same as above
                ClearIcon: false,
                placeHolder: 'Enter your Password'
            },
            {
                xtype: 'button',
                name: 'btnUserSubmit',
                action: 'btnUserSubmit', //Find button by action name inside the controller to attach event handlers
                text: 'Create',
                width:"100%",
                ui: 'confirm' //Green Theme
            }
        ]
    },
    initialize: function() {
        console.log("User View Initialize (Start)")
        console.log("User View Initialize (End)")
    }
});
