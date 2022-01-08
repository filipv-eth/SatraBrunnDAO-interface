var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function s(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let i;function c(t,e){return i||(i=document.createElement("a")),i.href=e,t===i.href}function l(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}const u="undefined"!=typeof window;let f=u?()=>window.performance.now():()=>Date.now(),h=u?t=>requestAnimationFrame(t):t;const d=new Set;function p(t){d.forEach((e=>{e.c(t)||(d.delete(e),e.f())})),0!==d.size&&h(p)}function g(t,e){t.appendChild(e)}function m(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function b(t){const e=v("style");return function(t,e){g(t.head||t,e)}(m(t),e),e}function $(t,e,n){t.insertBefore(e,n||null)}function w(t){t.parentNode.removeChild(t)}function y(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function v(t){return document.createElement(t)}function x(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function _(t){return document.createTextNode(t)}function k(){return _(" ")}function B(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function S(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}class j{constructor(){this.e=this.n=null}c(t){this.h(t)}m(t,e,n=null){this.e||(this.e=v(e.nodeName),this.t=e,this.c(t)),this.i(n)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}i(t){for(let e=0;e<this.n.length;e+=1)$(this.t,this.n[e],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(w)}}const A=new Set;let O,D=0;function E(t,e,n,o,r,s,a,i=0){const c=16.666/o;let l="{\n";for(let t=0;t<=1;t+=c){const o=e+(n-e)*s(t);l+=100*t+`%{${a(o,1-o)}}\n`}const u=l+`100% {${a(n,1-n)}}\n}`,f=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${i}`,h=m(t);A.add(h);const d=h.__svelte_stylesheet||(h.__svelte_stylesheet=b(t).sheet),p=h.__svelte_rules||(h.__svelte_rules={});p[f]||(p[f]=!0,d.insertRule(`@keyframes ${f} ${u}`,d.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${f} ${o}ms linear ${r}ms 1 both`,D+=1,f}function T(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-o.length;r&&(t.style.animation=o.join(", "),D-=r,D||h((()=>{D||(A.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),A.clear())})))}function q(t){O=t}const C=[],L=[],N=[],M=[],H=Promise.resolve();let F=!1;function z(t){N.push(t)}const I=new Set;let R,W=0;function P(){const t=O;do{for(;W<C.length;){const t=C[W];W++,q(t),G(t.$$)}for(q(null),C.length=0,W=0;L.length;)L.pop()();for(let t=0;t<N.length;t+=1){const e=N[t];I.has(e)||(I.add(e),e())}N.length=0}while(C.length);for(;M.length;)M.pop()();F=!1,I.clear(),q(t)}function G(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(z)}}function J(t,e,n){t.dispatchEvent(function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(`${e?"intro":"outro"}${n}`))}const Z=new Set;let Q;function V(){Q={r:0,c:[],p:Q}}function X(){Q.r||r(Q.c),Q=Q.p}function Y(t,e){t&&t.i&&(Z.delete(t),t.i(e))}function K(t,e,n,o){if(t&&t.o){if(Z.has(t))return;Z.add(t),Q.c.push((()=>{Z.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const U={duration:0};function tt(n,o,a,i){let c=o(n,a),l=i?0:1,u=null,g=null,m=null;function b(){m&&T(n,m)}function $(t,e){const n=t.b-l;return e*=Math.abs(n),{a:l,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function w(o){const{delay:s=0,duration:a=300,easing:i=e,tick:w=t,css:y}=c||U,v={start:f()+s,b:o};o||(v.group=Q,Q.r+=1),u||g?g=v:(y&&(b(),m=E(n,l,o,a,s,i,y)),o&&w(0,1),u=$(v,a),z((()=>J(n,o,"start"))),function(t){let e;0===d.size&&h(p),new Promise((n=>{d.add(e={c:t,f:n})}))}((t=>{if(g&&t>g.start&&(u=$(g,a),g=null,J(n,u.b,"start"),y&&(b(),m=E(n,l,u.b,u.duration,0,i,c.css))),u)if(t>=u.end)w(l=u.b,1-l),J(n,u.b,"end"),g||(u.b?b():--u.group.r||r(u.group.c)),u=null;else if(t>=u.start){const e=t-u.start;l=u.a+u.d*i(e/u.duration),w(l,1-l)}return!(!u&&!g)})))}return{run(t){s(c)?(R||(R=Promise.resolve(),R.then((()=>{R=null}))),R).then((()=>{c=c(),w(t)})):w(t)},end(){b(),u=g=null}}}function et(t){t&&t.c()}function nt(t,e,o,a){const{fragment:i,on_mount:c,on_destroy:l,after_update:u}=t.$$;i&&i.m(e,o),a||z((()=>{const e=c.map(n).filter(s);l?l.push(...e):r(e),t.$$.on_mount=[]})),u.forEach(z)}function ot(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function rt(t,e){-1===t.$$.dirty[0]&&(C.push(t),F||(F=!0,H.then(P)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function st(e,n,s,a,i,c,l,u=[-1]){const f=O;q(e);const h=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(f?f.$$.context:[])),callbacks:o(),dirty:u,skip_bound:!1,root:n.target||f.$$.root};l&&l(h.root);let d=!1;if(h.ctx=s?s(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return h.ctx&&i(h.ctx[t],h.ctx[t]=r)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](r),d&&rt(e,t)),n})):[],h.update(),d=!0,r(h.before_update),h.fragment=!!a&&a(h.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);h.fragment&&h.fragment.l(t),t.forEach(w)}else h.fragment&&h.fragment.c();n.intro&&Y(e.$$.fragment),nt(e,n.target,n.anchor,n.customElement),P()}q(f)}class at{$destroy(){ot(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function it(t,e,n){const o=t.slice();return o[1]=e[n],o[3]=n,o}function ct(e){let n,o,r;return{c(){n=x("rect"),S(n,"width","3"),S(n,"height","2"),S(n,"x",o=""+3*e[3]),S(n,"fill",r=`var(${e[1]})`)},m(t,e){$(t,n,e)},p:t,d(t){t&&w(n)}}}function lt(e){let n,o,r,s,a,i,l,u,f,h=e[0],d=[];for(let t=0;t<h.length;t+=1)d[t]=ct(it(e,h,t));return{c(){n=v("header"),o=v("img"),s=k(),a=v("h1"),a.textContent="Sätra Brunn DAO",i=k(),l=x("svg");for(let t=0;t<d.length;t+=1)d[t].c();c(o.src,r="logo.svg")||S(o,"src","logo.svg"),S(o,"alt","logo"),S(o,"class","svelte-zjcuxb"),S(l,"viewBox",`0 0 ${3*e[0].length} 2`),S(l,"class","svelte-zjcuxb"),S(n,"class","svelte-zjcuxb")},m(t,e){$(t,n,e),g(n,o),g(n,s),g(n,a),g(n,i),g(n,l);for(let t=0;t<d.length;t+=1)d[t].m(l,null);u||(f=B(o,"click",ut),u=!0)},p(t,[e]){if(1&e){let n;for(h=t[0],n=0;n<h.length;n+=1){const o=it(t,h,n);d[n]?d[n].p(o,e):(d[n]=ct(o),d[n].c(),d[n].m(l,null))}for(;n<d.length;n+=1)d[n].d(1);d.length=h.length}},i:t,o:t,d(t){t&&w(n),y(d,t),u=!1,f()}}}function ut(){window.document.body.classList.toggle("dark-mode")}function ft(t){return[["--blue","--blackish","--grayish-orange","--brown","--dark-red","--black"]]}class ht extends at{constructor(t){super(),st(this,t,ft,lt,a,{})}}function dt(e){let n,o,r,s,a,i,c,l,u;return{c(){n=v("a"),n.textContent="Juicebox",o=k(),r=v("a"),r.textContent="twitter",s=k(),a=v("a"),a.textContent="discord",i=k(),c=v("a"),c.textContent="notion",l=k(),u=v("a"),u.textContent="github",S(n,"href","https://juicebox.money/#/p/satrabrunndao"),S(n,"class","svelte-qd22u6"),S(r,"href","https://twitter.com/SatraBrunn"),S(r,"class","svelte-qd22u6"),S(a,"href","https://discord.gg/pQGpBAQM"),S(a,"class","svelte-qd22u6"),S(c,"href","https://satrabrunn.notion.site/S-tra-Brunn-DAO-Notion-2ecbecf19ac3455a83ef6b6206e193bc"),S(c,"class","svelte-qd22u6"),S(u,"href","https://github.com/filipv-eth/SatraBrunnDAO-interface"),S(u,"class","svelte-qd22u6")},m(t,e){$(t,n,e),$(t,o,e),$(t,r,e),$(t,s,e),$(t,a,e),$(t,i,e),$(t,c,e),$(t,l,e),$(t,u,e)},p:t,i:t,o:t,d(t){t&&w(n),t&&w(o),t&&w(r),t&&w(s),t&&w(a),t&&w(i),t&&w(c),t&&w(l),t&&w(u)}}}class pt extends at{constructor(t){super(),st(this,t,null,dt,a,{})}}function gt(e){let n,o,r,s;return r=new pt({}),{c(){n=v("footer"),o=v("nav"),et(r.$$.fragment),S(o,"class","svelte-3mgiq0"),S(n,"class","svelte-3mgiq0")},m(t,e){$(t,n,e),g(n,o),nt(r,o,null),s=!0},p:t,i(t){s||(Y(r.$$.fragment,t),s=!0)},o(t){K(r.$$.fragment,t),s=!1},d(t){t&&w(n),ot(r)}}}class mt extends at{constructor(t){super(),st(this,t,null,gt,a,{})}}function bt(t){let e;const n=t[4].default,o=function(t,e,n,o){if(t){const r=l(t,e,n,o);return t[0](r)}}(n,t,t[3],null);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,r){o&&o.p&&(!e||8&r)&&function(t,e,n,o,r,s){if(r){const a=l(e,n,o,s);t.p(a,r)}}(o,n,t,t[3],e?function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(n,t[3],r,null):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[3]),null)},i(t){e||(Y(o,t),e=!0)},o(t){K(o,t),e=!1},d(t){o&&o.d(t)}}}function $t(t){let e,n,o,r,s,a,i,c,l,u,f,h,d,p,m,b,y=t[2]&&bt(t);return{c(){e=v("div"),n=v("h3"),o=v("button"),r=x("svg"),s=x("path"),a=k(),i=v("h2"),c=_(t[1]),l=k(),u=x("svg"),f=x("circle"),d=k(),y&&y.c(),S(s,"d","M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9L20 9V7L0 7L0 9Z"),S(r,"class","arrow svelte-fy251h"),S(r,"width","21"),S(r,"height","16"),S(r,"viewBox","0 0 21 16"),S(r,"xmlns","http://www.w3.org/2000/svg"),S(i,"class","svelte-fy251h"),S(f,"cx","50"),S(f,"cy","50"),S(f,"r","48"),S(f,"fill",h=`var(${t[0]})`),S(u,"class","circle svelte-fy251h"),S(u,"viewBox","0 0 100 100"),S(u,"stroke","#343837"),S(u,"stroke-width","3px"),S(o,"aria-expanded",t[2]),S(o,"class","svelte-fy251h"),S(n,"class","svelte-fy251h"),S(e,"class","collapsible")},m(h,w){$(h,e,w),g(e,n),g(n,o),g(o,r),g(r,s),g(o,a),g(o,i),g(i,c),g(o,l),g(o,u),g(u,f),g(e,d),y&&y.m(e,null),p=!0,m||(b=B(o,"click",t[5]),m=!0)},p(t,[n]){(!p||2&n)&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(c,t[1]),(!p||1&n&&h!==(h=`var(${t[0]})`))&&S(f,"fill",h),(!p||4&n)&&S(o,"aria-expanded",t[2]),t[2]?y?(y.p(t,n),4&n&&Y(y,1)):(y=bt(t),y.c(),Y(y,1),y.m(e,null)):y&&(V(),K(y,1,1,(()=>{y=null})),X())},i(t){p||(Y(y),p=!0)},o(t){K(y),p=!1},d(t){t&&w(e),y&&y.d(),m=!1,b()}}}function wt(t,e,n){let{$$slots:o={},$$scope:r}=e,{color:s}=e,{headerText:a}=e,i=!1;return t.$$set=t=>{"color"in t&&n(0,s=t.color),"headerText"in t&&n(1,a=t.headerText),"$$scope"in t&&n(3,r=t.$$scope)},[s,a,i,r,o,()=>n(2,i=!i)]}class yt extends at{constructor(t){super(),st(this,t,wt,$t,a,{color:0,headerText:1})}}function vt(t){const e=t-1;return e*e*e+1}function xt(t,{delay:e=0,duration:n=400,easing:o=vt}={}){const r=getComputedStyle(t),s=+r.opacity,a=parseFloat(r.height),i=parseFloat(r.paddingTop),c=parseFloat(r.paddingBottom),l=parseFloat(r.marginTop),u=parseFloat(r.marginBottom),f=parseFloat(r.borderTopWidth),h=parseFloat(r.borderBottomWidth);return{delay:e,duration:n,easing:o,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*s};height: ${t*a}px;padding-top: ${t*i}px;padding-bottom: ${t*c}px;margin-top: ${t*l}px;margin-bottom: ${t*u}px;border-top-width: ${t*f}px;border-bottom-width: ${t*h}px;`}}function _t(t,e,n){const o=t.slice();return o[1]=e[n],o}function kt(e){let n,o,r;return{c(){n=v("i"),n.textContent="Info coming soon."},m(t,e){$(t,n,e),r=!0},p:t,i(t){r||(z((()=>{o||(o=tt(n,xt,{},!0)),o.run(1)})),r=!0)},o(t){o||(o=tt(n,xt,{},!1)),o.run(0),r=!1},d(t){t&&w(n),t&&o&&o.end()}}}function Bt(e){let n,o,r=e[1].a+"";return{c(){n=new j,o=_(""),n.a=o},m(t,e){n.m(r,t,e),$(t,o,e)},p:t,i:t,o:t,d(t){t&&w(o),t&&n.d()}}}function St(t){let e,n,o,r,s,a;const i=[Bt,kt],c=[];return n=function(t,e){return t[1].a?0:1}(t),o=c[n]=i[n](t),{c(){e=v("p"),o.c(),s=k(),S(e,"class","svelte-i0m3lr")},m(t,o){$(t,e,o),c[n].m(e,null),$(t,s,o),a=!0},p(t,e){o.p(t,e)},i(t){a||(Y(o),z((()=>{r||(r=tt(e,xt,{},!0)),r.run(1)})),a=!0)},o(t){K(o),r||(r=tt(e,xt,{},!1)),r.run(0),a=!1},d(t){t&&w(e),c[n].d(),t&&r&&r.end(),t&&w(s)}}}function jt(t){let e,n;return e=new yt({props:{headerText:t[1].q,color:t[1].c,$$slots:{default:[St]},$$scope:{ctx:t}}}),{c(){et(e.$$.fragment)},m(t,o){nt(e,t,o),n=!0},p(t,n){const o={};16&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(Y(e.$$.fragment,t),n=!0)},o(t){K(e.$$.fragment,t),n=!1},d(t){ot(e,t)}}}function At(t){let e,n,o=t[0],r=[];for(let e=0;e<o.length;e+=1)r[e]=jt(_t(t,o,e));const s=t=>K(r[t],1,1,(()=>{r[t]=null}));return{c(){e=v("section");for(let t=0;t<r.length;t+=1)r[t].c();S(e,"class","svelte-i0m3lr")},m(t,o){$(t,e,o);for(let t=0;t<r.length;t+=1)r[t].m(e,null);n=!0},p(t,[n]){if(1&n){let a;for(o=t[0],a=0;a<o.length;a+=1){const s=_t(t,o,a);r[a]?(r[a].p(s,n),Y(r[a],1)):(r[a]=jt(s),r[a].c(),Y(r[a],1),r[a].m(e,null))}for(V(),a=o.length;a<r.length;a+=1)s(a);X()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)Y(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)K(r[t]);n=!1},d(t){t&&w(e),y(r,t)}}}function Ot(t){return[[{q:"What is a DAO?",a:"DAO stands for decentralized autonomous organization. A DAO is an entity with no central leadership and little or no hierarchical management, where proposals are instead made from individual contributors and voted on by the community. A DAO is represented by a program called a <i>smart contract</i> that defines the rules with which the DAO operates. The financial records and smart contract for a DAO are both typically stored on a blockchain.",c:"--red"},{q:"How will Sätra Brunn DAO raise money?",a:'Sätra Brunn DAO will be using <a href="https://juicebox.money/">Juicebox</a>, a powerful and lightweight programmable treasury that allows contributors to donate ETH in exchange for tokens. These tokens can then be used to vote within the DAO, meaning that governance power rests in the hands of those who donate their resources, time, and effort to the DAO.',c:"--blue"},{q:"Why Sätra Brunn?",a:"Sätra Brunn has the potential to become a major hub for the European web3 community. With rapidly increasing demand for in-person web3 meeting spaces, infrastructure like Sätra Brunn’s is quickly becoming vital to the ecosystem. The village not only hosts over 3,600 attendees at conferences each year, but features 70 buildings including a fully operational beverage production company, a bathhouse and spa, and numerous lodging options. <br><br> Sätra Brunn is not just one of the preeminent wellness destinations in Europe — it is a loving community with 320 years of history behind it, with the potential to play a major role in the web3 revolution.",c:"--grayish-blue"},{q:"How can I join?",a:'If you would like to become a contributor, take a look at <a href="https://www.notion.so/How-to-Get-Started-f8169ff245c9443bb87bd9ed86155975">How to Get Started</a> on the <a href="https://www.notion.so/2ecbecf19ac3455a83ef6b6206e193bc">Sätra Brunn DAO Notion</a>.',c:"--light-gray"},{q:"Is there a roadmap?",a:"Sätra Brunn DAO is focused on the long term sustainability of this project—our primary goal is to preserve the history and legacy of Sätra Brunn, and to solidify Sätra Brunn as a venue for the future of art and technology. <br><br> The first phase of this project will be centered around fundraising and awareness within the web3 community. Longer term, we are focused on preparing for the transition in ownership, growing our team of builders and contributors, and preserving Sätra Brunn’s community and values.",c:"--grayish-orange"},{q:"How can I donate?",a:"Head to our <a href='https://juicebox.money/#/p/satrabrunndao'>Juicebox Project</a> on <a href='https://juicebox.money/#/'>juicebox.money</a>!",c:"--brown"},{q:"Where can I learn more?",a:'To learn more, you can take a look at our <a href="https://www.notion.so/S-tra-Brunn-DAO-Notion-2ecbecf19ac3455a83ef6b6206e193bc)">Notion</a>, follow us on <a href="https://twitter.com/SatraBrunn">Twitter</a>, and join the discussion in our <a href="http://discord.gg/ZMtXgYrm5N">Discord server</a>!',c:"--black"}]]}class Dt extends at{constructor(t){super(),st(this,t,Ot,At,a,{})}}function Et(t,e,n){const o=t.slice();return o[1]=e[n],o[3]=n,o}function Tt(t){let e,n,o,r;return{c(){e=x("circle"),S(e,"class","circle svelte-91442r"),S(e,"cx",n=2*t[3]+1),S(e,"cy",o=1),S(e,"r","0.9"),S(e,"fill",r=`var(${t[1]})`),S(e,"stroke-width","0.05")},m(t,n){$(t,e,n)},p(t,n){1&n&&r!==(r=`var(${t[1]})`)&&S(e,"fill",r)},d(t){t&&w(e)}}}function qt(e){let n,o,r=e[0],s=[];for(let t=0;t<r.length;t+=1)s[t]=Tt(Et(e,r,t));return{c(){n=x("svg");for(let t=0;t<s.length;t+=1)s[t].c();S(n,"viewBox",o=`0 0 ${2*e[0].length} 2`),S(n,"class","svelte-91442r")},m(t,e){$(t,n,e);for(let t=0;t<s.length;t+=1)s[t].m(n,null)},p(t,[e]){if(1&e){let o;for(r=t[0],o=0;o<r.length;o+=1){const a=Et(t,r,o);s[o]?s[o].p(a,e):(s[o]=Tt(a),s[o].c(),s[o].m(n,null))}for(;o<s.length;o+=1)s[o].d(1);s.length=r.length}1&e&&o!==(o=`0 0 ${2*t[0].length} 2`)&&S(n,"viewBox",o)},i:t,o:t,d(t){t&&w(n),y(s,t)}}}function Ct(t,e,n){let{colors:o=["--dark-red","--red","--blue","--grayish-blue","--light-gray","--gray","--grayish-orange","--brown","--black","--blackish"]}=e;return t.$$set=t=>{"colors"in t&&n(0,o=t.colors)},[o]}class Lt extends at{constructor(t){super(),st(this,t,Ct,qt,a,{colors:0})}}function Nt(e){let n,o,r,s,a,i,l,u,f,h,d,p,m,b,y,x,_,B,j,A;return n=new ht({}),i=new Lt({}),_=new Dt({}),j=new mt({}),{c(){et(n.$$.fragment),o=k(),r=v("main"),s=v("section"),a=v("article"),et(i.$$.fragment),l=k(),u=v("p"),u.innerHTML="<b>Sätra Brunn</b> is a 144 acre wellness destination in the suburbs of Stockholm,\n        Sweden, renowned for its healing spring water and picturesque scenery.",f=k(),h=v("hr"),d=k(),p=v("p"),p.innerHTML="Sätra Brunn DAO plans to buy Sätra Brunn at auction to establish the\n        first-ever real world <b>DAO-governed municipality.</b>",m=k(),b=v("img"),x=k(),et(_.$$.fragment),B=k(),et(j.$$.fragment),S(u,"class","svelte-1iaj7tw"),S(h,"class","svelte-1iaj7tw"),S(p,"class","svelte-1iaj7tw"),S(a,"class","svelte-1iaj7tw"),S(b,"id","map"),c(b.src,y="map.png")||S(b,"src","map.png"),S(b,"alt","map"),S(b,"class","svelte-1iaj7tw"),S(s,"id","main-description"),S(s,"class","svelte-1iaj7tw"),S(r,"class","svelte-1iaj7tw")},m(t,e){nt(n,t,e),$(t,o,e),$(t,r,e),g(r,s),g(s,a),nt(i,a,null),g(a,l),g(a,u),g(a,f),g(a,h),g(a,d),g(a,p),g(s,m),g(s,b),g(r,x),nt(_,r,null),$(t,B,e),nt(j,t,e),A=!0},p:t,i(t){A||(Y(n.$$.fragment,t),Y(i.$$.fragment,t),Y(_.$$.fragment,t),Y(j.$$.fragment,t),A=!0)},o(t){K(n.$$.fragment,t),K(i.$$.fragment,t),K(_.$$.fragment,t),K(j.$$.fragment,t),A=!1},d(t){ot(n,t),t&&w(o),t&&w(r),ot(i),ot(_),t&&w(B),ot(j,t)}}}return new class extends at{constructor(t){super(),st(this,t,null,Nt,a,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
