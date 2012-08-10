Ext.define('Wgo.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ 'userName', 'password','email', 'CreatedBy','DateCreated','DateModified','Id','ModifiedBy']
    }
});