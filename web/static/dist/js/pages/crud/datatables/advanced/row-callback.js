"use strict";var KTDatatablesAdvancedColumnVisibility={init:function(){$("#kt_datatable").DataTable({responsive:!0,createdRow:function(t,e,a){t=$("td",t).eq(6);4e5<+e[6].replace(/[\$,]/g,"")&&+e[6].replace(/[\$,]/g,"")<6e5&&t.addClass("highlight").css({"font-weight":"bold",color:"#716aca"}).attr("title","Over $400,000 and below $600,000"),6e5<+e[6].replace(/[\$,]/g,"")&&t.addClass("highlight").css({"font-weight":"bold",color:"#f4516c"}).attr("title","Over $600,000"),t.html(KTUtil.numberString(e[6]))}})}};jQuery(document).ready(function(){KTDatatablesAdvancedColumnVisibility.init()});