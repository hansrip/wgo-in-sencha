//------------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------------
function MakeDataTable(m_DataTableName
                                            , m_PlaceHolder
                                            , m_ColumnDefs
                                            , m_DBCols
                                            , m_DataSource
                                            , m_PageNatorConfigs
                                            , m_Formatters
                                            , m_ArrayDataTableConfigs) {

    //check whethere the datatable exists, if not then create instance
    if (!YAHOO.lang.isObject(YAHOO.YUI.Web[m_DataTableName])) {
        //assigfning the datasource to a local variable
        var myDataSource = new YAHOO.util.DataSource(m_DataSource);
        var myColDefs = MakeColumnDefs(m_ColumnDefs);
        //The datasource will always be the JSARRAY in our case
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
        //Response Schema
        myDataSource.responseSchema = MakeResponseSchema(m_DBCols);
        if (m_ArrayDataTableConfigs.length > 2) { // 2nd index is RowFormatter
            var RowFormatter = m_ArrayDataTableConfigs[2];
        }
        var _Height = null;
        var _Width = null;
        if (m_ArrayDataTableConfigs.length > 3) { // 3rd index is Height
            _Height = m_ArrayDataTableConfigs[3];
        }
        if (m_ArrayDataTableConfigs.length > 4) { // 4th index is Width
            _Width = m_ArrayDataTableConfigs[4];
        }
        var myConfig = MakeDataTableConfig(_Height, _Width, m_PageNatorConfigs, RowFormatter);
        
         

        if (!YAHOO.lang.isNull(m_Formatters)) {
            var _Formatters = [];
            _Formatters = m_Formatters.split('|');
            for (q = 0; q < _Formatters.length; q++) {
                YAHOO.widget.DataTable.Formatter[_Formatters[q]] = eval(_Formatters[q]);
            }
        }
        YAHOO.YUI.Web[m_DataTableName] = new YAHOO.widget.ScrollingDataTable(
                                                                                          m_PlaceHolder
                                                                                        , myColDefs
                                                                                        , myDataSource
                                                                                        , myConfig
                                                                                        );        
        //Subscribing Events      
        if (m_ArrayDataTableConfigs != null && m_ArrayDataTableConfigs.length > 0) { //0th index is columns to be hidden
            if (m_ArrayDataTableConfigs[0] != null) {
                HideColumns(m_DataTableName, m_ArrayDataTableConfigs[0]); //m_ArrayDataTableConfigs[0] --> delimited string of columns
            }
            if (m_ArrayDataTableConfigs.length > 1) { // 1st index is events
                if (m_ArrayDataTableConfigs[1] != null) {
                    SubscribeEvents(m_DataTableName, m_ArrayDataTableConfigs[1]); //m_ArrayDataTableConfigs[0] --> delimited string of events andf handlers (name value pair is delimited with "*")
                }
            }
        }
    } else { //Datatable exists so relaod
    	ReloadDataTable(m_DataTableName, m_DataSource);
    }

//TODO: This event subscription is application only for "Dole-UAA" project. Can be removed if this functionality not required.
    //YAHOO.YUI.Web[m_DataTableName].subscribe("rowClickEvent", YAHOO.YUI.Web[m_DataTableName].onEventSelectRow);
}
//------------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------------
function MakeColumnDefs(m_ColumnDefs) {

    var oColumnDefs = [];
    var count = m_ColumnDefs.length;
    for (i = 0; i < count; i++) {
        var oColumn = "";
        oColumn += '{"key":' + '"' + m_ColumnDefs[i][0] + '"'                                //Key
        oColumn += ',"label":' + '"' + m_ColumnDefs[i][1] + '"'                              //Header Field Label       
        if (!YAHOO.lang.isNull(m_ColumnDefs[i][2])) {
            oColumn += ',"sortable":' + m_ColumnDefs[i][2]                                   //Header Column sortable?
        }
        if (!YAHOO.lang.isNull(m_ColumnDefs[i][3]))                                            //Header Sort order
        {
            oColumn += ',"sortOptions":' + '"' + m_ColumnDefs[i][3] + '"'
        }
        if (!YAHOO.lang.isNull(m_ColumnDefs[i][4]))                                            //Column Resizable
        {
            oColumn += ',"resizeable":' + m_ColumnDefs[i][4]
        }
        if (!YAHOO.lang.isNull(m_ColumnDefs[i][5])) {                                          //Formatter   
            oColumn += ',"formatter":' + '"' + m_ColumnDefs[i][5] + '"'
        }
        if (!YAHOO.lang.isNull(m_ColumnDefs[i][6])) {                                          //Fixed Width
            oColumn += ',"width":' + m_ColumnDefs[i][6]
        }
        oColumn += '}';
        oColumnDefs[i] = YAHOO.lang.JSON.parse(oColumn);
    }
    return oColumnDefs;
}
//------------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------------
function MakeResponseSchema(m_DBColumnDefs) {
   
    var myDBColumnDefs = [];
    var count = m_DBColumnDefs.length;
    var oDBColumn = '';
    //Build json string
    oDBColumn += '{"fields" : [';
    for (i = 0; i < count; i++) {
        oDBColumn += '"' + m_DBColumnDefs[i] + '"';
        oDBColumn += (i != (count - 1)) ? ',' : '';
    }
    oDBColumn += ']}';
    //Convert to JSON object from string
    var fields = YAHOO.lang.JSON.parse(oDBColumn);
    //return the column definition objects
    return fields;
}
//["mypage"]*2*[2,4]*2
//------------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------------
function MakeDataTableConfig(m_Height, m_Width, m_PagenatorOptions, m_RowFormatter) {
    var oConfig = '';
    oConfig += '{';
    oConfig += '"renderLoopSize"' + ':' + '100';
    if (!isNaN(m_Height)) {
        oConfig += YAHOO.lang.isNull(m_Height) ? '' : ',"height"' + ':' + '"' + m_Height + 'em"';
    }
    else {
        oConfig += YAHOO.lang.isNull(m_Height) ? '' : ',"height"' + ':' + '"' + m_Height + '"';
    }
    if (!isNaN(m_Width)) {
        oConfig += YAHOO.lang.isNull(m_Width) ? '' : ',"width"' + ':' + '"' + m_Width + 'em"';
    }
    else {
        oConfig += YAHOO.lang.isNull(m_Width) ? '' : ',"width"' + ':' + '"' + m_Width + '"';
    }
    if (!YAHOO.lang.isNull(m_PagenatorOptions)) {
        oConfig += ',"paginator"' + ':' + 'null';
    }
    oConfig += '}';
    var dtConfig = YAHOO.lang.JSON.parse(oConfig);
    //attach Row Formatter
    if (!YAHOO.lang.isNull(m_RowFormatter)) {
        dtConfig["formatRow"] = window[m_RowFormatter];
    }
    
    if (!YAHOO.lang.isNull(m_PagenatorOptions)) {
        var parr = m_PagenatorOptions.split('|'); //the string will be like this '["mypage"]|2|[2,4]|2'
        dtConfig.paginator = MakePagenator(YAHOO.lang.JSON.parse(parr[0])
                                                                        , YAHOO.lang.JSON.parse(parr[1])
                                                                        , YAHOO.lang.JSON.parse(parr[2])
                                                                        , YAHOO.lang.JSON.parse(parr[3])
                                                                        , parr[4] // template
                                                                        , parr[5] // page template
                                                                        );      
                                                                                                                                            
    }   
    return dtConfig;
}
//------------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------------
function MakePagenator(m_ArrayContainer, m_RowsPerPage, m_ArrayRowsPerPageOptions, m_PageLinks, m_template, m_pageReportTemplate) {
    
    var oPaginator = new YAHOO.widget.Paginator({
        rowsPerPage: m_RowsPerPage,
        containers: m_ArrayContainer,
        //template: YAHOO.widget.Paginator.TEMPLATE_ROWS_PER_PAGE,
        template: "{PreviousPageLink} {CurrentPageReport} {NextPageLink} {RowsPerPageDropdown}",
        pageReportTemplate: "Showing items {startIndex} - {endIndex} of {totalRecords}",
        rowsPerPageOptions: m_ArrayRowsPerPageOptions,
        pageLinks: m_PageLinks
    });
    if (m_template != null) {
        oPaginator._configs.template.value = m_template;
    }
    
    if (m_pageReportTemplate != null) {
        oPaginator._configs.pageReportTemplate.value = m_pageReportTemplate;
    }
    //oPaginator._configs.template.value = "{CurrentPageReport} </br> {PreviousPageLink}  {NextPageLink}";
    //oPaginator._configs.pageReportTemplate.value = "<font color='#000000'>Note {startIndex} of {totalRecords} </font>";
    return oPaginator;
}
//------------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------------
function ReloadDataTable(m_DataTableName, m_DataSource) {
    var oTable = YAHOO.YUI.Web[m_DataTableName];
    oTable.getRecordSet().replaceRecords(m_DataSource);
    oTable.refreshView();   
    //If pagenator attached then refresh the pagenator with the actual results count
    try{
        var paginator = oTable.get('paginator');
        if(paginator)
            paginator.set('totalRecords', m_DataSource.length);    
    }catch (e) { } 
           
}
//------------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------------
function HideColumns(m_DataTableName, m_DelimitedColumnKeys) {
    try {

       
        var ArrayColumnKeys = m_DelimitedColumnKeys.split('|');
        for (i = 0; i < ArrayColumnKeys.length; i++) {
            YAHOO.YUI.Web[m_DataTableName].hideColumn(ArrayColumnKeys[i]);
        }
    } catch (e) { }
}
//------------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------------
function SubscribeEvents(m_DataTableName, m_DelimitedEventAndHandlers) {
    try {
        var ArrayEvents = m_DelimitedEventAndHandlers.split('|');
        for (i = 0; i < ArrayEvents.length; i++) {
            var events = ArrayEvents[i].split('*');
            //Event name and handlers are delimited with "*";
            if (YAHOO.lang.isFunction(window[events[1]])); //If the function exists then subscribe
            YAHOO.YUI.Web[m_DataTableName].subscribe(events[0], window[events[1]]); //actual Subscribtion
        }
    } catch (e) { }
}

