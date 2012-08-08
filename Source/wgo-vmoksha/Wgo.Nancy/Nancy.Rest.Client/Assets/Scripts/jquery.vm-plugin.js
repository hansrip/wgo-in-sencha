var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
if ($.cookie("zohocss")) {
    $("link.changeme").attr("href", $.cookie("zohocss"));
    $("[rel='" + $.cookie("zohocss") + "']").addClass('circle');
}
else if (is_chrome && localStorage.getItem("zohocss") != null) {
    $("link.changeme").attr("href", localStorage.getItem("zohocss"));
    $("[rel='" + localStorage.getItem("zohocss") + "']").addClass('circle');
}       
(function ($) {
    $.fn.InitializeTemplate = function (file) {
        var pc = this.selector;
        $(pc).load(file, '', function (response, status, xhr) {

            if (status == 'error') {
                var msg = "Sorry but there was an error: ";
                $(".content").html(msg + xhr.status + " " + xhr.statusText);
            }
            if (file.indexOf('Header') != -1) {
                //Initialization and Events of Header
                $("#colorchanger a").click(function () {
                    $("#colorchanger a").removeClass('circle');
                    $(this).addClass('circle');
                    $("link.changeme").attr("href", $(this).attr('rel'));
                    if (is_chrome) {
                        localStorage.setItem("zohocss", $(this).attr('rel'));
                    }
                    else {
                        $.cookie("zohocss", $(this).attr('rel'), { expires: 365, path: '/' });
                    }
                    //var curvyBrowser = new browserdetect;
                });
            }
            if (file.indexOf('Footer') != -1) {
                //Initialization and Events of Footer
            }
            if (file.indexOf('Menu') != -1) {
                //Initialization and Events of Menu
            }
            if (file.indexOf('CABReport') != -1) {
                //Initialization and Events of Default
                $("#grpCabReport").grouptitle({ classname: "red-border", title: "CAB Report" });
                //RefDocument Popup panel initialization
                $("#divCABReportPopUp").dialog({ autoOpen: false, modal: true, width: 650, title: 'Add/Edit CAB Report' });
                $("#btnSave").click(SaveCABReportDetails);
                $("#CABReportSearchBox").attachSliderButton();
                $(".date").datepicker();
                //$('#btnCABReportSearch').click(BuildCABReportFlexiGrid);
            }
            if (file.indexOf('Login') != -1) {
                //Initialization and Events of Login
            }
        });
    };
})(jQuery);

/*Form Group Title ()*/
(function ($) {
    $.fn.grouptitle = function (config) {
        var html = '<table class="vm-frm-title ' + config.classname + ' id=""><tbody><tr><td style="width:200px;">' + config.title + '</td><td class="grouptitle"></td></tr></tbody></table>';
        $(this).append(html);
    };
})(jQuery);

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/*Slider Button*/
(function($) {
$.fn.attachSliderButton = function(parent) {
       var pc = this.selector;
        var collapsepath = "Assets/Theme/css/Images/"
        var ImgOpenWrap = { Exapnd: collapsepath + "expand_btn.jpg", Collapse: collapsepath + "collapse_btn.jpg" }

        $.get( "Assets/Templates/openwrap.htm", function(template) {

            $.tmpl(template, ImgOpenWrap).insertAfter(pc);

            $(".topMenuAction").click(function() {
                if ($("#searchForm").is(":hidden")) {
                    $("#searchForm").slideDown("slow");
                    $("#topMenuImage").html("<img src='" + ImgOpenWrap.Collapse + "' alt='open' />");
                    $("#openCloseWrap").css("margin-top", "4px");
                    $("#openCloseWrap").css("margin-left", "82px");
                } else {
                    $("#searchForm").slideUp("slow");
                    $("#topMenuImage").html("<img src='" + ImgOpenWrap.Exapnd + "' alt='open' />");
                    $("#openCloseWrap").css("margin-top", "9px");
                    $("#openCloseWrap").css("margin-left", "82px");
                }
            });
        });
    }
})(jQuery);