Ext.define('Wgo.view.FestivalDetail', {
    extend: 'Ext.Panel',
    xtype: 'festivaldetail',
    config: {
        title: 'Festivals',
        tpl: [
                '<div>'
               + ' <table>'
                + ' <tr><td style="font-weight: bold;padding-bottom: 5px;">{name}</td></tr>'
                + '        <tr>'
                + '            <td>'
                + '             <label class="vm-profile vm-profile-key">Period</label>'
                + '           <label class="vm-profile vm-profile-value">{period}</label>'
                + '        </td>'
                + '    </tr>'
                + '   <tr>'
                + '        <td>'
                + '         <label class="vm-profile vm-profile-key">Time</label>'
                + '         <label class="vm-profile vm-profile-value">{timings}</label>'
                + '     </td>'
                + ' </tr>'
                +'  <tr>'
                + '        <td>'
                + '         <label class="vm-profile vm-profile-key">City</label>'
                + '         <label class="vm-profile vm-profile-value">{city}</label>'
                + '     </td>'
                + ' </tr>'
                + ' <tr>'
                + '        <td>'
                + '         <label class="vm-profile vm-profile-key">Telephone</label>'
                + '         <label class="vm-profile vm-profile-value">{telePhone}</label>'
                + '     </td>'
                + ' </tr>'
                + ' <tr>'
                + '        <td colspan="2">'
                + '         <label class="vm-profile vm-profile-key">Details</label>'
                + '     </td>'
                + ' </tr>'
                + ' <tr>'
                + '        <td colspan="2" class="vm-profile-details">'
                + '         {details}'
                + '     </td>'
                + ' </tr>'
                + '</table>'
                + '</div>'
        ]
        ,styleHtmlContent: true
        ,scrollable: 'vertical'
    }
});