//===========================================================================================
                                                                /*YUI Popup Panel Control*/
//----------------------------------------------------------------------------------------------------------------------------------------------
// Creates instance of YUI modal popup control
//***********************************************************************************************************************
//Example: CreateYUIPopUpPanel("panelTimeEntry|400|fdn)
//  1)popup panel identifier (Example: panelTimeEntry)
//  2)Width in pixels (Example: panelTimeEntry)
//  3)Container Control identifier on which the popup is rendered, default will be "body" (Example: fdn)
//***********************************************************************************************************************
//Key details
//If the popup panel name is "panelTimeEntry" then the
//  a) instanceof of the panel control will be "instance_panelTimeEntry", which can be accessed outside as "YAHOO.YUI.Web["instance_panelTimeEntry"]
//  b) Submit Event Handler function should be named like "function panelTimeEntry_Submit(){}"
//  c) Cancel Event Handler function should be named like "function panelTimeEntry_Cancel(){}"
//  d) popup control show will be called as "YAHOO.YUI.Web["instance_panelTimeEntry"].show()"
//  e) popup control hide will be called as "YAHOO.YUI.Web["instance_panelTimeEntry"].hide()"
//----------------------------------------------------------------------------------------------------------------------------------------------
function CreateYUIPopUpPanel(configs) {
    try {
        var inputArray = configs.split('|');
    	var _panel = inputArray[0];
    	var _instance = 'instance_' + inputArray[0];
        if (YAHOO.YUI.Web[_instance] == undefined || YAHOO.YUI.Web[_instance] == null) {
            // Instantiate the Dialog
            YAHOO.YUI.Web[_instance] = new YAHOO.widget.SimpleDialog(inputArray[0],
	                  { width: inputArray[1] + "Px",
	                      modal: true,
	                      fixedcenter: true,
	                      visible: false,
	                      constraintoviewport: true
	                  });
            //If submit handler exists then attach submit event
            var _handleSubmit = window[inputArray[0] + '_Submit']; //Get the handler using window[..]
            var _handleCancel = window[inputArray[0] + '_Cancel']; //Get the handler using window[..]
            if (YAHOO.lang.isFunction(_handleSubmit)); { YAHOO.YUI.Web[_instance].submit = _handleSubmit; }
            if (YAHOO.lang.isFunction(_handleCancel)); { YAHOO.YUI.Web[_instance].cancel = _handleCancel; }

            //render the popup in the body
            YAHOO.YUI.Web[_instance].render(inputArray[2] == null ? document.body : inputArray[2]);
        }
    } catch (e) { throw new Error("Failed to create YUI popup panel"); }
}


