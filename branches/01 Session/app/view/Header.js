Ext.define('Wgo.view.Header', {
    extend: 'Ext.Panel',
    xtype: 'header',
    config: {
        items: [
            {
                xtype: 'panel',
                html: '<div class="vm-header-logo"><TABLE><TR><TD><div class="vm-dot"><div class="vm-dot-text">Wgo</div></div><TD><div class="vm-header-logo-text">Matsuyama City</div></TD></TR></TABLE></div>'

            }
        ]
    }
});
