/** 
 * Version: 1.0.1 (2013/06/06)
 */
var iScaleBar = function ( MapCanvas, mapObj, options){ 
	var bgStyle = { "background" : 'url(' + options.imgUrl + ') no-repeat'};
	var type = ( options.type ) ? options.type : "large" ; 
	var _object  = "";
	var _elm = {};
	var _data ={ 
    mapCanvas : MapCanvas,
		mapScaleVal : -1 ,
		mapZoomMax : ( options.zoom_gap_max ) ? options.zoom_gap_max : 12,
		mapZoomMin : ( options.zoom_gap_min ) ? options.zoom_gap_min : 1,
		useMouseWheel: ( options.useMouseWheel ) ? options.useMouseWheel : true,
		mouseWheelPluginUrl : ( options.mouseWheelPluginUrl ) ? options.mouseWheelPluginUrl : "http://hfcdn.housefun.com.tw/iScaleBar/jquery.mousewheel.js"
	};

	var map = mapObj;

	if(type == "large"){

		_object  +=	'<div id="iScalebar">';
        _object  +=  	'<div class="zoomInBtn"></div>';
        _object  +=  	'<div class="zoomOutBtn"></div>';
        _object  +=  	'<div class="scaleBar"></div>';
       	_object  += '</div>';

       	$("#" + MapCanvas).append(_object).find('#iScalebar').css(bgStyle).css('z-index',2000).find('.scaleBar').css(bgStyle);

       	//------ elements	---------------------
       	_elm = {
       		iScalebar : $("#iScalebar"),
       		zoomInBtn : $('.zoomInBtn'),
       		zoomOutBtn : $('.zoomOutBtn'),
			scaleBar : $('.scaleBar')
		};

		_elm.scaleBar.css('background-position',"0 -195px");
       	var scaleTop = parseInt(_elm.zoomInBtn.css("height"));  
       	var scaleHeight = parseInt(_elm.iScalebar.css("height")) - scaleTop - parseInt(_elm.zoomOutBtn.css("height"));

    }else{

    	_object  +=	'<div id="iScalebar">';
        _object  +=  	'<div class="zoomInBtn"></div>';
        _object  +=  	'<div class="zoomOutBtn"></div>';
        _object  +=	'</div>';

        $("#" + MapCanvas).append(_object).find('#iScalebar').css('z-index',2000).children().css(bgStyle);

        //------ elements	---------------------
       	_elm = {
       		iScalebar : $("#iScalebar"),
       		zoomInBtn : $('.zoomInBtn'),
       		zoomOutBtn : $('.zoomOutBtn')
		};
		_elm.iScalebar.addClass("small");
		_elm.zoomOutBtn.css('background-position',"0 -163px").addClass("small");

    }
    //-----		init ---------------------

    init();

    //------	function	---------------------

    function init(){
    	if(_data.useMouseWheel) {
        loadjscssfile( _data.mouseWheelPluginUrl, "js", function(){
          // callback
          $("#" + _data.mapCanvas ).mousewheel(function (event, delta) {
            var val = getZoomVal();
            (delta >= 0) ? (( val  < _data.mapZoomMax ) ? val  += 1 : val ) : (( val > _data.mapZoomMin ) ? val -= 1 : val);
            if (val >= 1 && val <= 12) { 
              map.ZoomTo( val );
              setScalebarPos( val ); 
            }
            return false;
          });

        });
    	};

    	var val = getZoomVal();
      val = (val < _data.mapZoomMin) ? _data.mapZoomMin : val;
      val = (val > _data.mapZoomMax) ? _data.mapZoomMax : val;
    	setScalebarPos(val);
    };

    // 動態讀取 CSS/JS File.
    function loadjscssfile (filename, filetype, callback){
      //if filename is a external JavaScript file
      if (filetype === "js"){ 
        var fileref = document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
        if (fileref.readyState) { //IE
         fileref.onreadystatechange = function () {
            if (fileref.readyState == "loaded" || fileref.readyState == "complete") {
              fileref.onreadystatechange = null;
              callback();
            }
          };
        } else { 
        // Other Browsers.
          fileref.onload = function () { callback(); };
        }
      } else if (filetype === "css"){ 
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
      }

      if (typeof fileref !== "undefined"){
        document.getElementsByTagName("head")[0].appendChild(fileref);
      }
    };

    function getZoomVal(){
    	if(_data.mapScaleVal == -1){
    		_data.mapScaleVal = map.getZoomLevel();
    	}
    	return _data.mapScaleVal;
    };

    function setZoomVal(val){
    	_data.mapScaleVal = val;
    	return;
    };

    function scaleControl (value) {
    	if (typeof(value) == "string"){
    		var val = getZoomVal();
			if(value == "in"){
				val += 1;
			}else{
				val -= 1;
			}
		}else{
			if(value < 0) return;
			var val = 13 - (Math.ceil(value/scaleHeight*13));
		}

		if ( val >= _data.mapZoomMin && val <= _data.mapZoomMax ) { 
			map.ZoomTo( val ); 
			setScalebarPos( val );
		}
		return false;
	};

	function setScalebarPos(value){
		if(value < 0) return;
		var gridPos = Math.ceil((12 - value)*(scaleHeight/13)) + scaleTop;
		if(!!_elm.scaleBar){
			_elm.scaleBar.css('top',gridPos);
		}
		setZoomVal(value);
	};

    //------	addEventListener	---------------------
    if(type == "large"){
    	_elm.iScalebar.bind('click',function(evt){
    		scaleControl(evt.pageY - scaleTop);
   		});
	   };
     
    _elm.zoomInBtn.bind('click',function(evt){
    	evt.stopPropagation();
    	scaleControl("in");
   	});

   	_elm.zoomOutBtn.bind('click',function(evt){
   		evt.stopPropagation();
   		scaleControl("out");
   	});
};