//===================================================================================================
//------------------------YUI Auto Complet TextBox---------------------------------------------------
//===================================================================================================
var oConfigs = {
    prehighlightClassName: "yui-ac-prehighlight",
    useShadow: false,
    queryDelay: 0,
    minQueryLength: 0,
    animVert: .00
}
var vmoautocomplete_el;
function MakeAutoCompleteText(m_textboxId 
                        , m_PlaceHolder                                              
                        , m_DBCols
                        , m_DataSource
                        , m_autocompleteEvents
                        ,dropdownIdstobehide
                       ) {
    var _autocomplete = "instance_" + m_textboxId;
    if (YAHOO.YUI.Web[_autocomplete] === undefined) {debugger;
    
        var myDataSource = new YAHOO.util.LocalDataSource(m_DataSource);
        //The datasource will always be the JSARRAY in our case
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
        //Response Schema
        myDataSource.responseSchema = MakeAutoCompletResponseSchema(m_DBCols.split('|'));
        YAHOO.YUI.Web[_autocomplete] = new YAHOO.widget.AutoComplete(m_textboxId, m_PlaceHolder, myDataSource, oConfigs);
        YAHOO.YUI.Web[_autocomplete].maxResultsDisplayed = m_DataSource.length
    if (m_autocompleteEvents != null) { 
        YAHOO.YUI.Web[_autocomplete].itemSelectEvent.subscribe(window[m_autocompleteEvents]);
    }    
    YAHOO.YUI.Web[_autocomplete].containerExpandEvent.subscribe(function() {
        //To make the content left align
    if (vmoautocomplete_el == undefined) {
            vmoautocomplete_el = YAHOO.util.Dom.getElementsByClassName("yui-ac-bd");
            for (var i = 0; i < vmoautocomplete_el.length; i++) {
                vmoautocomplete_el[i].children[0].style.paddingLeft = "0px";
            } 
        }
    })
//Hiding and visible the dropdowns when container expand and close
if (dropdownIdstobehide != null) {
    YAHOO.YUI.Web[_autocomplete].containerPopulateEvent.subscribe(function() {
        var splitres = dropdownIdstobehide.split('|')
        for (var i = 0; i < splitres.length; i++) {
            YAHOO.util.Dom.get(splitres[i]).style.visibility = 'hidden';
            
        }
    });
    YAHOO.YUI.Web[_autocomplete].containerCollapseEvent.subscribe(function() {

        var splitres = dropdownIdstobehide.split('|')
        for (var i = 0; i < splitres.length; i++) {
            YAHOO.util.Dom.get(splitres[i]).style.visibility = '';
        }

    });
}
YAHOO.util.Event.addListener(m_textboxId, "click", clicked);
}
}

