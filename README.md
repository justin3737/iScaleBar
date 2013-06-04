iScaleBar
=========
本套件是搭配達康地圖 ( http://api.map.com.tw ) <br>
所自訂的地圖控制項

How to Use : 
--------------
需要引入以下檔案:
- jQuery Lib
- iScaleBar.js 
- iScaleBar.css
- iScaleBar.png
- mousewheel.js (*not required)

Step 0-1:
--------------
在<code>head</code>中引入達康地圖API & KEY 
詳見: http://api.map.com.tw/

Step 0-2:
--------------
<pre>
var map;
//定義Map初始位置
map = new iMap (document.getElementById ("map_canvas")); 
map.centerMap (new Point (121.52,25.035) ,7 );
			
//註解(移除)原有的達康地圖控制項
//map.addControl ('LargeScaleBar');
</pre>


Step 1:
--------------
宣告<code>options</code>的物件，裡面是地圖控制項自訂項目:
僅有<code>imgUrl</code> 為必要項目
<pre>
var options = {
		imgUrl: 	"assets/iScalebar.png",	//*reguired
		type: 		"large",			
		useMouseWheel: true, 
		mouseWheelPluginUrl:"assets/jquery.mousewheel.js",
		zoom_gap_min: 9,
		zoom_gap_max: 12
	};
</pre>
<br>
- <code>imgUrl</code> 控制項底圖圖片位置
- <code>type</code> 
  - "large" 包含刻度尺
  - "small" 僅有 "+","-"按鈕．預設值為 "large"
- <code>useMouseWheel</code> 是否使用滑鼠滾輪
- <code>mouseWheelPluginUrl</code> 滑鼠滾輪plugin 所在位置
- <code>zoom_gap_max</code> 地圖放大最大值預設為12
- <code>zoom_gap_min</code> 地圖放大最小值預設為1

Step 2:
--------------
初始化建構式
<pre>
new iScaleBar( "map_canvas", map, options);
</pre>
- <code>"map_canvas"</code> 顯示達康地圖div id
- <code>map</code> 需要傳入map 參考物件
- <code>options</code> 初始化選項

Step 3:
--------------
結果如下:<br>
done and Enjoy it !
<pre>
&lt;!doctype html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
	&lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;
	&lt;title&gt;Demo&lt;/title&gt;
	&lt;link rel=&quot;stylesheet&quot; href=&quot;assets/iScaleBar.css&quot;&gt;
	&lt;script type = &quot;text/javascript&quot; src='http://code.jquery.com/jquery-1.7.2.min.js'&gt;&lt;/script&gt;
	&lt;script type = &quot;text/javascript&quot; src=&quot;assets/iScaleBar.js&quot;&gt;&lt;/script&gt;
	&lt;!-- use map api &amp; key --&gt;
	&lt;script type=&quot;text/javascript&quot; src=&quot;http://api.map.com.tw/js/getAPI.asp?v=1&amp;key=DFCE9CCD255DB124825E75C2EFEAB9C10E513C09&quot;&gt;&lt;/script&gt;
	&lt;script&gt;
		$(function(){
			var map;
      		map = new iMap (document.getElementById (&quot;map_canvas&quot;)); 
		map.centerMap (new Point (121.52,25.035) ,7 );  
			
			//remove defaule scale controller
			//map.addControl ('LargeScaleBar'); 

			//iScaleBar options
			var options = {
				imgUrl: 	&quot;assets/iScalebar.png&quot;,	//*reguired
				type: 		&quot;large&quot;,			
				useMouseWheel: true, 
				mouseWheelPluginUrl:&quot;assets/jquery.mousewheel.js&quot;,
				zoom_gap_min: 9,
				zoom_gap_max: 12
			};

			new iScaleBar( &quot;map_canvas&quot;, map, options);

		});
	&lt;/script&gt;
&lt;/head &gt;
&lt;body&gt;
	&lt;div id=&quot;map_canvas&quot; style=&quot;width:750px;height:370px;&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>
