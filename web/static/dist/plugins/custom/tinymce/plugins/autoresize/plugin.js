!function(){"use strict";function g(e){return e.getParam("min_height",e.getElement().offsetHeight,"number")}function u(e,t){(e=e.getBody())&&(e.style.overflowY=t?"":"hidden",t||(e.scrollTop=0))}function l(e,t,n,i){return i=parseInt(e.getStyle(t,n,i),10),isNaN(i)?0:i}var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),c=tinymce.util.Tools.resolve("tinymce.Env"),r=tinymce.util.Tools.resolve("tinymce.util.Delay"),a=function(e,t,n,i,o){r.setEditorTimeout(e,function(){m(e,t),n--?a(e,t,n,i,o):o&&o()},i)},m=function(e,t){var n,i,o,r,s=e.dom,a=e.getDoc();a&&((i=e).plugins.fullscreen&&i.plugins.fullscreen.isFullscreen()?u(e,!0):(n=a.documentElement,o=e.getParam("autoresize_bottom_margin",50,"number"),r=g(e),i=l(s,n,"margin-top",!0),a=l(s,n,"margin-bottom",!0),(a=(a=n.offsetHeight+i+a+o)<0?0:a)+(o=e.getContainer().offsetHeight-e.getContentAreaContainer().offsetHeight)>g(e)&&(r=a+o),(o=e.getParam("max_height",0,"number"))&&o<r?(r=o,u(e,!0)):u(e,!1),r!==t.get()&&(o=r-t.get(),s.setStyle(e.getContainer(),"height",r+"px"),t.set(r),e.fire("ResizeEditor"),c.browser.isSafari()&&c.mac&&(r=e.getWin()).scrollTo(r.pageXOffset,r.pageYOffset),e.hasFocus()&&e.selection.scrollIntoView(e.selection.getNode()),c.webkit&&o<0&&m(e,t))))};e.add("autoresize",function(e){var t,n,i,o,r,s;e.settings.hasOwnProperty("resize")||(e.settings.resize=!1),e.inline||(s=0,r=t={get:function(){return s},set:function(e){s=e}},(o=e).addCommand("mceAutoResize",function(){m(o,r)}),i=t,(n=e).on("init",function(){var e=n.getParam("autoresize_overflow_padding",1,"number"),t=n.dom;t.setStyles(n.getDoc().documentElement,{height:"auto"}),t.setStyles(n.getBody(),{paddingLeft:e,paddingRight:e,"min-height":0})}),n.on("NodeChange SetContent keyup FullscreenStateChanged ResizeContent",function(){m(n,i)}),n.getParam("autoresize_on_init",!0,"boolean")&&n.on("init",function(){a(n,i,20,100,function(){a(n,i,5,1e3)})}))})}();