function MakeAutoCompletResponseSchema(m_DBColumnDefs) {
    var myDBColumnDefs = [];
    var count = m_DBColumnDefs.length;
    var oDBColumn = '';
    //Build json string
    oDBColumn += '{"fields" : [';
    for (i = 0; i < count; i++) {
        oDBColumn += '"' + m_DBColumnDefs[i] + '"';
        oDBColumn += (i != (count - 1)) ? ',' : '';
    }
    oDBColumn += ']}';
    //Convert to JSON object from string
    var fields = YAHOO.lang.JSON.parse(oDBColumn);
    //return the column definition objects
    return fields;
}
function clicked() {
    var _autocomplete="instance_" + this.id;
    YAHOO.YUI.Web[_autocomplete].getInputEl().focus(); // Needed to keep widget active
    setTimeout(function() { YAHOO.YUI.Web[_autocomplete].sendQuery(""); }, 0);
}

//===================================================================================================
//------------------------End Of YUI Auto Complet TextBox--------------------------------------------
//===================================================================================================

//------------------------------------------------------------------------------------------------------
//Document Title formatter (formatter for doc title column)
//-------------------------------------------------------------------------------------------------------
function ChopDataDocTitleFormatter(elCell, oRecord, oColumn, oData) {
    var descriptionLink;
    var choplen;
    if (oRecord._oData.DocumentTitle.length > 40)
        choplen = 40;
    else
        choplen = oRecord._oData.DocumentTitle.length;
    var chopdatastr = chopdata(oRecord.getData(oColumn.key), 0, choplen);
    elCell.innerHTML = "<a href='Javascript:void(0);' style='text-decoration:none;cursor:text;' title='" + oRecord.getData(oColumn.key) + "'>" + chopdatastr + "</a>";
}

function YUI_NumberFormatter(elCell, oRecord, oColumn, oData) {
      $(elCell).css('text-align','right') //This is jquery way of setting
      
      elCell.innerHTML =  oRecord.getData(oColumn.key);    
    }
    
    
    
    //---------------------------------------------------------------------------------------------------------------    
