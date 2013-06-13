/** 
 * Create: (2013/06/05)
 * Version: 1.0.3 (2013/06/13)
 */
var iScaleBar = function (mapObj, options) {
    var _options = (typeof options != 'undefined' && options.constructor === Object) ? options : {};
    var _object = "";
    var _elm = {};
    var _data = {
        mapCanvas: _options.mapcanvas || 'map_canvas',
        mapScaleVal: -1,
        type: _options.type || "large",
        mapZoomMax: _options.zoom_gap_max || 12,
        mapZoomMin: _options.zoom_gap_min || 1,
        imgUrl: _options.imgUrl || "assets/iScalebar.png",
        useMouseWheel: _options.usemousewheel || true,
        useDarggable: _options.useDarggable || true,
        mouseWheelPluginUrl: _options.mouseWheelPluginUrl || "assets/jquery.mousewheel.js",
        draggablePluginUrl: _options.draggablePluginUrl || "assets/jquery-ui-draggable.min.js",
        dargGrid: _options.dargGrid || 11
    };
    var bgStyle = {
        "background": 'url(' + _data.imgUrl + ') no-repeat'
    };
    var map = mapObj;

    if (_data.type == "large") {

        _object += '<div id="iScalebar">';
        _object += '<div class="zoomInBtn"></div>';
        _object += '<div class="zoomOutBtn"></div>';
        _object += '<div class="scale_parent">';
        _object += '<div class="scaleBar"></div>';
        _object += '</div >';
        _object += '</div>';

        $("#" + _data.mapCanvas).append(_object).find('#iScalebar').css(bgStyle).css('z-index', 2000).find('.scaleBar').css(bgStyle);

        //------ elements ---------------------
        _elm = {
            iScalebar: $("#iScalebar"),
            zoomInBtn: $('.zoomInBtn'),
            zoomOutBtn: $('.zoomOutBtn'),
            scaleBar: $('.scaleBar')
        };

        _elm.scaleBar.css('background-position', "0 -195px");
        var scaleTop = parseInt(_elm.zoomInBtn.css("height"));

    } else {

        _object += '<div id="iScalebar">';
        _object += '<div class="zoomInBtn"></div>';
        _object += '<div class="zoomOutBtn"></div>';
        _object += '</div>';

        $("#" + _data.mapCanvas).append(_object).find('#iScalebar').css('z-index', 2000).children().css(bgStyle);

        //------ elements ---------------------
        _elm = {
            iScalebar: $("#iScalebar"),
            zoomInBtn: $('.zoomInBtn'),
            zoomOutBtn: $('.zoomOutBtn')
        };
        _elm.iScalebar.addClass("small");
        _elm.zoomOutBtn.css('background-position', "0 -163px").addClass("small");

    }
    //-----   init ---------------------

    init();

    //------  function  ---------------------

    function init() {
        if (_data.useDarggable && _data.type == "large") {
            loadjscssfile(_data.draggablePluginUrl, "js", function () {
                doDragable();
            });
        };

        if (_data.useMouseWheel) {
            loadjscssfile(_data.mouseWheelPluginUrl, "js", function () {
                doMousewheel()
            });
        };

        var val = getZoomVal();
        val = (val < _data.mapZoomMin) ? _data.mapZoomMin : val;
        val = (val > _data.mapZoomMax) ? _data.mapZoomMax : val;
        setScalebarPos(val);
    };

    function doDragable() {
        $(_elm.scaleBar).draggable({
            containment: 'parent',
            grid: [0, _data.dargGrid],
            stop: function () {
                getScalebarPos();
            }
        });
    };

    function doMousewheel() {
        $("#" + _data.mapCanvas).mousewheel(function (event, delta) {
            var val = getZoomVal();
            (delta >= 0) ? ((val < _data.mapZoomMax) ? val += 1 : val) : ((val > _data.mapZoomMin) ? val -= 1 : val);
            if (val >= 1 && val <= 12) {
                map.ZoomTo(val);
                setScalebarPos(val);
            }
            return false;
        });
    };

    // ��霈�� CSS/JS File.

    function loadjscssfile(filename, filetype, callback) {
        //if filename is a external JavaScript file
        if (filetype === "js") {
            var fileref = document.createElement('script');
            fileref.setAttribute("type", "text/javascript");
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
                fileref.onload = function () {
                    callback();
                };
            }
        } else if (filetype === "css") {
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }

        if (typeof fileref !== "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        }
    };

    function getZoomVal() {
        if (_data.mapScaleVal == -1) {
            _data.mapScaleVal = map.getZoomLevel();
        }
        return _data.mapScaleVal;
    };

    function setZoomVal(val) {
        _data.mapScaleVal = val;
        return;
    };

    function scaleControl(value) {
        if (typeof (value) == "string") {
            var val = getZoomVal();
            if (value == "in") {
                val += 1;
            } else {
                val -= 1;
            }
        } else {
            if (value < 0) value = Math.abs(value);
            var val = 12 - (Math.ceil((value - scaleTop) / _data.dargGrid));
        }
        if (val > _data.mapZoomMax) {
            val = _data.mapZoomMax;
        } else if (val < _data.mapZoomMin) {
            val = _data.mapZoomMin;
        }
        map.ZoomTo(val);
        setScalebarPos(val);

        return false;
    };

    function setScalebarPos(value) {
        if (value < 0) return;
        var gridPos = Math.ceil((12 - value) * _data.dargGrid) + scaleTop;
        if ( !! _elm.scaleBar) {
            _elm.scaleBar.css('top', gridPos);
        }
        setZoomVal(value);
    };

    function getScalebarPos() {
        var pos = parseInt(_elm.scaleBar.css('top'));
        scaleControl(pos);
    };
    //------  addEventListener  ---------------------
    if (_data.type == "large") {
        _elm.iScalebar.bind('click', function (evt) {
            scaleControl(evt.pageY - scaleTop);
        });

        _elm.iScalebar.mousedown(function (evt) {
            evt.stopPropagation();
        });
    };

    _elm.zoomInBtn.bind('click', function (evt) {
        evt.stopPropagation();
        scaleControl("in");
    });

    _elm.zoomOutBtn.bind('click', function (evt) {
        evt.stopPropagation();
        scaleControl("out");
    });
};
