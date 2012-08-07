Ext.define('wgo-hung.view.IssuesDetail', {
    extend: 'Ext.Panel',
    xtype: 'issuesdetail',

    config: {
        title: 'Issues',

        tpl: '{year} and {month} and {title}',
        styleHtmlContent: true,
        scrollable: 'vertical'
    }
});