//----Function to handle both Server Side and Client Side Pagination for the datatable---------------------------
//---------------------------------------------------------------------------------------------------------------
//m_State indicates whether Pagination to be done on Client Side or on the Server Side
//m_State = 0 for Client Side 
//m_State = 1 for Server Side
function MakePaginatedDataTable(m_DataTableName
                                            , m_PlaceHolder
                                            , m_ColumnDefs
                                            , m_DBCols
                                            , m_DataSource
                                            , m_PageNatorConfigs
                                            , m_Formatters
                                            , m_ArrayDataTableConfigs, m_State) {

    //check whethere the datatable exists, if not then create instance
    if (!YAHOO.lang.isObject(YAHOO.YUI.Web[m_DataTableName])) {
    
        //assigfning the datasource to a local variable
        var myDataSource = new YAHOO.util.DataSource(m_DataSource);
        var myColDefs = MakeColumnDefs(m_ColumnDefs);
        //The datasource will always be the JSARRAY in our case
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSARRAY;
        //Response Schema
        myDataSource.responseSchema = MakePaginatedResponseSchema(m_DBCols,myDataSource,m_DataSource,m_State);
        if (m_ArrayDataTableConfigs.length > 2) { // 2nd index is RowFormatter
            var RowFormatter = m_ArrayDataTableConfigs[2];
        }
        var _Height = null;
        var _Width = null;
        if (m_ArrayDataTableConfigs.length > 3) { // 3rd index is Height
            _Height = m_ArrayDataTableConfigs[3];
        }
        if (m_ArrayDataTableConfigs.length > 4) { // 4th index is Width
            _Width = m_ArrayDataTableConfigs[4];
        }
        var myConfig = MakePaginatedDataTableConfig(_Height, _Width, m_PageNatorConfigs, RowFormatter,m_State,m_ColumnDefs,myDataSource);        
         

        if (!YAHOO.lang.isNull(m_Formatters)) {
            var _Formatters = [];
            _Formatters = m_Formatters.split('|');
            for (q = 0; q < _Formatters.length; q++) {
                YAHOO.widget.DataTable.Formatter[_Formatters[q]] = eval(_Formatters[q]);
            }
        }
        YAHOO.YUI.Web[m_DataTableName] = new YAHOO.widget.ScrollingDataTable(
                                                                                          m_PlaceHolder
                                                                                        , myColDefs
                                                                                        , myDataSource
                                                                                        , myConfig
                                                                                        );        
                                                                                        
          if(m_State == 1)
          {
                 // Update totalRecords on the fly with value from server
                    YAHOO.YUI.Web[m_DataTableName].handleDataReturnPayload = function(oRequest, oResponse, oPayload) {
                    oPayload.totalRecords = oResponse.meta.totalRecords;
                    return oPayload;
                }
          }                                                                                        
        //Subscribing Events      
        if (m_ArrayDataTableConfigs != null && m_ArrayDataTableConfigs.length > 0) { //0th index is columns to be hidden
            if (m_ArrayDataTableConfigs[0] != null) {
                HideColumns(m_DataTableName, m_ArrayDataTableConfigs[0]); //m_ArrayDataTableConfigs[0] --> delimited string of columns
            }
            if (m_ArrayDataTableConfigs.length > 1) { // 1st index is events
                if (m_ArrayDataTableConfigs[1] != null) {
                    SubscribeEvents(m_DataTableName, m_ArrayDataTableConfigs[1]); //m_ArrayDataTableConfigs[0] --> delimited string of events andf handlers (name value pair is delimited with "*")
                }
            }
        }
    } else { //Datatable exists so relaod
    	ReloadDataTable(m_DataTableName, m_DataSource);
    }

//TODO: This event subscription is application only for "Dole-UAA" project. Can be removed if this functionality not required.
    //YAHOO.YUI.Web[m_DataTableName].subscribe("rowClickEvent", YAHOO.YUI.Web[m_DataTableName].onEventSelectRow);
}
function MakePaginatedResponseSchema(m_DBColumnDefs,myDataSource,m_DataSource,m_State) {
   
    var myDBColumnDefs = [];
    var count = m_DBColumnDefs.length;
    var oDBColumn = '';
    if(m_State == 0)//Client Side
    {
         //Build json string
        oDBColumn += '{"fields" : [';
        for (i = 0; i < count; i++) {
            oDBColumn += '"' + m_DBColumnDefs[i] + '"';
            oDBColumn += (i != (count - 1)) ? ',' : '';
        }
        oDBColumn += ']}';
    }
    else{//Server Side
            //Build json string
            oDBColumn += '{';
            oDBColumn += '"resultsList" : "' + myDataSource + '",';
            oDBColumn += '"fields" : [';
            for (i = 0; i < count; i++) {
                oDBColumn += '"' + m_DBColumnDefs[i] + '"';
                oDBColumn += (i != (count - 1)) ? ',' : '';
            }
            oDBColumn += '],';
            oDBColumn += '"metaFields" : {"totalRecords" : "' + m_DataSource.length + '"}';
            oDBColumn += '}';
    }  
   
    //Convert to JSON object from string
    var fields = YAHOO.lang.JSON.parse(oDBColumn);
    //return the column definition objects
    return fields;
}
function MakePaginatedDataTableConfig(m_Height, m_Width, m_PagenatorOptions, m_RowFormatter,m_State,m_ColumnDefs,myDataSource) {
    var oConfig = '';
    oConfig += '{';
    oConfig += '"renderLoopSize"' + ':' + '100';
    if (!isNaN(m_Height)) {
        oConfig += YAHOO.lang.isNull(m_Height) ? '' : ',"height"' + ':' + '"' + m_Height + 'em"';
    }
    else {
        oConfig += YAHOO.lang.isNull(m_Height) ? '' : ',"height"' + ':' + '"' + m_Height + '"';
    }
    if (!isNaN(m_Width)) {
        oConfig += YAHOO.lang.isNull(m_Width) ? '' : ',"width"' + ':' + '"' + m_Width + 'em"';
    }
    else {
        oConfig += YAHOO.lang.isNull(m_Width) ? '' : ',"width"' + ':' + '"' + m_Width + '"';
    }
    if (!YAHOO.lang.isNull(m_PagenatorOptions)) {
        oConfig += ',"paginator"' + ':' + 'null';
    }
    
    if(m_State ==1) /// Server Side Query Build
    {
        oConfig += ',"initialRequest"' + ':' + 'null';           
        oConfig += ',"generateRequest"' + ':' + 'null'; 
        oConfig += ',"sortedBy"' + ':' + 'null';    
    }   
    oConfig += '}';
    
    var dtConfig = YAHOO.lang.JSON.parse(oConfig);
    //attach Row Formatter
    if (!YAHOO.lang.isNull(m_RowFormatter)) {
        dtConfig["formatRow"] = window[m_RowFormatter];
    }
    
    if (!YAHOO.lang.isNull(m_PagenatorOptions)) {
        var parr = m_PagenatorOptions.split('|'); //the string will be like this '["mypage"]|2|[2,4]|2'
        dtConfig.paginator = MakePagenator(YAHOO.lang.JSON.parse(parr[0])
                                                                        , YAHOO.lang.JSON.parse(parr[1])
                                                                        , YAHOO.lang.JSON.parse(parr[2])
                                                                        , YAHOO.lang.JSON.parse(parr[3])
                                                                        , parr[4] // template
                                                                        , parr[5] // page template
                                                                        );      
                                                                        
                                                                        
      
      if(m_State  == 1)
        {
             // A custom function to translate the js paging request into a query
            // string sent to the XHR DataSource
            var buildQueryString = function(state, basic) {

                return "startIndex=" + state.pagination.recordOffset +
                       "&results=" + state.pagination.rowsPerPage;
            };
             
            dtConfig.initialRequest ="sort='" + myDataSource.responseSchema.fields[0] + "'&dir=asc&startIndex=0&results=" + YAHOO.lang.JSON.parse(parr[1]);
            dtConfig.generateRequest = buildQueryString;
            dtConfig.sortedBy ="{ key: '" + myDataSource.responseSchema.fields[0] + "', dir: YAHOO.widget.DataTable.CLASS_ASC }";
        }                                                                                                                                            
    }          
    return dtConfig;
}
//---------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
// Function for Custom YUI  Delete Formatter for the Datatable
//----------------------------------------------------------------------------------------------------------------
function CustomYUIDeleteFormatter(elCell, oRecord, oColumn, oData) {
	
    elCell.innerHTML = '<a href="#" title="Delete" onclick="return deleteAlert();"></a>';
	elCell.className = elCell.className + " icoDelete";
}


