"use strict";var KTWizard6=function(){var t,e,i,o=[];return{init:function(){t=KTUtil.getById("kt_wizard"),e=KTUtil.getById("kt_form"),(i=new KTWizard(t,{startStep:1,clickableSteps:!1})).on("change",function(e){if(!(e.getStep()>e.getNewStep())){var t=o[e.getStep()-1];return t&&t.validate().then(function(t){"Valid"==t?(e.goTo(e.getNewStep()),KTUtil.scrollTop()):Swal.fire({text:"Sorry, looks like there are some errors detected, please try again.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn font-weight-bold btn-light"}}).then(function(){KTUtil.scrollTop()})}),!1}}),i.on("changed",function(t){KTUtil.scrollTop()}),i.on("submit",function(t){Swal.fire({text:"All is good! Please confirm the form submission.",icon:"success",showCancelButton:!0,buttonsStyling:!1,confirmButtonText:"Yes, submit!",cancelButtonText:"No, cancel",customClass:{confirmButton:"btn font-weight-bold btn-primary",cancelButton:"btn font-weight-bold btn-default"}}).then(function(t){t.value?e.submit():"cancel"===t.dismiss&&Swal.fire({text:"Your form has not been submitted!.",icon:"error",buttonsStyling:!1,confirmButtonText:"Ok, got it!",customClass:{confirmButton:"btn font-weight-bold btn-primary"}})})}),o.push(FormValidation.formValidation(e,{fields:{firstname:{validators:{notEmpty:{message:"First name is required"}}},lastname:{validators:{notEmpty:{message:"Last name is required"}}}},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap:new FormValidation.plugins.Bootstrap({eleValidClass:""})}})),o.push(FormValidation.formValidation(e,{fields:{address1:{validators:{notEmpty:{message:"Address is required"}}},address2:{validators:{notEmpty:{message:"Address is required"}}},postcode:{validators:{notEmpty:{message:"Postcode is required"}}},city:{validators:{notEmpty:{message:"City is required"}}},state:{validators:{notEmpty:{message:"State is required"}}},country:{validators:{notEmpty:{message:"Country is required"}}}},plugins:{trigger:new FormValidation.plugins.Trigger,bootstrap:new FormValidation.plugins.Bootstrap({eleValidClass:""})}}))}}}();jQuery(document).ready(function(){KTWizard6.init()});