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
                name: 'id', // We use this to get the values from the form object i.e. form.getValues().txtUserName
                id: 'txtUserId',
                labelWidth:'0%',
                cls:"vm-txt-usrid", //this will decorate the text box with "user" icon and also round bord the form control
                ClearIcon: false,
                hidden:true,// To keep track of the id we use this field
                disabled:true,                
                style: 'align: center'
            },
            {
                xtype: 'textfield',
                name: 'username', // We use this to get the values from the form object i.e. form.getValues().txtUserName
                id: 'txtUser',
                labelWidth:'0%',
                cls:"vm-txt-usr", //this will decorate the text box with "user" icon and also round bord the form control
                ClearIcon: false,
                placeHolder: 'Enter your Username',
                style: 'align: center'
            },
            {
                xtype: 'textfield',
                name: 'email', // We use this to get the values from the form object i.e. form.getValues().txtEmail
                id: 'txtEmail',
                labelWidth:'0%',
                cls:"vm-txt-email", //this will decorate the text box with "user" icon and also round bord the form control
                ClearIcon: false,
                placeHolder: 'Enter your email',
                style: 'align: center'
            },
            {
                xtype: 'passwordfield',
                name: 'password',
                id: 'txtPwd',
                labelWidth:'0%',
                cls:"vm-txt-pwd",//same as above
                ClearIcon: false,
                placeHolder: 'Enter your Password'
            },
            {
                xtype: 'button',
                name: 'btnUserSubmit',
                id:'btnUserSubmit',
                action: 'btnUserSubmit', //Find button by action name inside the controller to attach event handlers
                text: 'Create',
                width:"100%",
                style:'float:left;',
                ui: 'confirm' //Green Theme
            },
            {
                xtype: 'button',
                name: 'btnUserSync',
                id:'btnUserSync',
                action: 'btnUserSync', //Find button by action name inside the controller to attach event handlers
                text: 'Sync',
                hidden:true,
                width:"50%",
                style:'float:left;',
                ui: 'round' //Green Theme
            }
        ]
    },
    initialize: function() {
        console.log("User View Initialize (Start)")
        console.log("User View Initialize (End)")
    }
});
