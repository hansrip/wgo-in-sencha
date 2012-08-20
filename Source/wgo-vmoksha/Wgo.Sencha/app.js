Ext.application({
    name: 'Wgo',
    requires: [
        'Ext.MessageBox'
    ],
    models: ['Festival','Issue','User'],
    views:  ['Header','Footer','Login','Home', 'Main','FestivalList','IssueList','UserList','AddUser','Settings'],
    controllers: ['Main','Festival','UserController'],
    stores: ['FestivalStore','IssueStore','UserStore','AllUsersStore'],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    phoneStartupScreen : 'resources/startup/320x460.jpg',

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.jpg',
        '768x1004': 'resources/startup/768x1004.jpg',
        '748x1024': 'resources/startup/748x1024.jpg',
        '1536x2008': 'resources/startup/1536x2008.jpg',
        '1496x2048': 'resources/startup/1496x2048.jpg'
    },

    launch: function() {

        console.log("Application Launch (Start)")
        //Delay load the Login form by x sec just to feel the Launch UI
        var task = Ext.create('Ext.util.DelayedTask', function() {
            // Destroy the #appLoadingIndicator element
            Ext.fly('appLoadingIndicator').destroy();
            //Change the index.html background color to white
            Ext.get('wgo-pg-body').setStyle('backgroundColor', 'white');
            /*Todo: Check if authentication ticket already available*/

            //getting the local storage item in which we have stored the toggle button value
            var remMe = localStorage.getItem('rememberUser');
            //Here we check whether the localStorage item is there or not
            // if null we redirect to the login page
            if(remMe != null)
            {
                //if  the localStorage item is present we check for the value here
                //if 1 we retrieve the userData and store it in another localStorage item and restore the home page view
                //else we redirect to the login page
                if(remMe == 1)
                {
                    console.log('remMe = 1');
                    var getRememberData = localStorage.getItem('rememberUserLogged');
                    localStorage.setItem('userData',getRememberData);
                    Ext.Viewport.setActiveItem({xtype:'main'},{type: 'slide', direction: 'right'});
                    //Ext.Viewport.add(mainPageView);
                }
                else
                {
                    console.log('remMe = 0');
                    localStorage.setItem('rememberUser',0);
                    //Ext.Viewport.add(loginPageView);
                    Ext.Viewport.setActiveItem({xtype:'login'},{type: 'slide', direction: 'right'});
                }
            }
            else
            {
                console.log('remMe = null');
                localStorage.setItem('rememberUser',0);
                //Ext.Viewport.add(loginPageView);
                Ext.Viewport.setActiveItem({xtype:'login'},{type: 'slide', direction: 'right'});
            }
            
        });
        task.delay(100);
        console.log("Application Launch (End)")
    },
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
