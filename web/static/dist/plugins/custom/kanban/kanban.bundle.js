!function o(i,r,a){function d(t,e){if(!r[t]){if(!i[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(c)return c(t,!0);n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}n=r[t]={exports:{}};i[t][0].call(n.exports,function(e){return d(i[t][1][e]||e)},n,n.exports,o,i,r,a)}return r[t].exports}for(var c="function"==typeof require&&require,e=0;e<a.length;e++)d(a[e]);return d}({1:[function(e,t,n){var o=e("dragula");!function(){this.jKanban=function(){var b=this,e={enabled:!1},t={enabled:!1};this._disallowedItemProperties=["id","title","click","drag","dragend","drop","order"],this.element="",this.container="",this.boardContainer=[],this.handlers=[],this.dragula=o,this.drake="";e={element:this.drakeBoard="",gutter:"15px",widthBoard:"250px",responsive:"700",responsivePercentage:!1,boards:[],dragBoards:!0,dragItems:!0,itemAddOptions:this.itemAddOptions=t,itemHandleOptions:this.itemHandleOptions=e,dragEl:function(e,t){},dragendEl:function(e){},dropEl:function(e,t,n,o){},dragBoard:function(e,t){},dragendBoard:function(e){},dropBoard:function(e,t,n,o){},click:function(e){},buttonClick:function(e,t){}};function y(e){e.addEventListener("click",function(e){e.preventDefault(),b.options.click(this),"function"==typeof this.clickfn&&this.clickfn(this)})}function r(t){var n=[];return b.options.boards.map(function(e){if(e.id===t)return n.push(e)}),n[0]}function w(e,t){for(var n in t)-1<b._disallowedItemProperties.indexOf(n)||e.setAttribute("data-"+n,t[n])}function E(e){var t,n=e;return n=b.options.itemHandleOptions.enabled?void 0===(b.options.itemHandleOptions.customHandler||void 0)?"<div class='item_handle "+(t=void 0===((t=b.options.itemHandleOptions.customCssHandler)||void 0)?"drag_handler":t)+"'><i class='item_handle "+(e=void 0===((e=b.options.itemHandleOptions.customCssIconHandler)||void 0)?t+"_icon":e)+"'></i></div><div>"+n+"</div>":b.options.itemHandleOptions.customHandler.replace("%s",n):n}arguments[0]&&"object"==typeof arguments[0]&&(this.options=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}(e,arguments[0])),this.__getCanMove=function(e){return b.options.itemHandleOptions.enabled?b.options.itemHandleOptions.handleClass?e.classList.contains(b.options.itemHandleOptions.handleClass):e.classList.contains("item_handle"):!!b.options.dragItems},this.init=function(){!function(){b.element=document.querySelector(b.options.element);var e=document.createElement("div");e.classList.add("kanban-container"),b.container=e,document.querySelector(b.options.element).dataset.hasOwnProperty("board")?(url=document.querySelector(b.options.element).dataset.board,window.fetch(url,{method:"GET",headers:{"Content-Type":"application/json"}}).then(e=>{e.json().then(function(e){b.options.boards=e,b.addBoards(b.options.boards,!0)})}).catch(e=>{console.log("Error: ",e)})):b.addBoards(b.options.boards,!0),b.element.appendChild(b.container)}(),window.innerWidth>b.options.responsive&&(b.drakeBoard=b.dragula([b.container],{moves:function(e,t,n,o){return!!b.options.dragBoards&&(n.classList.contains("kanban-board-header")||n.classList.contains("kanban-title-board"))},accepts:function(e,t,n,o){return t.classList.contains("kanban-container")},revertOnSpill:!0,direction:"horizontal"}).on("drag",function(e,t){e.classList.add("is-moving"),b.options.dragBoard(e,t),"function"==typeof e.dragfn&&e.dragfn(e,t)}).on("dragend",function(e){!function(){for(var e=1,t=0;t<b.container.childNodes.length;t++)b.container.childNodes[t].dataset.order=e++}(),e.classList.remove("is-moving"),b.options.dragendBoard(e),"function"==typeof e.dragendfn&&e.dragendfn(e)}).on("drop",function(e,t,n,o){e.classList.remove("is-moving"),b.options.dropBoard(e,t,n,o),"function"==typeof e.dropfn&&e.dropfn(e,t,n,o)}),b.drake=b.dragula(b.boardContainer,{moves:function(e,t,n,o){return b.__getCanMove(n)},revertOnSpill:!0}).on("cancel",function(e,t,n){b.enableAllBoards()}).on("drag",function(e,t){var n,o=e.getAttribute("class");""!==o&&-1<o.indexOf("not-draggable")?b.drake.cancel(!0):(e.classList.add("is-moving"),b.options.dragEl(e,t),void 0!==(n=r(t.parentNode.dataset.id)).dragTo&&b.options.boards.map(function(e){-1===n.dragTo.indexOf(e.id)&&e.id!==t.parentNode.dataset.id&&b.findBoard(e.id).classList.add("disabled-board")}),null!==e&&"function"==typeof e.dragfn&&e.dragfn(e,t))}).on("dragend",function(e){b.options.dragendEl(e),null!==e&&"function"==typeof e.dragendfn&&e.dragendfn(e)}).on("drop",function(e,t,n,o){b.enableAllBoards();var i=r(n.parentNode.dataset.id);void 0!==i.dragTo&&-1===i.dragTo.indexOf(t.parentNode.dataset.id)&&t.parentNode.dataset.id!==n.parentNode.dataset.id&&b.drake.cancel(!0),null!==e&&(!1===b.options.dropEl(e,t,n,o)&&b.drake.cancel(!0),e.classList.remove("is-moving"),"function"==typeof e.dropfn&&e.dropfn(e,t,n,o))}))},this.enableAllBoards=function(){var e=document.querySelectorAll(".kanban-board");if(0<e.length&&void 0!==e)for(var t=0;t<e.length;t++)e[t].classList.remove("disabled-board")},this.addElement=function(e,t){var e=b.element.querySelector('[data-id="'+e+'"] .kanban-drag'),n=document.createElement("div");return n.classList.add("kanban-item"),void 0!==t.id&&""!==t.id&&n.setAttribute("data-eid",t.id),t.class&&Array.isArray(t.class)&&t.class.forEach(function(e){n.classList.add(e)}),n.innerHTML=E(t.title),n.clickfn=t.click,n.dragfn=t.drag,n.dragendfn=t.dragend,n.dropfn=t.drop,w(n,t),y(n),b.options.itemHandleOptions.enabled&&(n.style.cursor="default"),e.appendChild(n),b},this.addForm=function(e,t){var n=b.element.querySelector('[data-id="'+e+'"] .kanban-drag'),e=t.getAttribute("class");return t.setAttribute("class",e+" not-draggable"),n.appendChild(t),b},this.addBoards=function(e,t){var n,o=b.options.responsivePercentage?(b.container.style.width="100%",b.options.gutter="1%",window.innerWidth>b.options.responsive?(100-2*e.length)/e.length:100-2*e.length):b.options.widthBoard,i=b.options.itemAddOptions.enabled,r=b.options.itemAddOptions.content,a=b.options.itemAddOptions.class,d=b.options.itemAddOptions.footer;for(n in e){var c=e[n];t||b.options.boards.push(c),b.options.responsivePercentage||(""===b.container.style.width?b.container.style.width=parseInt(o)+2*parseInt(b.options.gutter)+"px":b.container.style.width=parseInt(b.container.style.width)+parseInt(o)+2*parseInt(b.options.gutter)+"px");var s=document.createElement("div");s.dataset.id=c.id,s.dataset.order=b.container.childNodes.length+1,s.classList.add("kanban-board"),b.options.responsivePercentage?s.style.width=o+"%":s.style.width=o,s.style.marginLeft=b.options.gutter,s.style.marginRight=b.options.gutter;var l=document.createElement("header"),u=""!==c.class&&void 0!==c.class?c.class.split(","):[];l.classList.add("kanban-board-header"),u.map(function(e){e=e.replace(/^[ ]+/g,""),l.classList.add(e)}),l.innerHTML='<div class="kanban-title-board">'+c.title+"</div>";var f,p=document.createElement("main");for(f in p.classList.add("kanban-drag"),(""!==c.bodyClass&&void 0!==c.bodyClass?c.bodyClass.split(","):[]).map(function(e){p.classList.add(e)}),b.boardContainer.push(p),c.item){var m=c.item[f],v=document.createElement("div");v.classList.add("kanban-item"),m.id&&(v.dataset.eid=m.id),m.class&&Array.isArray(m.class)&&m.class.forEach(function(e){v.classList.add(e)}),v.innerHTML=E(m.title),v.clickfn=m.click,v.dragfn=m.drag,v.dragendfn=m.dragend,v.dropfn=m.drop,w(v,m),y(v),b.options.itemHandleOptions.enabled&&(v.style.cursor="default"),p.appendChild(v)}var h,g=document.createElement("footer");i&&(h=document.createElement("BUTTON"),u=document.createTextNode(r||"+"),h.setAttribute("class",a||"kanban-title-button btn btn-default btn-xs"),h.appendChild(u),(d?g:l).appendChild(h),function(e,t){e.addEventListener("click",function(e){e.preventDefault(),b.options.buttonClick(this,t)})}(h,c.id)),s.appendChild(l),s.appendChild(p),s.appendChild(g),b.container.appendChild(s)}return b},this.findBoard=function(e){return b.element.querySelector('[data-id="'+e+'"]')},this.getParentBoardID=function(e){return null===(e="string"==typeof e?b.element.querySelector('[data-eid="'+e+'"]'):e)?null:e.parentNode.parentNode.dataset.id},this.moveElement=function(e,t,n){if(e!==this.getParentBoardID(t))return this.removeElement(t),this.addElement(e,n)},this.replaceElement=function(e,t){var n=e;return(n="string"==typeof n?b.element.querySelector('[data-eid="'+e+'"]'):n).innerHTML=t.title,n.clickfn=t.click,n.dragfn=t.drag,n.dragendfn=t.dragend,n.dropfn=t.drop,w(n,t),b},this.findElement=function(e){return b.element.querySelector('[data-eid="'+e+'"]')},this.getBoardElements=function(e){return b.element.querySelector('[data-id="'+e+'"] .kanban-drag').childNodes},this.removeElement=function(e){return null!==(e="string"==typeof e?b.element.querySelector('[data-eid="'+e+'"]'):e)&&("function"==typeof e.remove?e.remove():e.parentNode.removeChild(e)),b},this.removeBoard=function(e){var t=null;null!==(t="string"==typeof e?b.element.querySelector('[data-id="'+e+'"]'):t)&&("function"==typeof t.remove?t.remove():t.parentNode.removeChild(t));for(var n=0;n<b.options.boards.length;n++)if(b.options.boards[n].id===e){b.options.boards.splice(n,1);break}return b},this.onButtonClick=function(e){},this.init()}}()},{dragula:9}],2:[function(e,t,n){t.exports=function(e,t){return Array.prototype.slice.call(e,t)}},{}],3:[function(e,t,n){"use strict";var o=e("ticky");t.exports=function(e,t,n){e&&o(function(){e.apply(n||null,t||[])})}},{ticky:11}],4:[function(e,t,n){"use strict";var d=e("atoa"),c=e("./debounce");t.exports=function(i,e){var r=e||{},a={};return(i=void 0===i?{}:i).on=function(e,t){return a[e]?a[e].push(t):a[e]=[t],i},i.once=function(e,t){return t._once=!0,i.on(e,t),i},i.off=function(e,t){var n=arguments.length;if(1===n)delete a[e];else if(0===n)a={};else{e=a[e];if(!e)return i;e.splice(e.indexOf(t),1)}return i},i.emit=function(){var e=d(arguments);return i.emitterSnapshot(e.shift()).apply(this,e)},i.emitterSnapshot=function(o){var e=(a[o]||[]).slice(0);return function(){var t=d(arguments),n=this||i;if("error"===o&&!1!==r.throws&&!e.length)throw 1===t.length?t[0]:t;return e.forEach(function(e){r.async?c(e,t,n):e.apply(n,t),e._once&&i.off(o,e)}),i}},i}},{"./debounce":3,atoa:2}],5:[function(n,o,e){!function(s){!function(){"use strict";var i=n("custom-event"),r=n("./eventmap"),a=s.document,e=function(e,t,n,o){return e.addEventListener(t,n,o)},t=function(e,t,n,o){return e.removeEventListener(t,n,o)},d=[];function c(e,t,n){t=function(e,t,n){for(var o,i=0;i<d.length;i++)if((o=d[i]).element===e&&o.type===t&&o.fn===n)return i}(e,t,n);if(t){n=d[t].wrapper;return d.splice(t,1),n}}s.addEventListener||(e=function(e,t,n){return e.attachEvent("on"+t,(n=c(o=e,e=t,t=n)||(i=o,r=t,function(e){var t=e||s.event;t.target=t.target||t.srcElement,t.preventDefault=t.preventDefault||function(){t.returnValue=!1},t.stopPropagation=t.stopPropagation||function(){t.cancelBubble=!0},t.which=t.which||t.keyCode,r.call(i,t)}),d.push({wrapper:n,element:o,type:e,fn:t}),n));var o,i,r},t=function(e,t,n){n=c(e,t,n);if(n)return e.detachEvent("on"+t,n)}),o.exports={add:e,remove:t,fabricate:function(e,t,n){var o,o=-1===r.indexOf(t)?new i(t,{detail:n}):(a.createEvent?(o=a.createEvent("Event")).initEvent(t,!0,!0):a.createEventObject&&(o=a.createEventObject()),o);e.dispatchEvent?e.dispatchEvent(o):e.fireEvent("on"+t,o)}}}.call(this)}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./eventmap":6,"custom-event":7}],6:[function(e,i,t){!function(o){!function(){"use strict";var e=[],t="",n=/^on/;for(t in o)n.test(t)&&e.push(t.slice(2));i.exports=e}.call(this)}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],7:[function(e,n,t){!function(e){!function(){var t=e.CustomEvent;n.exports=function(){try{var e=new t("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(e){}}()?t:"undefined"!=typeof document&&"function"==typeof document.createEvent?function(e,t){var n=document.createEvent("CustomEvent");return t?n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail):n.initCustomEvent(e,!1,!1,void 0),n}:function(e,t){var n=document.createEventObject();return n.type=e,t?(n.bubbles=Boolean(t.bubbles),n.cancelable=Boolean(t.cancelable),n.detail=t.detail):(n.bubbles=!1,n.cancelable=!1,n.detail=void 0),n}}.call(this)}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,t,n){"use strict";var o={};function i(e){var t=o[e];return t?t.lastIndex=0:o[e]=t=new RegExp("(?:^|\\s)"+e+"(?:\\s|$)","g"),t}t.exports={add:function(e,t){var n=e.className;n.length?i(t).test(n)||(e.className+=" "+t):e.className=t},rm:function(e,t){e.className=e.className.replace(i(t)," ").trim()}}},{}],9:[function(e,t,n){!function(i){!function(){"use strict";var D=e("contra/emitter"),X=e("crossvent"),Y=e("./classes"),j=document,F=j.documentElement;function R(e,t,n,o){i.navigator.pointerEnabled?X[t](e,{mouseup:"pointerup",mousedown:"pointerdown",mousemove:"pointermove"}[n],o):i.navigator.msPointerEnabled?X[t](e,{mouseup:"MSPointerUp",mousedown:"MSPointerDown",mousemove:"MSPointerMove"}[n],o):(X[t](e,{mouseup:"touchend",mousedown:"touchstart",mousemove:"touchmove"}[n],o),X[t](e,n,o))}function U(e){if(void 0!==e.touches)return e.touches.length;if(void 0!==e.which&&0!==e.which)return e.which;if(void 0!==e.buttons)return e.buttons;e=e.button;return void 0!==e?1&e?1:2&e?3:4&e?2:0:void 0}function K(e,t){return void 0!==i[t]?i[t]:(F.clientHeight?F:j.body)[e]}function z(e,t,n){var o=(e=e||{}).className||"";return e.className+=" gu-hide",n=j.elementFromPoint(t,n),e.className=o,n}function W(){return!1}function G(){return!0}function V(e){return e.width||e.right-e.left}function $(e){return e.height||e.bottom-e.top}function J(e){return e.parentNode===j?null:e.parentNode}function Q(e){return"INPUT"===e.tagName||"TEXTAREA"===e.tagName||"SELECT"===e.tagName||function e(t){return!!t&&("false"!==t.contentEditable&&("true"===t.contentEditable||e(J(t))))}(e)}function Z(t){return t.nextElementSibling||function(){for(var e=t;(e=e.nextSibling)&&1!==e.nodeType;);return e}()}function ee(e,t){var n=t.targetTouches&&t.targetTouches.length?t.targetTouches[0]:t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,t={pageX:"clientX",pageY:"clientY"};return n[e=e in t&&!(e in n)&&t[e]in n?t[e]:e]}t.exports=function(e,t){var s,l,u,f,p,o,i,m,v,h,n;1===arguments.length&&!1===Array.isArray(e)&&(t=e,e=[]);var r,g=null,b=t||{};void 0===b.moves&&(b.moves=G),void 0===b.accepts&&(b.accepts=G),void 0===b.invalid&&(b.invalid=function(){return!1}),void 0===b.containers&&(b.containers=e||[]),void 0===b.isContainer&&(b.isContainer=W),void 0===b.copy&&(b.copy=!1),void 0===b.copySortSource&&(b.copySortSource=!1),void 0===b.revertOnSpill&&(b.revertOnSpill=!1),void 0===b.removeOnSpill&&(b.removeOnSpill=!1),void 0===b.direction&&(b.direction="vertical"),void 0===b.ignoreInputTextSelection&&(b.ignoreInputTextSelection=!0),void 0===b.mirrorContainer&&(b.mirrorContainer=j.body);var y=D({containers:b.containers,start:function(e){e=O(e);e&&k(e)},end:S,cancel:I,remove:N,destroy:function(){d(!0),L({})},canMove:function(e){return!!O(e)},dragging:!1});return!0===b.removeOnSpill&&y.on("over",function(e){Y.rm(e,"gu-hide")}).on("out",function(e){y.dragging&&Y.add(e,"gu-hide")}),d(),y;function a(e){return-1!==y.containers.indexOf(e)||b.isContainer(e)}function d(e){e=e?"remove":"add";R(F,e,"mousedown",T),R(F,e,"mouseup",L)}function c(e){R(F,e?"remove":"add","mousemove",C)}function w(e){e=e?"remove":"add";X[e](F,"selectstart",E),X[e](F,"click",E)}function E(e){r&&e.preventDefault()}function T(e){var t,n;o=e.clientX,i=e.clientY,1!==U(e)||e.metaKey||e.ctrlKey||(n=O(t=e.target))&&(r=n,c(),"mousedown"===e.type&&(Q(t)?t.focus():e.preventDefault()))}function C(e){if(r)if(0!==U(e)){if(!(void 0!==e.clientX&&Math.abs(e.clientX-o)<=(b.slideFactorX||0)&&void 0!==e.clientY&&Math.abs(e.clientY-i)<=(b.slideFactorY||0))){if(b.ignoreInputTextSelection){var t=ee("clientX",e)||0,n=ee("clientY",e)||0;if(Q(j.elementFromPoint(t,n)))return}t=r;c(!0),w(),S(),k(t);t=(n=u.getBoundingClientRect()).left+K("scrollLeft","pageXOffset"),n=n.top+K("scrollTop","pageYOffset");f=ee("pageX",e)-t,p=ee("pageY",e)-n,Y.add(h||u,"gu-transit"),s||(n=u.getBoundingClientRect(),(s=u.cloneNode(!0)).style.width=V(n)+"px",s.style.height=$(n)+"px",Y.rm(s,"gu-transit"),Y.add(s,"gu-mirror"),b.mirrorContainer.appendChild(s),R(F,"add","mousemove",P),Y.add(b.mirrorContainer,"gu-unselectable"),y.emit("cloned",s,u,"mirror")),P(e)}}else L({})}function O(e){if(!(y.dragging&&s||a(e))){for(var t=e;J(e)&&!1===a(J(e));){if(b.invalid(e,t))return;if(!(e=J(e)))return}var n=J(e);if(n&&!b.invalid(e,t)&&b.moves(e,n,t,Z(e)))return{item:e,source:n}}}function k(e){var t=e.item,n=e.source;("boolean"==typeof b.copy?b.copy:b.copy(t,n))&&(h=e.item.cloneNode(!0),y.emit("cloned",h,e.item,"copy")),l=e.source,u=e.item,m=v=Z(e.item),y.dragging=!0,y.emit("drag",u,l)}function S(){var e;y.dragging&&B(e=h||u,J(e))}function x(){c(!(r=!1)),w(!0)}function L(e){var t,n;x(),y.dragging&&(t=h||u,n=ee("clientX",e)||0,e=ee("clientY",e)||0,(e=H(z(s,n,e),n,e))&&(h&&b.copySortSource||!h||e!==l)?B(t,e):(b.removeOnSpill?N:I)())}function B(e,t){var n=J(e);h&&b.copySortSource&&t===l&&n.removeChild(u),_(t)?y.emit("cancel",e,l,l):y.emit("drop",e,t,l,v),A()}function N(){var e,t;y.dragging&&((t=J(e=h||u))&&t.removeChild(e),y.emit(h?"cancel":"remove",e,t,l),A())}function I(e){var t,n,o;y.dragging&&(t=0<arguments.length?e:b.revertOnSpill,!1===(e=_(o=J(n=h||u)))&&t&&(h?o&&o.removeChild(h):l.insertBefore(n,m)),e||t?y.emit("cancel",n,l,l):y.emit("drop",n,o,l,v),A())}function A(){var e=h||u;x(),s&&(Y.rm(b.mirrorContainer,"gu-unselectable"),R(F,"remove","mousemove",P),J(s).removeChild(s),s=null),e&&Y.rm(e,"gu-transit"),n&&clearTimeout(n),y.dragging=!1,g&&y.emit("out",e,g,l),y.emit("dragend",e),l=u=h=m=v=n=g=null}function _(e,t){t=void 0!==t?t:s?v:Z(h||u);return e===l&&t===m}function H(t,n,o){for(var i=t;i&&!function(){if(!1===a(i))return!1;var e=q(i,t),e=M(i,e,n,o);return!!_(i,e)||b.accepts(u,i,l,e)}();)i=J(i);return i}function P(e){if(s){e.preventDefault();var t=ee("clientX",e)||0,n=ee("clientY",e)||0,o=t-f,i=n-p;s.style.left=o+"px",s.style.top=i+"px";var r=h||u,a=z(s,t,n),e=H(a,t,n),o=null!==e&&e!==g;!o&&null!==e||(g&&c("out"),g=e,o&&c("over"));i=J(r);if(e!==l||!h||b.copySortSource){var d,a=q(e,a);if(null!==a)d=M(e,a,t,n);else{if(!0!==b.revertOnSpill||h)return void(h&&i&&i.removeChild(r));d=m,e=l}(null===d&&o||d!==r&&d!==Z(r))&&(v=d,e.insertBefore(r,d),y.emit("shadow",r,e,l))}else i&&i.removeChild(r)}function c(e){y.emit(e,r,g,l)}}function q(e,t){for(var n=t;n!==e&&J(n)!==e;)n=J(n);return n===F?null:n}function M(i,e,r,a){var t,d="horizontal"===b.direction;return e!==i?(t=e.getBoundingClientRect(),(d?r>t.left+V(t)/2:a>t.top+$(t)/2)?Z(e):e):function(){for(var e,t,n=i.children.length,o=0;o<n;o++){if(t=(e=i.children[o]).getBoundingClientRect(),d&&t.left+t.width/2>r)return e;if(!d&&t.top+t.height/2>a)return e}return null}()}}}.call(this)}.call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./classes":8,"contra/emitter":4,crossvent:5}],10:[function(e,t,n){var o,i,t=t.exports={};function r(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function d(t){if(o===setTimeout)return setTimeout(t,0);if((o===r||!o)&&setTimeout)return o=setTimeout,setTimeout(t,0);try{return o(t,0)}catch(e){try{return o.call(null,t,0)}catch(e){return o.call(this,t,0)}}}!function(){try{o="function"==typeof setTimeout?setTimeout:r}catch(e){o=r}try{i="function"==typeof clearTimeout?clearTimeout:a}catch(e){i=a}}();var c,s=[],l=!1,u=-1;function f(){l&&c&&(l=!1,c.length?s=c.concat(s):u=-1,s.length&&p())}function p(){if(!l){var e=d(f);l=!0;for(var t=s.length;t;){for(c=s,s=[];++u<t;)c&&c[u].run();u=-1,t=s.length}c=null,l=!1,function(t){if(i===clearTimeout)return clearTimeout(t);if((i===a||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function v(){}t.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];s.push(new m(e,t)),1!==s.length||l||d(p)},m.prototype.run=function(){this.fun.apply(null,this.array)},t.title="browser",t.browser=!0,t.env={},t.argv=[],t.version="",t.versions={},t.on=v,t.addListener=v,t.once=v,t.off=v,t.removeListener=v,t.removeAllListeners=v,t.emit=v,t.prependListener=v,t.prependOnceListener=v,t.listeners=function(e){return[]},t.binding=function(e){throw new Error("process.binding is not supported")},t.cwd=function(){return"/"},t.chdir=function(e){throw new Error("process.chdir is not supported")},t.umask=function(){return 0}},{}],11:[function(e,n,t){!function(t){!function(){n.exports="function"==typeof t?function(e){t(e)}:function(e){setTimeout(e,0)}}.call(this)}.call(this,e("timers").setImmediate)},{timers:12}],12:[function(c,e,s){!function(n,d){!function(){var o=c("process/browser.js").nextTick,e=Function.prototype.apply,i=Array.prototype.slice,r={},a=0;function t(e,t){this._id=e,this._clearFn=t}s.setTimeout=function(){return new t(e.call(setTimeout,window,arguments),clearTimeout)},s.setInterval=function(){return new t(e.call(setInterval,window,arguments),clearInterval)},s.clearTimeout=s.clearInterval=function(e){e.close()},t.prototype.unref=t.prototype.ref=function(){},t.prototype.close=function(){this._clearFn.call(window,this._id)},s.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},s.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},s._unrefActive=s.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;0<=t&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},s.setImmediate="function"==typeof n?n:function(e){var t=a++,n=!(arguments.length<2)&&i.call(arguments,1);return r[t]=!0,o(function(){r[t]&&(n?e.apply(null,n):e.call(null),s.clearImmediate(t))}),t},s.clearImmediate="function"==typeof d?d:function(e){delete r[e]}}.call(this)}.call(this,c("timers").setImmediate,c("timers").clearImmediate)},{"process/browser.js":10,timers:12}]},{},[1]);