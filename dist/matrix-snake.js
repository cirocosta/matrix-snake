!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):"object"==typeof exports?exports.SnakeGame=t():e.SnakeGame=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(){this.directions=[c.up,c.down,c.left,c.right],u.call(this)}function i(e,t){return[Math.random()*e|0,Math.random()*t|0]}function o(e,t,n,r){var o=s.genMatrix(e,t),u=[[(Math.random()*e-1|0)+1,(Math.random()*t-1|0)+1]],a=i(e,t),p=0,h=[c.up,c.down,c.left,c.right][4*Math.random()|0],d=h;return n.on("dir",function(e){d=e}),{next:function(){return u=f(u,h,d,e,t,a,function(){p++,a=i(e,t),r&&r(p)}),d=d||h,h=d,l(u,o,a)}}}{var s=n(6),u=n(1).EventEmitter,a=n(5).inherits,c=s.DIR,f=s.move,l=s.stampOnMatrix;Function.prototype.call.bind(Array.prototype.slice)}a(r,u),r.prototype.emitDir=function(e){var t=this.directions.indexOf(e);if(!~t)throw new Error("Invalid Direction");this.emit("dir",this.directions[t])},e.exports={prepare:o,CbObj:r}},function(e){function t(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(e){return"function"==typeof e}function r(e){return"number"==typeof e}function i(e){return"object"==typeof e&&null!==e}function o(e){return void 0===e}e.exports=t,t.EventEmitter=t,t.prototype._events=void 0,t.prototype._maxListeners=void 0,t.defaultMaxListeners=10,t.prototype.setMaxListeners=function(e){if(!r(e)||0>e||isNaN(e))throw TypeError("n must be a positive number");return this._maxListeners=e,this},t.prototype.emit=function(e){var t,r,s,u,a,c;if(this._events||(this._events={}),"error"===e&&(!this._events.error||i(this._events.error)&&!this._events.error.length)){if(t=arguments[1],t instanceof Error)throw t;throw TypeError('Uncaught, unspecified "error" event.')}if(r=this._events[e],o(r))return!1;if(n(r))switch(arguments.length){case 1:r.call(this);break;case 2:r.call(this,arguments[1]);break;case 3:r.call(this,arguments[1],arguments[2]);break;default:for(s=arguments.length,u=new Array(s-1),a=1;s>a;a++)u[a-1]=arguments[a];r.apply(this,u)}else if(i(r)){for(s=arguments.length,u=new Array(s-1),a=1;s>a;a++)u[a-1]=arguments[a];for(c=r.slice(),s=c.length,a=0;s>a;a++)c[a].apply(this,u)}return!0},t.prototype.addListener=function(e,r){var s;if(!n(r))throw TypeError("listener must be a function");if(this._events||(this._events={}),this._events.newListener&&this.emit("newListener",e,n(r.listener)?r.listener:r),this._events[e]?i(this._events[e])?this._events[e].push(r):this._events[e]=[this._events[e],r]:this._events[e]=r,i(this._events[e])&&!this._events[e].warned){var s;s=o(this._maxListeners)?t.defaultMaxListeners:this._maxListeners,s&&s>0&&this._events[e].length>s&&(this._events[e].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[e].length),"function"==typeof console.trace&&console.trace())}return this},t.prototype.on=t.prototype.addListener,t.prototype.once=function(e,t){function r(){this.removeListener(e,r),i||(i=!0,t.apply(this,arguments))}if(!n(t))throw TypeError("listener must be a function");var i=!1;return r.listener=t,this.on(e,r),this},t.prototype.removeListener=function(e,t){var r,o,s,u;if(!n(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;if(r=this._events[e],s=r.length,o=-1,r===t||n(r.listener)&&r.listener===t)delete this._events[e],this._events.removeListener&&this.emit("removeListener",e,t);else if(i(r)){for(u=s;u-->0;)if(r[u]===t||r[u].listener&&r[u].listener===t){o=u;break}if(0>o)return this;1===r.length?(r.length=0,delete this._events[e]):r.splice(o,1),this._events.removeListener&&this.emit("removeListener",e,t)}return this},t.prototype.removeAllListeners=function(e){var t,r;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[e]&&delete this._events[e],this;if(0===arguments.length){for(t in this._events)"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events={},this}if(r=this._events[e],n(r))this.removeListener(e,r);else for(;r.length;)this.removeListener(e,r[r.length-1]);return delete this._events[e],this},t.prototype.listeners=function(e){var t;return t=this._events&&this._events[e]?n(this._events[e])?[this._events[e]]:this._events[e].slice():[]},t.listenerCount=function(e,t){var r;return r=e._events&&e._events[t]?n(e._events[t])?1:e._events[t].length:0}},function(e){function t(){}var n=e.exports={};n.nextTick=function(){var e="undefined"!=typeof window&&window.setImmediate,t="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(e)return function(e){return window.setImmediate(e)};if(t){var n=[];return window.addEventListener("message",function(e){var t=e.source;if((t===window||null===t)&&"process-tick"===e.data&&(e.stopPropagation(),n.length>0)){var r=n.shift();r()}},!0),function(e){n.push(e),window.postMessage("process-tick","*")}}return function(e){setTimeout(e,0)}}(),n.title="browser",n.browser=!0,n.env={},n.argv=[],n.on=t,n.addListener=t,n.once=t,n.off=t,n.removeListener=t,n.removeAllListeners=t,n.emit=t,n.binding=function(){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(){throw new Error("process.chdir is not supported")}},function(e){e.exports="function"==typeof Object.create?function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:function(e,t){e.super_=t;var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},function(e){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},function(e,t,n){(function(e,r){function i(e,n){var r={seen:[],stylize:s};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),v(n)?r.showHidden=n:n&&t._extend(r,n),_(r.showHidden)&&(r.showHidden=!1),_(r.depth)&&(r.depth=2),_(r.colors)&&(r.colors=!1),_(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=o),a(r,e,r.depth)}function o(e,t){var n=i.styles[t];return n?"["+i.colors[n][0]+"m"+e+"["+i.colors[n][1]+"m":e}function s(e){return e}function u(e){var t={};return e.forEach(function(e){t[e]=!0}),t}function a(e,n,r){if(e.customInspect&&n&&j(n.inspect)&&n.inspect!==t.inspect&&(!n.constructor||n.constructor.prototype!==n)){var i=n.inspect(r,e);return b(i)||(i=a(e,i,r)),i}var o=c(e,n);if(o)return o;var s=Object.keys(n),v=u(s);if(e.showHidden&&(s=Object.getOwnPropertyNames(n)),O(n)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return f(n);if(0===s.length){if(j(n)){var g=n.name?": "+n.name:"";return e.stylize("[Function"+g+"]","special")}if(x(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(L(n))return e.stylize(Date.prototype.toString.call(n),"date");if(O(n))return f(n)}var m="",y=!1,w=["{","}"];if(d(n)&&(y=!0,w=["[","]"]),j(n)){var _=n.name?": "+n.name:"";m=" [Function"+_+"]"}if(x(n)&&(m=" "+RegExp.prototype.toString.call(n)),L(n)&&(m=" "+Date.prototype.toUTCString.call(n)),O(n)&&(m=" "+f(n)),0===s.length&&(!y||0==n.length))return w[0]+m+w[1];if(0>r)return x(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special");e.seen.push(n);var E;return E=y?l(e,n,r,v,s):s.map(function(t){return p(e,n,r,v,t,y)}),e.seen.pop(),h(E,m,w)}function c(e,t){if(_(t))return e.stylize("undefined","undefined");if(b(t)){var n="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(n,"string")}return y(t)?e.stylize(""+t,"number"):v(t)?e.stylize(""+t,"boolean"):g(t)?e.stylize("null","null"):void 0}function f(e){return"["+Error.prototype.toString.call(e)+"]"}function l(e,t,n,r,i){for(var o=[],s=0,u=t.length;u>s;++s)o.push(A(t,String(s))?p(e,t,n,r,String(s),!0):"");return i.forEach(function(i){i.match(/^\d+$/)||o.push(p(e,t,n,r,i,!0))}),o}function p(e,t,n,r,i,o){var s,u,c;if(c=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]},c.get?u=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(u=e.stylize("[Setter]","special")),A(r,i)||(s="["+i+"]"),u||(e.seen.indexOf(c.value)<0?(u=g(n)?a(e,c.value,null):a(e,c.value,n-1),u.indexOf("\n")>-1&&(u=o?u.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+u.split("\n").map(function(e){return"   "+e}).join("\n"))):u=e.stylize("[Circular]","special")),_(s)){if(o&&i.match(/^\d+$/))return u;s=JSON.stringify(""+i),s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+u}function h(e,t,n){var r=0,i=e.reduce(function(e,t){return r++,t.indexOf("\n")>=0&&r++,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0);return i>60?n[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+n[1]:n[0]+t+" "+e.join(", ")+" "+n[1]}function d(e){return Array.isArray(e)}function v(e){return"boolean"==typeof e}function g(e){return null===e}function m(e){return null==e}function y(e){return"number"==typeof e}function b(e){return"string"==typeof e}function w(e){return"symbol"==typeof e}function _(e){return void 0===e}function x(e){return E(e)&&"[object RegExp]"===z(e)}function E(e){return"object"==typeof e&&null!==e}function L(e){return E(e)&&"[object Date]"===z(e)}function O(e){return E(e)&&("[object Error]"===z(e)||e instanceof Error)}function j(e){return"function"==typeof e}function S(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||"undefined"==typeof e}function z(e){return Object.prototype.toString.call(e)}function M(e){return 10>e?"0"+e.toString(10):e.toString(10)}function k(){var e=new Date,t=[M(e.getHours()),M(e.getMinutes()),M(e.getSeconds())].join(":");return[e.getDate(),R[e.getMonth()],t].join(" ")}function A(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var D=/%[sdj%]/g;t.format=function(e){if(!b(e)){for(var t=[],n=0;n<arguments.length;n++)t.push(i(arguments[n]));return t.join(" ")}for(var n=1,r=arguments,o=r.length,s=String(e).replace(D,function(e){if("%%"===e)return"%";if(n>=o)return e;switch(e){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return e}}),u=r[n];o>n;u=r[++n])s+=g(u)||!E(u)?" "+u:" "+i(u);return s},t.deprecate=function(n,i){function o(){if(!s){if(r.throwDeprecation)throw new Error(i);r.traceDeprecation?console.trace(i):console.error(i),s=!0}return n.apply(this,arguments)}if(_(e.process))return function(){return t.deprecate(n,i).apply(this,arguments)};if(r.noDeprecation===!0)return n;var s=!1;return o};var N,H={};t.debuglog=function(e){if(_(N)&&(N=r.env.NODE_DEBUG||""),e=e.toUpperCase(),!H[e])if(new RegExp("\\b"+e+"\\b","i").test(N)){var n=r.pid;H[e]=function(){var r=t.format.apply(t,arguments);console.error("%s %d: %s",e,n,r)}}else H[e]=function(){};return H[e]},t.inspect=i,i.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},i.styles={special:"cyan",number:"yellow","boolean":"yellow",undefined:"grey","null":"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=d,t.isBoolean=v,t.isNull=g,t.isNullOrUndefined=m,t.isNumber=y,t.isString=b,t.isSymbol=w,t.isUndefined=_,t.isRegExp=x,t.isObject=E,t.isDate=L,t.isError=O,t.isFunction=j,t.isPrimitive=S,t.isBuffer=n(4);var R=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];t.log=function(){console.log("%s - %s",k(),t.format.apply(t,arguments))},t.inherits=n(3),t._extend=function(e,t){if(!t||!E(t))return e;for(var n=Object.keys(t),r=n.length;r--;)e[n[r]]=t[n[r]];return e}}).call(t,function(){return this}(),n(2))},function(e){"use strict";function t(e,t,n,r,i){var o;switch(n=n||t){case u.right:o=e[0]+1,e[0]=o>=r?0:o;break;case u.left:o=e[0]-1,e[0]=0>o?r-1:o;break;case u.down:o=e[1]+1,e[1]=i>o?o:0;break;case u.up:o=e[1]-1,e[1]=0>o?i-1:o;break;default:throw new Error(n+" direction is not supported.")}return e}function n(e,t){if(e.length!==t.length)return!1;for(var n=e.length;n--;)if(e[n]!==t[n])return!1;return!0}function r(e,t){return t.some(function(t){return n(e,t)?!0:!1})}function i(e,t){for(var n=[],r=[];e--;)r.push(0);for(;t--;)n.push(c(r));return n}function o(e,i,o,s,u,f,l){var p,h,d=(e.length,!1);return h=e.map(function(h,v){return e[v+1]?e[v+1]:(p=t(c(h),i,o,s,u),r(p,e)?a:(f&&n(f,p)&&(d=!0,l&&l()),p))}),d&&h.unshift(e[0]),h}function s(e,t,n){var r=JSON.parse(JSON.stringify(t));for(var i in e)r[e[i][1]][e[i][0]]=1;return n&&(r[n[1]][n[0]]=1),r}var u={right:"right",up:"up",left:"left",down:"down"},a="CRASHHHH!",c=Function.prototype.call.bind(Array.prototype.slice);e.exports={DIR:u,CRASH:a,genMatrix:i,stampOnMatrix:s,move:o}}])});