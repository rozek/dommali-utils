!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).dommaliUtils={})}(this,(function(t){"use strict";function e(t,e,i,n){return new(i||(i=Promise))((function(r,o){function a(t){try{s(n.next(t))}catch(t){o(t)}}function g(t){try{s(n.throw(t))}catch(t){o(t)}}function s(t){var e;t.done?r(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(a,g)}s((n=n.apply(t,e||[])).next())}))}function i(t,e){var i,n,r,o,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:g(0),throw:g(1),return:g(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function g(o){return function(g){return function(o){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,n&&(r=2&o[0]?n.return:o[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,o[1])).done)return r;switch(n=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,n=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){a.label=o[1];break}if(6===o[0]&&a.label<r[1]){a.label=r[1],r=o;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(o);break}r[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],n=0}finally{i=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,g])}}}var n=new Function("return this")();if("function"!=typeof n.dommali||"function"!=typeof n.dommali.ready)throw new TypeError('module "dommali" is missing');var r=n.dommali,o=Object.getPrototypeOf(r());function a(t){return("number"==typeof t||t instanceof Number)&&isFinite(t.valueOf())}function g(t,e,i,n,r){if(void 0===n&&(n=!0),void 0===r&&(r=!0),!function(t){return"number"==typeof t||t instanceof Number}(t)||isNaN(t))return!1;if(a(e)){if(a(i)){if(t<e||!n&&t===e||t>i||!r&&t===i)return!1}else if(t<e||!n&&t===e)return!1}else if(a(i)&&(t>i||!r&&t===i))return!1;return!0}function s(t){return"string"==typeof t||t instanceof String}var u=["x","y","both"];function p(t,n,r){return e(this,void 0,void 0,(function(){var e,o,a,g,s,u,p,c,f,l,m,d,h,b,v,y,P,D,w,F,x;return i(this,(function(i){switch(i.label){case 0:if(0!==n.button)return[2];if(e=r.onlyFrom,o=r.neverFrom,a=r.initialDirection,g=r.minOffsetX,s=r.minOffsetY,u=r.Easing,p=r.Extras,c=r.stopPropagation,f=r.stopImmediatePropagation,l=n.target,null!=e&&!l.matches(e))return[2];if(null!=o&&l.matches(o))return[2];m=n.pageX,d=!1,h=n.pageY,b=n.timeStamp,v=0,y=0,P=n.pointerId,l.setPointerCapture(P),null==g&&null==s&&"both"===a&&(t.trigger("dragging-started",[p,n.pageX,n.pageY,m,h,n]),d=!0,1==c&&n.stopPropagation(),1==f&&n.stopImmediatePropagation()),i.label=1;case 1:return[4,t.waitFor("pointermove","pointerup","pointercancel")];case 2:if((n=i.sent()).pointerId!==P)return[3,11];switch(d&&(1==c&&n.stopPropagation(),1==f&&n.stopImmediatePropagation()),!0,!0){case"pointerup"===n.type&&d:return[3,3];case"pointercancel"===n.type&&d:return[3,8]}return[3,9];case 3:if(D=n.pageX,w=n.pageY,null==u||0==v||0==y)return[3,7];i.label=4;case 4:return[4,t.waitFor(100)];case 5:i.sent(),v=Math.trunc(v*u),D+=v,y=Math.trunc(y*u),w+=y,t.trigger("dragging-continued",[p,D,w,n]),i.label=6;case 6:if(0!=v&&0!=y)return[3,4];i.label=7;case 7:return t.trigger("dragging-finished",[p,D,w,n]),[3,10];case 8:return t.trigger("dragging-aborted",[p,m,h,n]),[3,10];case 9:d?(null!=u&&n.timeStamp!==b&&(v=Math.trunc(100*n.movementX/(n.timeStamp-b)),y=Math.trunc(100*n.movementY/(n.timeStamp-b))),t.trigger("dragging-continued",[p,n.pageX,n.pageY,n])):(null==g||Math.abs(n.pageX-m)>g||null==s||Math.abs(n.pageY-h)>s)&&(F=Math.abs(n.pageX-m),x=Math.abs(n.pageY-h),("both"===a||"x"===a&&F>x||"y"===a&&F<x)&&(t.trigger("dragging-started",[p,n.pageX,n.pageY,m,h,n]),d=!0,1==c&&n.stopPropagation(),1==f&&n.stopImmediatePropagation())),i.label=10;case 10:if("pointerup"===n.type||"pointercancel"===n.type)return[3,12];i.label=11;case 11:return[3,1];case 12:return l.releasePointerCapture(P),[2]}}))}))}Object.assign(o,{recognizesDragging:function(){return this.recognizesDraggingFor("@this")},recognizesDraggingFor:function(t){return"@this"!==t&&""!==t.trim()||(t="@this"),this.Subjects.length>0&&this.Subjects.every((function(e){return null!=e._dommali_Dragging&&"function"==typeof e._dommali_Dragging[t]}))},recognizeDragging:function(t){return this.recognizeDraggingFor("@this",t)},recognizeDraggingFor:function(t,e){return"@this"!==t&&""!==t.trim()||(t="@this"),e=function(t){var e=t||{},i=e.onlyFrom,n=e.neverFrom,r=e.initialDirection,o=e.minOffsetX,a=e.minOffsetY,p=e.Easing,c=e.Extras,f=e.stopPropagation,l=e.stopImmediatePropagation;return s(i)||(i=void 0),s(n)||(n=void 0),u.indexOf(r)>=0||(r="both"),g(o,0,1/0,!1)||(o=void 0),g(a,0,1/0,!1)||(a=void 0),!0===p&&(p=.5),g(p,0,1,!1,!1)||(p=void 0),!0!==f&&(f=!1),!0!==l&&(l=!1),{onlyFrom:i,neverFrom:n,initialDirection:r,minOffsetX:o,minOffsetY:a,Easing:p,Extras:c,stopPropagation:f,stopImmediatePropagation:l}}(e),this.ignoreDraggingFor(t),this.forEach((function(i){function n(n){if("@this"===t)p(i,n,e);else{var o=n.target.closest(t);null!=o&&p(r(o),n,e)}}i.on("pointerdown",n),i.prop("_dommali_Dragging",n)})),this},ignoreDragging:function(){return this.ignoreDraggingFor("@this")},ignoreDraggingFor:function(t){"@this"!==t&&""!==t.trim()||(t="@this"),this.forEach((function(e){var i=e.prop("_dommali_Dragging");null!=i&&"function"==typeof i[t]&&(e.off("pointerdown",i[t]),e.removeProp("_dommali_Dragging"))}))}}),Object.assign(o,{provideSimpleDragging:function(t){this.provideSimpleDraggingFor("@this")},provideSimpleDraggingFor:function(t,n){"@this"!==t&&""!==t.trim()||(t="@this"),this.recognizesDraggingFor(t)||this.recognizeDraggingFor(t,n);var o=function(t){var e=t||{},i=e.leftLimit,n=e.topLimit,r=e.rightLimit,o=e.bottomLimit,g=e.stopPropagation,s=e.stopImmediatePropagation;return a(i)||(i=0),a(n)||(n=0),a(r)||(r=0),a(o)||(o=0),!0!==g&&(g=!1),!0!==s&&(s=!1),{leftLimit:i,topLimit:n,rightLimit:r,bottomLimit:o,stopPropagation:g,stopImmediatePropagation:s}}(n),g=o.leftLimit,s=o.topLimit,u=o.rightLimit,p=o.bottomLimit,c=o.stopPropagation,f=o.stopImmediatePropagation;this.on("dragging-started",t,(function(t,n,o,a,l,m){return e(this,void 0,void 0,(function(){var n,d,h,b,v,y=this;return i(this,(function(P){switch(P.label){case 0:return 1==c&&t.stopPropagation(),1==f&&t.stopImmediatePropagation(),n=r(t.target),d=n.parent(),h=n.positionInParent(),b=h.left-l,v=h.top-m,[4,this.repeatUntil("dragging-finished","dragging-aborted",(function(){return e(y,void 0,void 0,(function(){var e,l,m;return i(this,(function(i){switch(i.label){case 0:return e=Math.max(g,Math.min(o+b,d.width()-u)),l=Math.max(s,Math.min(a+v,d.height()-p)),n.css({left:e+"px",top:l+"px"}),[4,this.waitFor("dragging-continued","dragging-finished","dragging-aborted")];case 1:return"dragging-aborted"!==(t=i.sent()).type&&((m=r.extraParametersOfEvent(t))[0],o=m[1],a=m[2]),1==c&&t.stopPropagation(),1==f&&t.stopImmediatePropagation(),[2]}}))}))}))];case 1:return"dragging-aborted"===(t=P.sent()).type&&n.css({left:h.left+"px",top:h.top+"px"}),[2]}}))}))}))}}),t.DraggingDirections=u,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=dommali-utils.js.map
