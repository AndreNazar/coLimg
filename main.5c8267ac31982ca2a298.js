(()=>{"use strict";var e=document.querySelector(".delete-block"),t=document.querySelector(".container .output_colors"),n=document.querySelector(".container .output_img"),o=document.querySelector(".container .main-title"),r=document.querySelector(".form-container"),i=document.querySelector(".form input"),a=document.querySelector(".form .text"),c=document.querySelector(".up-icon"),u=document.createElement("canvas");const l=function(){function e(){}return e.prototype.euclideanDistance=function(e,t){return Math.sqrt(Math.pow(e[0]-t[0],2)+Math.pow(e[1]-t[1],2)+Math.pow(e[2]-t[2],2))},e.prototype.findClosestCentroid=function(e,t){var n=this,o=Number.MAX_VALUE,r=null;return t.forEach((function(t){var i=n.euclideanDistance(e,t);i<o&&(o=i,r=t)})),r},e.prototype.updateCentroids=function(e){return e.map((function(e){if(0===e.length)return[0,0,0];var t=e.reduce((function(e,t){return[e[0]+t[0],e[1]+t[1],e[2]+t[2]]}),[0,0,0]);return[t[0]/e.length,t[1]/e.length,t[2]/e.length]}))},e.prototype.cluster=function(e,t,n){var o=this;void 0===n&&(n=100);for(var r=e.slice(0,t),i=new Array(t).fill(null).map((function(){return[]})),a=function(n){i=new Array(t).fill(null).map((function(){return[]})),e.forEach((function(e){var t=o.findClosestCentroid(e,r),n=r.indexOf(t);i[n].push(e)}));var a=c.updateCentroids(i);if(r.every((function(e,t){return o.euclideanDistance(e,a[t])<1})))return"break";r=a},c=this,u=0;u<n&&"break"!==a();u++);return i},e}();var s=function(e,t){e.preventDefault(),a.innerHTML={over:"Отпустите изображение, чтобы начать загрузку",leave:"Нажмите, чтобы выбрать картинку, либо перетащите картинку сюда"}[t],"over"===t?c.classList.add("active"):c.classList.remove("active")},d=function(e){var t=new Image;if(1===e.length&&("image/png"===e[0].type||"image/jpeg"===e[0].type||"image/svg+xml"===e[0].type)){r.classList.remove("load-animation");var o=setTimeout((function(){r.style.display="none",n.innerHTML="",t.src=URL.createObjectURL(e[0]),t.onload=function(e){return function(){var t,n=u.getContext("2d"),o=new l,r=[];u.width=e.width,u.height=e.height,n.drawImage(e,0,0),t=n.getImageData(0,0,e.width,e.height).data;for(var i=0;i<t.length;i+=4)r.push([t[i],t[i+1],t[i+2]]);o.cluster(r,3).map((function(e){return o.updateCentroids([e])[0]})).forEach((function(e){return m(e)})),f()}}(t),n.appendChild(t),clearTimeout(o)}),600)}},f=function(){return t=void 0,o=void 0,i=function(){var t;return function(e,t){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(u){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(a=0)),a;)try{if(n=1,o&&(r=2&c[0]?o.return:c[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,c[1])).done)return r;switch(o=0,r&&(c=[2&c[0],r.value]),c[0]){case 0:case 1:r=c;break;case 4:return a.label++,{value:c[1],done:!1};case 5:a.label++,o=c[1],c=[0];continue;case 7:c=a.ops.pop(),a.trys.pop();continue;default:if(!((r=(r=a.trys).length>0&&r[r.length-1])||6!==c[0]&&2!==c[0])){a=0;continue}if(3===c[0]&&(!r||c[1]>r[0]&&c[1]<r[3])){a.label=c[1];break}if(6===c[0]&&a.label<r[1]){a.label=r[1],r=c;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(c);break}r[2]&&a.ops.pop(),a.trys.pop();continue}c=t.call(e,a)}catch(e){c=[6,e],o=0}finally{n=r=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}}(this,(function(o){return n.classList.add("load-animation"),document.querySelectorAll(".container .output_colors .color-block").forEach((function(t,n){var o=setTimeout((function(){t.classList.add("load-animation"),2===n&&(e.style.display="flex"),clearTimeout(o)}),100*(n+1))})),t=setTimeout((function(){e.classList.add("load-animation"),clearTimeout(t)}),400),[2]}))},new((r=void 0)||(r=Promise))((function(e,n){function a(e){try{u(i.next(e))}catch(e){n(e)}}function c(e){try{u(i.throw(e))}catch(e){n(e)}}function u(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,c)}u((i=i.apply(t,o||[])).next())}));var t,o,r,i},m=function(e){var n=document.createElement("div"),o=document.createElement("p"),r=e[0],i=e[1],a=e[2],c=(299*r+587*i+114*a)/1e3;o.className="color-text",o.innerHTML="#"+v(r)+v(i)+v(a),o.style.color=c>128?"#000":"#fff",n.className="color-block",n.style.backgroundColor="rgb(".concat(r,", ").concat(i,", ").concat(a,")");var u=document.createElement("div");u.className="copied_alert",u.innerHTML="Copied!",n.appendChild(u),t.appendChild(n),n.appendChild(o),n.addEventListener("click",(function(){return p(u,o)}))},p=function(e,t){var n=null;e.style.display="flex",n=setTimeout((function(){return e.classList.add("active")})),n=setTimeout((function(){e.classList.remove("active"),n=setTimeout((function(){e.style.display="none",clearTimeout(n)}),300)}),500),navigator.clipboard.writeText(t.innerHTML)},v=function(e){return 1===(+e.toFixed()).toString(16).length?"0"+(+e.toFixed()).toString(16):(+e.toFixed()).toString(16)};document.addEventListener("DOMContentLoaded",(function(){var e;e=setTimeout((function(){r.classList.add("load-animation"),o.classList.add("load-animation"),clearTimeout(e)}),400)})),i.addEventListener("dragover",(function(e){return s(e,"over")})),i.addEventListener("dragleave",(function(e){return s(e,"leave")})),i.addEventListener("drop",(function(e){s(e,"leave"),d(e.dataTransfer.files)})),i.addEventListener("change",(function(e){e.preventDefault(),d(e.target.files)})),e.addEventListener("click",(function(){return function(){e.classList.remove("load-animation"),n.classList.remove("load-animation"),document.querySelectorAll(".container .output_colors .color-block").forEach((function(e){return e.classList.remove("load-animation")})),r.style.display="grid",i.value="";var o=setTimeout((function(){r.classList.add("load-animation"),n.innerHTML="",t.innerHTML="",e.style.display="none",clearTimeout(o)}),400)}()}))})();