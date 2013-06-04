var iScaleBar = function ( MapCanvas, mapObj, options){ 
	var bgStyle = { "background" : 'url(' + options.imgUrl + ') no-repeat'};
	var type = ( options.type ) ? options.type : "large" ; 
	var _object  = "";
	var _elm = {};
	var _data ={ 
		mapScaleVal : -1 ,
		mapZoomMax : ( options.zoom_gap_max ) ? options.zoom_gap_max : 12,
		mapZoomMin : ( options.zoom_gap_min ) ? options.zoom_gap_min : 1,
		useMouseWheel: ( options.useMouseWheel ) ? options.useMouseWheel : true,
		mouseWheelPluginUrl : ( options.mouseWheelPluginUrl ) ? options.mouseWheelPluginUrl : "assets/jquery.mousewheel.js"
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
    		var includeStr = '<script type="text/javascript" src="'+ _data.mouseWheelPluginUrl +'"></script>';
    		$('head').append(includeStr);
    	}
    	var val = getZoomVal();
    	setScalebarPos(val);
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

    	if(_data.useMouseWheel){
	   		$("#" + MapCanvas).mousewheel(function (event, delta) {
				var val = getZoomVal();
				(delta >= 0) ? (( val  < _data.mapZoomMax ) ? val  += 1 : val ) : (( val > _data.mapZoomMin ) ? val -= 1 : val);
				if (val >= 1 && val <= 12) { 
					map.ZoomTo( val );
					setScalebarPos( val ); 
				}
				return false;
			});
   		}
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
