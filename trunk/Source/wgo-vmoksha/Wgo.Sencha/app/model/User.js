Ext.define('Wgo.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ 'username', 'password','email', 'CreatedBy','DateCreated','DateModified','Id','ModifiedBy']
    }
});