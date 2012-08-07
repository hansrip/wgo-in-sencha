Ext.define('wgo-hung.model.Issue', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'month', type: 'auto'},
            {name: 'year', type: 'auto'},
            {name: 'title', type: 'auto'}
        ]
    }
});