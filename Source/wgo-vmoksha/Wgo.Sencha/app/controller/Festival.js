Ext.define('Wgo.controller.Festival', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            //For the matching component query / xtype, sencha will create a free function for us whose name will be get<KeyName>()
           //main: 'main', //this will give the instance of 'main' view
            festivallist:'festivallist' //this will give the instance of 'festivallist' view
        },
        control: {
            '#idFestivalList': {disclose: 'showDetail'} //"#idFestivalList" is a component query (can say dom selector)
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    init: function() {
        console.log("Festival controller init(Start)")
        console.log("Festival controller init(End)")
    },
    //------------------------------------------------------------------------------------------------------------------
    showDetail: function(list, record) {
        //Todo: Detailsview not showingup after first attempt
        console.log("Festival controller showDetail(Start)")
        var fdv = Ext.create("Wgo.view.FestivalDetail");
        fdv.setRecord(record)

        this.getFestivallist().push(fdv)
        console.log("Festival controller showDetail(End)")
    }

});
