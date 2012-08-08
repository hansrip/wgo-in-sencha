Ext.define('Wgo.view.Footer', {
    extend: 'Ext.Panel',
    xtype: 'footer',
    config: {
        items: [
            {
                xtype: 'panel',
                html: '<div class="vm-footer-strip"></div>'
            }
        ]
    }
});
