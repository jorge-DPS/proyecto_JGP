"use strict";var KTAppChat=function(){var a;return{init:function(){a=KTUtil.getById("kt_chat_aside"),KTUtil.getById("kt_chat_content"),function(){new KTOffcanvas(a,{overlay:!0,baseClass:"offcanvas-mobile",toggleBy:"kt_app_chat_toggle"});var i=KTUtil.find(a,".scroll"),e=KTUtil.find(a,".card-body"),n=KTUtil.find(a,".input-group");i&&KTUtil.scrollInit(i,{mobileNativeScroll:!0,desktopNativeScroll:!1,resetHeightOnDestroy:!0,handleWindowResize:!0,rememberPosition:!0,height:function(){var t=KTUtil.isBreakpointUp("lg")?KTLayoutContent.getHeight():KTUtil.getViewPort().height;return a&&(t=(t=t-parseInt(KTUtil.css(a,"margin-top"))-parseInt(KTUtil.css(a,"margin-bottom")))-parseInt(KTUtil.css(a,"padding-top"))-parseInt(KTUtil.css(a,"padding-bottom"))),i&&(t=t-parseInt(KTUtil.css(i,"margin-top"))-parseInt(KTUtil.css(i,"margin-bottom"))),e&&(t=t-parseInt(KTUtil.css(e,"padding-top"))-parseInt(KTUtil.css(e,"padding-bottom"))),n&&(t=(t-=parseInt(KTUtil.css(n,"height")))-parseInt(KTUtil.css(n,"margin-top"))-parseInt(KTUtil.css(n,"margin-bottom"))),t-=2}})}(),KTLayoutChat.setup(KTUtil.getById("kt_chat_content")),KTUtil.getById("kt_app_chat_toggle")&&setTimeout(function(){KTUtil.getById("kt_app_chat_toggle").click()},1e3)}}}();jQuery(document).ready(function(){KTAppChat.init()});