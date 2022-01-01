var app=function(){"use strict";function t(){}const e=t=>t;function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function s(t){return"function"==typeof t}function a(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let i;function l(t,e,n,o){return t[1]&&o?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](o(e))):n.ctx}const c="undefined"!=typeof window;let u=c?()=>window.performance.now():()=>Date.now(),d=c?t=>requestAnimationFrame(t):t;const f=new Set;function h(t){f.forEach((e=>{e.c(t)||(f.delete(e),e.f())})),0!==f.size&&d(h)}function p(t,e){t.appendChild(e)}function m(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function g(t){const e=y("style");return function(t,e){p(t.head||t,e)}(m(t),e),e}function b(t,e,n){t.insertBefore(e,n||null)}function $(t){t.parentNode.removeChild(t)}function w(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function y(t){return document.createElement(t)}function v(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function x(t){return document.createTextNode(t)}function _(){return x(" ")}function k(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}class S{constructor(){this.e=this.n=null}c(t){this.h(t)}m(t,e,n=null){this.e||(this.e=y(e.nodeName),this.t=e,this.c(t)),this.i(n)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.childNodes)}i(t){for(let e=0;e<this.n.length;e+=1)b(this.t,this.n[e],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach($)}}const B=new Set;let A,O=0;function D(t,e,n,o,r,s,a,i=0){const l=16.666/o;let c="{\n";for(let t=0;t<=1;t+=l){const o=e+(n-e)*s(t);c+=100*t+`%{${a(o,1-o)}}\n`}const u=c+`100% {${a(n,1-n)}}\n}`,d=`__svelte_${function(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}(u)}_${i}`,f=m(t);B.add(f);const h=f.__svelte_stylesheet||(f.__svelte_stylesheet=g(t).sheet),p=f.__svelte_rules||(f.__svelte_rules={});p[d]||(p[d]=!0,h.insertRule(`@keyframes ${d} ${u}`,h.cssRules.length));const b=t.style.animation||"";return t.style.animation=`${b?`${b}, `:""}${d} ${o}ms linear ${r}ms 1 both`,O+=1,d}function E(t,e){const n=(t.style.animation||"").split(", "),o=n.filter(e?t=>t.indexOf(e)<0:t=>-1===t.indexOf("__svelte")),r=n.length-o.length;r&&(t.style.animation=o.join(", "),O-=r,O||d((()=>{O||(B.forEach((t=>{const e=t.__svelte_stylesheet;let n=e.cssRules.length;for(;n--;)e.deleteRule(n);t.__svelte_rules={}})),B.clear())})))}function T(t){A=t}const j=[],q=[],C=[],L=[],N=Promise.resolve();let z=!1;function M(t){C.push(t)}const F=new Set;let H,W=0;function I(){const t=A;do{for(;W<j.length;){const t=j[W];W++,T(t),R(t.$$)}for(T(null),j.length=0,W=0;q.length;)q.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];F.has(e)||(F.add(e),e())}C.length=0}while(j.length);for(;L.length;)L.pop()();z=!1,F.clear(),T(t)}function R(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}function G(t,e,n){t.dispatchEvent(function(t,e,n=!1){const o=document.createEvent("CustomEvent");return o.initCustomEvent(t,n,!1,e),o}(`${e?"intro":"outro"}${n}`))}const P=new Set;let Z;function Q(){Z={r:0,c:[],p:Z}}function J(){Z.r||r(Z.c),Z=Z.p}function V(t,e){t&&t.i&&(P.delete(t),t.i(e))}function X(t,e,n,o){if(t&&t.o){if(P.has(t))return;P.add(t),Z.c.push((()=>{P.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}const Y={duration:0};function K(n,o,a,i){let l=o(n,a),c=i?0:1,p=null,m=null,g=null;function b(){g&&E(n,g)}function $(t,e){const n=t.b-c;return e*=Math.abs(n),{a:c,b:t.b,d:n,duration:e,start:t.start,end:t.start+e,group:t.group}}function w(o){const{delay:s=0,duration:a=300,easing:i=e,tick:w=t,css:y}=l||Y,v={start:u()+s,b:o};o||(v.group=Z,Z.r+=1),p||m?m=v:(y&&(b(),g=D(n,c,o,a,s,i,y)),o&&w(0,1),p=$(v,a),M((()=>G(n,o,"start"))),function(t){let e;0===f.size&&d(h),new Promise((n=>{f.add(e={c:t,f:n})}))}((t=>{if(m&&t>m.start&&(p=$(m,a),m=null,G(n,p.b,"start"),y&&(b(),g=D(n,c,p.b,p.duration,0,i,l.css))),p)if(t>=p.end)w(c=p.b,1-c),G(n,p.b,"end"),m||(p.b?b():--p.group.r||r(p.group.c)),p=null;else if(t>=p.start){const e=t-p.start;c=p.a+p.d*i(e/p.duration),w(c,1-c)}return!(!p&&!m)})))}return{run(t){s(l)?(H||(H=Promise.resolve(),H.then((()=>{H=null}))),H).then((()=>{l=l(),w(t)})):w(t)},end(){b(),p=m=null}}}function U(t){t&&t.c()}function tt(t,e,o,a){const{fragment:i,on_mount:l,on_destroy:c,after_update:u}=t.$$;i&&i.m(e,o),a||M((()=>{const e=l.map(n).filter(s);c?c.push(...e):r(e),t.$$.on_mount=[]})),u.forEach(M)}function et(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function nt(t,e){-1===t.$$.dirty[0]&&(j.push(t),z||(z=!0,N.then(I)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function ot(e,n,s,a,i,l,c,u=[-1]){const d=A;T(e);const f=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:i,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(d?d.$$.context:[])),callbacks:o(),dirty:u,skip_bound:!1,root:n.target||d.$$.root};c&&c(f.root);let h=!1;if(f.ctx=s?s(e,n.props||{},((t,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&i(f.ctx[t],f.ctx[t]=r)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](r),h&&nt(e,t)),n})):[],f.update(),h=!0,r(f.before_update),f.fragment=!!a&&a(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach($)}else f.fragment&&f.fragment.c();n.intro&&V(e.$$.fragment),tt(e,n.target,n.anchor,n.customElement),I()}T(d)}class rt{$destroy(){et(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function st(t,e,n){const o=t.slice();return o[1]=e[n],o[3]=n,o}function at(e){let n,o,r;return{c(){n=v("rect"),k(n,"width","3"),k(n,"height","2"),k(n,"x",o=""+3*e[3]),k(n,"fill",r=`var(${e[1]})`)},m(t,e){b(t,n,e)},p:t,d(t){t&&$(n)}}}function it(e){let n,o,r,s,a,l,c,u=e[0],d=[];for(let t=0;t<u.length;t+=1)d[t]=at(st(e,u,t));return{c(){n=y("header"),o=y("img"),s=_(),a=y("h1"),a.textContent="Sätra Brunn DAO",l=_(),c=v("svg");for(let t=0;t<d.length;t+=1)d[t].c();var t,u;t=o.src,u=r="logo.svg",i||(i=document.createElement("a")),i.href=u,t!==i.href&&k(o,"src","logo.svg"),k(o,"alt","logo"),k(o,"class","svelte-zjcuxb"),k(c,"viewBox",`0 0 ${3*e[0].length} 2`),k(c,"class","svelte-zjcuxb"),k(n,"class","svelte-zjcuxb")},m(t,e){b(t,n,e),p(n,o),p(n,s),p(n,a),p(n,l),p(n,c);for(let t=0;t<d.length;t+=1)d[t].m(c,null)},p(t,[e]){if(1&e){let n;for(u=t[0],n=0;n<u.length;n+=1){const o=st(t,u,n);d[n]?d[n].p(o,e):(d[n]=at(o),d[n].c(),d[n].m(c,null))}for(;n<d.length;n+=1)d[n].d(1);d.length=u.length}},i:t,o:t,d(t){t&&$(n),w(d,t)}}}function lt(t){return[["--blue","--blackish","--grayish-orange","--brown","--dark-red","--black"]]}class ct extends rt{constructor(t){super(),ot(this,t,lt,it,a,{})}}function ut(e){let n;return{c(){n=y("ul"),n.innerHTML='<li><a href="https://twitter.com/SatraBrunn" class="svelte-z3l3l3">twitter</a></li> \n  <li><a href="https://discord.gg/pQGpBAQM" class="svelte-z3l3l3">discord</a></li> \n  \n  <li><a href="https://satrabrunn.notion.site/S-tra-Brunn-DAO-Notion-2ecbecf19ac3455a83ef6b6206e193bc" class="svelte-z3l3l3">notion</a></li> \n  <li><a href="https://github.com/filipv-eth/SatraBrunnDAO-interface" class="svelte-z3l3l3">github</a></li>',k(n,"class","svelte-z3l3l3")},m(t,e){b(t,n,e)},p:t,i:t,o:t,d(t){t&&$(n)}}}class dt extends rt{constructor(t){super(),ot(this,t,null,ut,a,{})}}function ft(e){let n,o,r,s;return r=new dt({}),{c(){n=y("footer"),o=y("nav"),U(r.$$.fragment),k(o,"class","svelte-1a1iteq"),k(n,"class","svelte-1a1iteq")},m(t,e){b(t,n,e),p(n,o),tt(r,o,null),s=!0},p:t,i(t){s||(V(r.$$.fragment,t),s=!0)},o(t){X(r.$$.fragment,t),s=!1},d(t){t&&$(n),et(r)}}}class ht extends rt{constructor(t){super(),ot(this,t,null,ft,a,{})}}function pt(t){let e;const n=t[4].default,o=function(t,e,n,o){if(t){const r=l(t,e,n,o);return t[0](r)}}(n,t,t[3],null);return{c(){o&&o.c()},m(t,n){o&&o.m(t,n),e=!0},p(t,r){o&&o.p&&(!e||8&r)&&function(t,e,n,o,r,s){if(r){const a=l(e,n,o,s);t.p(a,r)}}(o,n,t,t[3],e?function(t,e,n,o){if(t[2]&&o){const r=t[2](o(n));if(void 0===e.dirty)return r;if("object"==typeof r){const t=[],n=Math.max(e.dirty.length,r.length);for(let o=0;o<n;o+=1)t[o]=e.dirty[o]|r[o];return t}return e.dirty|r}return e.dirty}(n,t[3],r,null):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[3]),null)},i(t){e||(V(o,t),e=!0)},o(t){X(o,t),e=!1},d(t){o&&o.d(t)}}}function mt(t){let e,n,o,r,s,a,i,l,c,u,d,f,h,m,g,w,S=t[2]&&pt(t);return{c(){e=y("div"),n=y("h3"),o=y("button"),r=v("svg"),s=v("path"),a=_(),i=y("h2"),l=x(t[1]),c=_(),u=v("svg"),d=v("circle"),h=_(),S&&S.c(),k(s,"d","M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.29289L14.3431 0.928932C13.9526 0.538408 13.3195 0.538408 12.9289 0.928932C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM0 9L20 9V7L0 7L0 9Z"),k(s,"fill","#343837"),k(r,"width","21"),k(r,"height","16"),k(r,"viewBox","0 0 21 16"),k(r,"fill","none"),k(r,"xmlns","http://www.w3.org/2000/svg"),k(r,"class","svelte-ydevse"),k(i,"class","svelte-ydevse"),k(d,"cx","50"),k(d,"cy","50"),k(d,"r","48"),k(d,"fill",f=`var(${t[0]})`),k(u,"viewBox","0 0 100 100"),k(u,"stroke","#343837"),k(u,"stroke-width","3px"),k(u,"class","svelte-ydevse"),k(o,"aria-expanded",t[2]),k(o,"class","svelte-ydevse"),k(n,"class","svelte-ydevse"),k(e,"class","collapsible")},m(f,$){var y,v,x,_;b(f,e,$),p(e,n),p(n,o),p(o,r),p(r,s),p(o,a),p(o,i),p(i,l),p(o,c),p(o,u),p(u,d),p(e,h),S&&S.m(e,null),m=!0,g||(y=o,v="click",x=t[5],y.addEventListener(v,x,_),w=()=>y.removeEventListener(v,x,_),g=!0)},p(t,[n]){(!m||2&n)&&function(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}(l,t[1]),(!m||1&n&&f!==(f=`var(${t[0]})`))&&k(d,"fill",f),(!m||4&n)&&k(o,"aria-expanded",t[2]),t[2]?S?(S.p(t,n),4&n&&V(S,1)):(S=pt(t),S.c(),V(S,1),S.m(e,null)):S&&(Q(),X(S,1,1,(()=>{S=null})),J())},i(t){m||(V(S),m=!0)},o(t){X(S),m=!1},d(t){t&&$(e),S&&S.d(),g=!1,w()}}}function gt(t,e,n){let{$$slots:o={},$$scope:r}=e,{color:s}=e,{headerText:a}=e,i=!1;return t.$$set=t=>{"color"in t&&n(0,s=t.color),"headerText"in t&&n(1,a=t.headerText),"$$scope"in t&&n(3,r=t.$$scope)},[s,a,i,r,o,()=>n(2,i=!i)]}class bt extends rt{constructor(t){super(),ot(this,t,gt,mt,a,{color:0,headerText:1})}}function $t(t){const e=t-1;return e*e*e+1}function wt(t,{delay:e=0,duration:n=400,easing:o=$t}={}){const r=getComputedStyle(t),s=+r.opacity,a=parseFloat(r.height),i=parseFloat(r.paddingTop),l=parseFloat(r.paddingBottom),c=parseFloat(r.marginTop),u=parseFloat(r.marginBottom),d=parseFloat(r.borderTopWidth),f=parseFloat(r.borderBottomWidth);return{delay:e,duration:n,easing:o,css:t=>`overflow: hidden;opacity: ${Math.min(20*t,1)*s};height: ${t*a}px;padding-top: ${t*i}px;padding-bottom: ${t*l}px;margin-top: ${t*c}px;margin-bottom: ${t*u}px;border-top-width: ${t*d}px;border-bottom-width: ${t*f}px;`}}function yt(t,e,n){const o=t.slice();return o[1]=e[n],o}function vt(e){let n,o,r;return{c(){n=y("i"),n.textContent="Info coming soon."},m(t,e){b(t,n,e),r=!0},p:t,i(t){r||(M((()=>{o||(o=K(n,wt,{},!0)),o.run(1)})),r=!0)},o(t){o||(o=K(n,wt,{},!1)),o.run(0),r=!1},d(t){t&&$(n),t&&o&&o.end()}}}function xt(e){let n,o,r=e[1].a+"";return{c(){n=new S,o=x(""),n.a=o},m(t,e){n.m(r,t,e),b(t,o,e)},p:t,i:t,o:t,d(t){t&&$(o),t&&n.d()}}}function _t(t){let e,n,o,r,s,a;const i=[xt,vt],l=[];return n=function(t,e){return t[1].a?0:1}(t),o=l[n]=i[n](t),{c(){e=y("p"),o.c(),s=_(),k(e,"class","svelte-i0m3lr")},m(t,o){b(t,e,o),l[n].m(e,null),b(t,s,o),a=!0},p(t,e){o.p(t,e)},i(t){a||(V(o),M((()=>{r||(r=K(e,wt,{},!0)),r.run(1)})),a=!0)},o(t){X(o),r||(r=K(e,wt,{},!1)),r.run(0),a=!1},d(t){t&&$(e),l[n].d(),t&&r&&r.end(),t&&$(s)}}}function kt(t){let e,n;return e=new bt({props:{headerText:t[1].q,color:t[1].c,$$slots:{default:[_t]},$$scope:{ctx:t}}}),{c(){U(e.$$.fragment)},m(t,o){tt(e,t,o),n=!0},p(t,n){const o={};16&n&&(o.$$scope={dirty:n,ctx:t}),e.$set(o)},i(t){n||(V(e.$$.fragment,t),n=!0)},o(t){X(e.$$.fragment,t),n=!1},d(t){et(e,t)}}}function St(t){let e,n,o=t[0],r=[];for(let e=0;e<o.length;e+=1)r[e]=kt(yt(t,o,e));const s=t=>X(r[t],1,1,(()=>{r[t]=null}));return{c(){e=y("section");for(let t=0;t<r.length;t+=1)r[t].c();k(e,"class","svelte-i0m3lr")},m(t,o){b(t,e,o);for(let t=0;t<r.length;t+=1)r[t].m(e,null);n=!0},p(t,[n]){if(1&n){let a;for(o=t[0],a=0;a<o.length;a+=1){const s=yt(t,o,a);r[a]?(r[a].p(s,n),V(r[a],1)):(r[a]=kt(s),r[a].c(),V(r[a],1),r[a].m(e,null))}for(Q(),a=o.length;a<r.length;a+=1)s(a);J()}},i(t){if(!n){for(let t=0;t<o.length;t+=1)V(r[t]);n=!0}},o(t){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)X(r[t]);n=!1},d(t){t&&$(e),w(r,t)}}}function Bt(t){return[[{q:"What is a DAO?",a:"DAO stands for decentralized autonomous organization. A DAO is an entity with no central leadership and little or no hierarchical management, where proposals are instead made from individual contributors and voted on by the community. A DAO is represented by a program called a <i>smart contract</i> that defines the rules with which the DAO operates. The financial records and smart contract for a DAO are both typically stored on a blockchain.",c:"--red"},{q:"How will Sätra Brunn DAO raise money?",a:'Sätra Brunn DAO will be using <a href="https://juicebox.money/">Juicebox</a>, a powerful and lightweight programmable treasury that allows contributors to donate ETH in exchange for tokens. These tokens can then be used to vote within the DAO, meaning that governance power rests in the hands of those who donate their resources, time, and effort to the DAO.',c:"--blue"},{q:"Why Sätra Brunn?",a:"Sätra Brunn has the potential to become a major hub for the European web3 community. With rapidly increasing demand for in-person web3 meeting spaces, infrastructure like Sätra Brunn’s is quickly becoming vital to the ecosystem. The village not only hosts over 3,600 attendees at conferences each year, but features 70 buildings including a fully operational beverage production company, a bathhouse and spa, and numerous lodging options. <br><br> Sätra Brunn is not just one of the preeminent wellness destinations in Europe — it is a loving community with 320 years of history behind it, with the potential to play a major role in the web3 revolution.",c:"--grayish-blue"},{q:"How can I join?",a:'If you would like to become a contributor, take a look at <a href="https://www.notion.so/How-to-Get-Started-f8169ff245c9443bb87bd9ed86155975">How to Get Started</a> on the <a href="https://www.notion.so/2ecbecf19ac3455a83ef6b6206e193bc">Sätra Brunn DAO Notion</a>.',c:"--light-gray"},{q:"Is there a roadmap?",a:"Sätra Brunn DAO is focused on the long term sustainability of this project—our primary goal is to preserve the history and legacy of Sätra Brunn, and to solidify Sätra Brunn as a venue for the future of art and technology. <br><br> The first phase of this project will be centered around fundraising and awareness within the web3 community. Longer term, we are focused on preparing for the transition in ownership, growing our team of builders and contributors, and preserving Sätra Brunn’s community and values.",c:"--grayish-orange"},{q:"When can I donate?",a:"Contributors are working around the clock to guarantee the sustainability of this project, and donations are expected to open up in the next 2-5 days.",c:"--brown"},{q:"Where can I learn more?",a:'To learn more, you can take a look at our <a href="https://www.notion.so/S-tra-Brunn-DAO-Notion-2ecbecf19ac3455a83ef6b6206e193bc)">Notion</a>, follow us on <a href="https://twitter.com/SatraBrunn">Twitter</a>, and join the discussion in our <a href="http://discord.gg/ZMtXgYrm5N">Discord server</a>!',c:"--black"}]]}class At extends rt{constructor(t){super(),ot(this,t,Bt,St,a,{})}}function Ot(e){let n,o,r,s,a,i,l,c,u;return n=new ct({}),i=new At({}),c=new ht({}),{c(){U(n.$$.fragment),o=_(),r=y("main"),s=y("section"),s.innerHTML='<article class="svelte-1bdrma8"><img id="color-palette" src="circle-palette.png" alt="color palette in circles" class="svelte-1bdrma8"/> \n      <p class="svelte-1bdrma8"><b>Sätra Brunn</b> is a 144 acre wellness destination in the suburbs of Stockholm,\n        Sweden, renowned for its healing spring water and picturesque scenery.</p> \n      <hr class="svelte-1bdrma8"/> \n      <p class="svelte-1bdrma8">Sätra Brunn DAO plans to buy Sätra Brunn at auction to establish the\n        first-ever real world <b>DAO-governed municipality.</b></p></article> \n    <img id="map" src="map.png" alt="map" class="svelte-1bdrma8"/>',a=_(),U(i.$$.fragment),l=_(),U(c.$$.fragment),k(s,"id","main-description"),k(s,"class","svelte-1bdrma8"),k(r,"class","svelte-1bdrma8")},m(t,e){tt(n,t,e),b(t,o,e),b(t,r,e),p(r,s),p(r,a),tt(i,r,null),b(t,l,e),tt(c,t,e),u=!0},p:t,i(t){u||(V(n.$$.fragment,t),V(i.$$.fragment,t),V(c.$$.fragment,t),u=!0)},o(t){X(n.$$.fragment,t),X(i.$$.fragment,t),X(c.$$.fragment,t),u=!1},d(t){et(n,t),t&&$(o),t&&$(r),et(i),t&&$(l),et(c,t)}}}return new class extends rt{constructor(t){super(),ot(this,t,null,Ot,a,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
