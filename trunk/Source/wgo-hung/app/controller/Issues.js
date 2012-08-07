Ext.define('wgo-hung.controller.Issues', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {

            issueslist: 'issueslist'
            
        },
        control: {

            'issueslist list': {disclose: 'showDetail'}

        }
    },
    
    showDetail: function(list, record) {
        console.log("item disclose " + record.get('title'))
       
        this.getIssueslist().push({
            xtype:'issuesdetail',
            title: record.get('title'),
            data: record.getData()
        })
    }


    //called when the Application is launched, remove if not needed
    //launch: function(app) {}
});