//------------------------------------------------------------------------------------------------------
//Function for Custom YUI  Decription Chop Formatter for the Datatable
//-------------------------------------------------------------------------------------------------------
function CustomYUIDescriptionFormatter(elCell, oRecord, oColumn, oData) {
    var descriptionLink;
    var choplen;
    if (oRecord._oData.Description.length > 50)
        choplen = 50;
    else
        choplen = oRecord._oData.Description.length;
    var chopdatastr = chopdata(oRecord.getData(oColumn.key), 0, choplen);
    elCell.innerHTML =  chopdatastr;
}
//--------------------------------------------------------------------
//Function for Custom YUI  Select Formatter for the Datatable
//--------------------------------------------------------------------
function CustomYUISelectFormatter(elCell, oRecord, oColumn, oData) { 
   var icoSelect = _absWebRoot + "App_Themes/Cherry/Images/icons/bullet_blue.png";
  elCell.innerHTML = '<a href="#" title="Select"><img border="0" alt="Edit" height="16" width="16" src="' + icoSelect + '"></a>';
  return false;
}
//--------------------------------------------------------------------
//Function for Custom YUI  Hour Formatter for the Datatable
//--------------------------------------------------------------------
 function CustomYUIHourFormatter(elCell, oRecord, oColumn, oData) {
      //getting the rounded number for two decimal place.
      var num = (isNaN(Math.round(oData * 100) / 100)) ? 0.00 : Math.round(oData * 100) / 100;
      elCell.innerHTML = num.toFixed(2);
  }
//----------------------------------------------------------------------------------
//added by Swathi
//YUI Custom Function called to format Curreny
//----------------------------------------------------------------------------------
function CustomCurrencyFormatter(value) {
    return YAHOO.util.Number.format(value, {
        prefix: currencySymbol,
        decimalPlaces: 2,
        thousandsSeparator: ','
    });
}
//-----------------------------------------------------------------------------------------------------------------
/*@Author: Taran
*@DateCreated: 16-12-2010   
*@Decription: Function returns the string  with 20 characters and whole string to be viewed in the tooltip
*/
//------------------------------------------------------------------------------------------------------------------
function ChopDataFormatter(elCell, oRecord, oColumn, oData) {
    var descriptionLink;
    var choplen = 0;
    if (oColumn.width <= 40)
        choplen = 3;
    else if (oColumn.width > 40 && oColumn.width <= 80)
        choplen = 6;
    else if (oColumn.width > 80 && oColumn.width <= 120)
        choplen = 10;
    else if (oColumn.width > 120 && oColumn.width <= 150)
        choplen = 13;
    else if (oColumn.width >= 150)
        choplen = 15;
    var chopdatastr = chopdata(oRecord.getData(oColumn.key), 0, choplen);
    elCell.innerHTML =  chopdatastr ;
}
//================================================================== 
//  Chop string based on start and end position                 
//==================================================================
function chopdata(str, start, end) {
    var chopdata = str;
    
    if (str.length > end) {
        var chopdata = str.substring(start, end);
          chopdata = chopdata + "<b>...</b>";
    }
    return chopdata;
}
//--------------------------------------------------------------------
//Function for Custom YUI  Checkbox Formatter for the Datatable
//--------------------------------------------------------------------
function CustomYUICheckboxFormatter(elCell, oRecord, oColumn, oData) {                 
          elCell.innerHTML =  "<div style='padding-left:25px;'><input type='checkbox' name='selectbox'/></div>";
      }
