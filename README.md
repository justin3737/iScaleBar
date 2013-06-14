iScaleBar
=========
本套件是搭配達康地圖 ( http://api.map.com.tw ) <br>
所自訂的地圖控制項<br>
<img src="https://github.com/justin3737/iScaleBar/blob/master/assets/iScalebar.png?raw=true">

How to Use : 
--------------
需要引入以下檔案:
- jQuery Lib (最低版本 1.6 以上)
- iScaleBar.js 
- iScaleBar.css


Init:
--------------
初始化建構式
<pre>
new iScaleBar( map ,options);
</pre>
- <code>map</code> 需要傳入map 參考物件
- <code>options</code> 初始化選項 (*not required)


Note:
--------------
註解(移除)原有的達康地圖控制項
<pre>
//map.addControl ('LargeScaleBar');
</pre>


Options:
--------------
*初始化時可不用傳入
- <code>mapcanvas</code> 預設值為"map_canvas"
- <code>type</code> 
  - "large" 包含刻度尺
  - "small" 僅有 "+","-"按鈕．預設值為 "large"
- <code>useMouseWheel</code> 是否使用滑鼠滾輪
- <code>useDarggable</code> 是否使用拖曳功能(jquery ui draggable)
- <code>mouseWheelPluginUrl</code> 滑鼠滾輪plugin 所在位置 (default: assets/jquery.mousewheel.js)
- <code>draggablePluginUrl</code> 拖曳功能plugin 所在位置 (default: assets/jquery-ui-draggable.min.js)
- <code>zoom_gap_min</code> 地圖放大最小值預設為1
- <code>zoom_gap_max</code> 地圖放大最大值預設為12

Example:
--------------
- example 1.<br>直接使用iScalbar
<pre>
new  iScaleBar( map );
</pre>
<br>
- example 2.<br>設定zoom gap 介於9~12
<pre>
new  iScaleBar( map , { zoom_gap_min : 9, zoom_gap_max : 12 } );
</pre>
<br>
- example 3.<br>使用小的scalebar (僅有 + - 的按鈕)
<pre>
new  iScaleBar( map , { type : ”small” } );
</pre>
<br>
- example 4.<br>不使用滑鼠滾輪,拖曳功能
<pre>
new  iScaleBar( map , { useDarggable : false , useMouseWheel : false } );
</pre>
<br>

Demo:
--------------
<pre>
&lt;!doctype html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
	&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;
	&lt;title&gt;Map Scalbar Demo&lt;/title&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;assets/iScaleBar.css&quot;&gt;
	&lt;script type = &quot;text/javascript&quot; src=&#39;http://code.jquery.com/jquery-1.6.min.js&#39;&gt;&lt;/script&gt;
	&lt;script type = &quot;text/javascript&quot; src=&quot;assets/iScaleBar.js&quot;&gt;&lt;/script&gt;
	&lt;!-- use Trend-go map&#39;s API, api and kep need to apply at &quot;http://api.map.com.tw&quot;--&gt;
	&lt;script type=&quot;text/javascript&quot; src=&quot;http://api.map.com.tw/js/getAPI.asp?v=1&amp;key=your_api_key&quot;&gt;&lt;/script&gt;
	&lt;script&gt;
		$(function(){
			var map;
      		//define map
      		map = new iMap (document.getElementById (&quot;map_canvas&quot;)); 
　　		map.centerMap (new Point (121.52,25.035) ,7 );   //init location 

			//init constructor.
			new iScaleBar( map );

		});
	&lt;/script&gt;
&lt;/head &gt;
&lt;body&gt;
	&lt;div id=&quot;map_canvas&quot; style=&quot;width:750px;height:370px;&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>
