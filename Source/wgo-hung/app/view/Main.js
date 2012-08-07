Ext.define('wgo-hung.view.Main', {
    extend: 'Ext.Toolbar',
    xtype: 'mainbar',

    config: {
        docked: 'bottom',
        items: [
            { 
                xtype: 'button',
                iconCls: 'home',
                iconMask: true,
                action: 'btnDashBoardClick'

            }
        ]
    }
});