//----------------------------------------------------------------------------------------------------------------
// Formater For Multi Select Checkbox
//----------------------------------------------------------------------------------------------------------------
function CustomYUIMultiSelectFormatter(elCell, oRecord, oColumn, oData) {
    elCell.innerHTML = '<input type="checkbox" style="width:15px" id="chk_' + oRecord._sId + '" />';   
}
//----------------------------------------------------------------------------------------------------------------
// Formater For Post Column in Mileage Entry
//----------------------------------------------------------------------------------------------------------------
function CustomPostFormatter(elCell, oRecord, oColumn, oData) {
    if (oData == "True") {
        elCell.innerHTML = '<div style="padding-left:18px;"><input type="checkbox" style="width:15px" checked = checked/></div>';
    }
    else {
        elCell.innerHTML = '<div style="padding-left:18px;"><input type="checkbox" style="width:15px"/></div>';
    }

}
//----------------------------------------------------------------------------------------------------------------
// Formater For begin column in Mileage Entry Datatable
//----------------------------------------------------------------------------------------------------------------
function CustomBeginFormatter(elCell, oRecord, oColumn, oData) {    
        elCell.innerHTML = '<div style="padding-left:18px; text-align:right;">'+oData+'</div>';   

}
//----------------------------------------------------------------------------------------------------------------
// Formatter not being used - moved from work order search
//----------------------------------------------------------------------------------------------------------------
function FormatterMyTextArea(elCell, oRecord, oColumn, oData) {
    elCell.innerHTML = '<TEXTAREA COLS=20 ROWS=3 readonly>' + oData + '</TEXTAREA>';
}
//----------------------------------------------------------------------------------------------------------------
// Formatter not being used - moved from work order search 
//----------------------------------------------------------------------------------------------------------------
function ConditionalRowFormatter(elTr, oRecord) {           
    var Dom = YAHOO.util.Dom;

    if(oRecord._oData.WorkOrderStatus == 'Closed') {
        Dom.addClass(elTr, 'trSuccessMarker');
    }
    return true;
}
//----------------------------------------------------------------------------------------------------------------
//Formatter for the DateAssigned column(dd-mmm-yyyy)
//----------------------------------------------------------------------------------------------------------------
function CustomDateFormatter(elCell, oRecord, oColumn, oData) {
	try {
		 var date = YUIDateFormatDMMMYYYY(oData, "%d-%b-%Y");
     if(date !="01-Jan-1"){//checking for default date
     elCell.innerHTML = '<div style=" text-align:center;">'+date+'</div>';  
     }
     else{
     elCell.innerHTML = "";
     }
		
	} catch(e) {

	} 
    
    return false;
}

//----------------------------------------------------------------------------------------------------------------
//  Function for Custom YUI  Edit Formatter for the Datatable
//----------------------------------------------------------------------------------------------------------------
function CustomYUIEditFormatter(elCell, oRecord, oColumn, oData) {
    //elCell.innerHTML = '<a href="#" title="Edit"></a>';
	elCell.className = elCell.className + " icoEd";
}
//----------------------------------------------------------------------------------------------------------------
// Formater for view Report in Work Order Search
//----------------------------------------------------------------------------------------------------------------
function CustomViewReportFormatter(elCell, oRecord, oColumn, oData) {
    elCell.className = elCell.className + " icoRep";
}
//WOS_ShowWOEditPopup(record.getData('WorkOrderNumber'));
//WOS_ViewReport
//----------------------------------------------------------------------------------------------------------------
// 
//----------------------------------------------------------------------------------------------------------------
function FormatterBulletGreen(elCell, oRecord, oColumn, oData) {
    elCell.className = elCell.className + " icoBul-green";
}
//----------------------------------------------------------------------------------------------------------------
// 
//----------------------------------------------------------------------------------------------------------------
function FormatterBulletRed(elCell, oRecord, oColumn, oData) {
    elCell.className = elCell.className + " icoBul-red";
}
//----------------------------------------------------------------------------------------------------------------
// 
//----------------------------------------------------------------------------------------------------------------
function FormatterBulletBlue(elCell, oRecord, oColumn, oData) {
    elCell.className = elCell.className + " icoBul-blue";
}
// ==================================================================
//  Function to get date in DD-MMM-YYYY format in YUI
//  When using a Pagination, date is coming in '/Date(1239000000)/'
//  Which on furthur changing in YUI format throwing error    
// ==================================================================
function YUIDateFormatDMMMYYYY(obj, dateformate) {
    var oDate = /Date\(([-+]?\d+[-+]?\d+)\)/.exec(obj);
    var DateInDMMMYYY = '';
    var formattedDate = '';
    if (oDate) {
        var oDateCreated = new Date(eval(oDate[1]));       
        formattedDate = YAHOO.util.Date.format(oDateCreated, { format: dateformate }); //"%d-%b-%Y"
    }
    else {
        formattedDate = YAHOO.util.Date.format(obj, { format: dateformate });
    }
    //checking for default date
   if(formattedDate =='01/01/2001' || formattedDate =='01/01/1')
   {
       DateInDMMMYYY = '';
   }
   else{   
       DateInDMMMYYY = formattedDate;
    }
   return DateInDMMMYYY;
}
//----------------------------------------------------------------------------------
//added by Swathi
//YUI Custom Function called to Enable Tab Index for Editor Key Down Event and Editor Show Event
//----------------------------------------------------------------------------------
function BindTabIndex(DataTableName) {
    // Subscribe to events for row selection   
    var highlightEditableCellEst = function(oArgs) {
        var elCell = oArgs.target;
        if (YAHOO.util.Dom.hasClass(elCell, "yui-dt-editable")) {
            this.highlightCell(elCell);
        }
    };

    //Start of editorKeydown event for Tab indexing
    DataTableName.subscribe("editorKeydownEvent", function(oArgs) {
        var self = this,
				ed = this._oCellEditor,
				ev = oArgs.event,
				KEY = YAHOO.util.KeyListener.KEY,
				Textbox = YAHOO.widget.TextboxCellEditor,
				Textarea = YAHOO.widget.TextareaCellEditor,
				cell = ed.getTdEl(),
				col = ed.getColumn(),
				row, rec,

				editNext = function(cell) {
				    cell = self.getNextTdEl(cell);
				    while (cell && !self.getColumn(cell).editor) {
				        cell = self.getNextTdEl(cell);
				    }
				    if (cell) {
				        self.showCellEditor(cell);
				    }
				},
				editPrevious = function(cell) {
				    cell = self.getPreviousTdEl(cell);
				    while (cell && !self.getColumn(cell).editor) {
				        cell = self.getPreviousTdEl(cell);
				    }
				    if (cell) {
				        self.showCellEditor(cell);
				    }
				};

        switch (ev.keyCode) {
            case KEY.UP:
                if (ed instanceof Textarea) { return; }
                YAHOO.util.Event.stopEvent(ev);
                ed.save();
                row = this.getPreviousTrEl(cell);
                if (row) {
                    rec = this.getRecord(row);
                    this.showCellEditor({ record: rec, column: col });
                }
                break;
            case KEY.DOWN:
                if (ed instanceof Textarea) { return; }
                YAHOO.util.Event.stopEvent(ev);
                ed.save();
                row = this.getNextTrEl(cell);
                if (row) {
                    rec = this.getRecord(row);
                    this.showCellEditor({ record: rec, column: col });
                }
                break;
            case KEY.LEFT:
                if (ed instanceof Textbox || ed instanceof Textarea) { return; }
                YAHOO.util.Event.stopEvent(ev);
                ed.save();
                editPrevious(cell);
                break;
            case KEY.RIGHT:
                if (ed instanceof Textbox || ed instanceof Textarea) { return; }
                YAHOO.util.Event.stopEvent(ev);
                ed.save();
                editNext(cell);
                break;
            case KEY.TAB:
                YAHOO.util.Event.stopEvent(ev);
                ed.save();
                if (ev.shiftKey) {
                    editPrevious(cell);
                } else {
                    editNext(cell);
                }
                break;
        }
    });

    // End of key handling

    // The following code tries to keep the cell editor visible at all times.
    DataTableName.on('editorShowEvent', function(oArgs) {
        var Dom = YAHOO.util.Dom;
        var el = oArgs.editor.getContainerEl();
        var reg = Dom.getRegion(el);
        var topScreen = Dom.getDocumentScrollTop(),
				bottomScreen = topScreen + Dom.getViewportHeight();
        if (reg.top < topScreen) {
            el.scrollIntoView();
        }
        if (reg.bottom > bottomScreen) {
            el.scrollIntoView(false);
        }
    });
    // End of patch.
}