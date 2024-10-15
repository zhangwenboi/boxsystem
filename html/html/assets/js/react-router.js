import{r as u}from"./antd.js";/**
 * @remix-run/router v1.19.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function O(){return O=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},O.apply(this,arguments)}var P;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(P||(P={}));const D="popstate";function He(e){e===void 0&&(e={});function t(a,l){let{pathname:i="/",search:s="",hash:o=""}=S(a.location.hash.substr(1));return!i.startsWith("/")&&!i.startsWith(".")&&(i="/"+i),W("",{pathname:i,search:s,hash:o},l.state&&l.state.usr||null,l.state&&l.state.key||"default")}function n(a,l){let i=a.document.querySelector("base"),s="";if(i&&i.getAttribute("href")){let o=a.location.href,h=o.indexOf("#");s=h===-1?o:o.slice(0,h)}return s+"#"+(typeof l=="string"?l:H(l))}function r(a,l){k(a.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(l)+")")}return re(t,n,r,e)}function v(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function k(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function ne(){return Math.random().toString(36).substr(2,8)}function _(e,t){return{usr:e.state,key:e.key,idx:t}}function W(e,t,n,r){return n===void 0&&(n=null),O({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?S(t):t,{state:n,key:t&&t.key||r||ne()})}function H(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function S(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function re(e,t,n,r){r===void 0&&(r={});let{window:a=document.defaultView,v5Compat:l=!1}=r,i=a.history,s=P.Pop,o=null,h=d();h==null&&(h=0,i.replaceState(O({},i.state,{idx:h}),""));function d(){return(i.state||{idx:null}).idx}function c(){s=P.Pop;let f=d(),y=f==null?null:f-h;h=f,o&&o({action:s,location:m.location,delta:y})}function p(f,y){s=P.Push;let C=W(m.location,f,y);n&&n(C,f),h=d()+1;let E=_(C,h),N=m.createHref(C);try{i.pushState(E,"",N)}catch($){if($ instanceof DOMException&&$.name==="DataCloneError")throw $;a.location.assign(N)}l&&o&&o({action:s,location:m.location,delta:1})}function x(f,y){s=P.Replace;let C=W(m.location,f,y);n&&n(C,f),h=d();let E=_(C,h),N=m.createHref(C);i.replaceState(E,"",N),l&&o&&o({action:s,location:m.location,delta:0})}function g(f){let y=a.location.origin!=="null"?a.location.origin:a.location.href,C=typeof f=="string"?f:H(f);return C=C.replace(/ $/,"%20"),v(y,"No window.location.(origin|href) available to create URL for href: "+C),new URL(C,y)}let m={get action(){return s},get location(){return e(a,i)},listen(f){if(o)throw new Error("A history only accepts one active listener");return a.addEventListener(D,c),o=f,()=>{a.removeEventListener(D,c),o=null}},createHref(f){return t(a,f)},createURL:g,encodeLocation(f){let y=g(f);return{pathname:y.pathname,search:y.search,hash:y.hash}},push:p,replace:x,go(f){return i.go(f)}};return m}var J;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(J||(J={}));function ae(e,t,n){return n===void 0&&(n="/"),le(e,t,n,!1)}function le(e,t,n,r){let a=typeof t=="string"?S(t):t,l=G(a.pathname||"/",n);if(l==null)return null;let i=A(e);ie(i);let s=null;for(let o=0;s==null&&o<i.length;++o){let h=ge(l);s=me(i[o],h,r)}return s}function A(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let a=(l,i,s)=>{let o={relativePath:s===void 0?l.path||"":s,caseSensitive:l.caseSensitive===!0,childrenIndex:i,route:l};o.relativePath.startsWith("/")&&(v(o.relativePath.startsWith(r),'Absolute route path "'+o.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),o.relativePath=o.relativePath.slice(r.length));let h=R([r,o.relativePath]),d=n.concat(o);l.children&&l.children.length>0&&(v(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),A(l.children,t,d,h)),!(l.path==null&&!l.index)&&t.push({path:h,score:de(h,l.index),routesMeta:d})};return e.forEach((l,i)=>{var s;if(l.path===""||!((s=l.path)!=null&&s.includes("?")))a(l,i);else for(let o of q(l.path))a(l,i,o)}),t}function q(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,a=n.endsWith("?"),l=n.replace(/\?$/,"");if(r.length===0)return a?[l,""]:[l];let i=q(r.join("/")),s=[];return s.push(...i.map(o=>o===""?l:[l,o].join("/"))),a&&s.push(...i),s.map(o=>e.startsWith("/")&&o===""?"/":o)}function ie(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:pe(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const oe=/^:[\w-]+$/,se=3,ue=2,ce=1,he=10,fe=-2,z=e=>e==="*";function de(e,t){let n=e.split("/"),r=n.length;return n.some(z)&&(r+=fe),t&&(r+=ue),n.filter(a=>!z(a)).reduce((a,l)=>a+(oe.test(l)?se:l===""?ce:he),r)}function pe(e,t){return e.length===t.length&&e.slice(0,-1).every((r,a)=>r===t[a])?e[e.length-1]-t[t.length-1]:0}function me(e,t,n){let{routesMeta:r}=e,a={},l="/",i=[];for(let s=0;s<r.length;++s){let o=r[s],h=s===r.length-1,d=l==="/"?t:t.slice(l.length)||"/",c=V({path:o.relativePath,caseSensitive:o.caseSensitive,end:h},d),p=o.route;if(!c&&h&&n&&!r[r.length-1].route.index&&(c=V({path:o.relativePath,caseSensitive:o.caseSensitive,end:!1},d)),!c)return null;Object.assign(a,c.params),i.push({params:a,pathname:R([l,c.pathname]),pathnameBase:Ee(R([l,c.pathnameBase])),route:p}),c.pathnameBase!=="/"&&(l=R([l,c.pathnameBase]))}return i}function V(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=ve(e.path,e.caseSensitive,e.end),a=t.match(n);if(!a)return null;let l=a[0],i=l.replace(/(.)\/+$/,"$1"),s=a.slice(1);return{params:r.reduce((h,d,c)=>{let{paramName:p,isOptional:x}=d;if(p==="*"){let m=s[c]||"";i=l.slice(0,l.length-m.length).replace(/(.)\/+$/,"$1")}const g=s[c];return x&&!g?h[p]=void 0:h[p]=(g||"").replace(/%2F/g,"/"),h},{}),pathname:l,pathnameBase:i,pattern:e}}function ve(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),k(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],a="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,s,o)=>(r.push({paramName:s,isOptional:o!=null}),o?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),a+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?a+="\\/*$":e!==""&&e!=="/"&&(a+="(?:(?=\\/|$))"),[new RegExp(a,t?void 0:"i"),r]}function ge(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return k(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function G(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function xe(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:a=""}=typeof e=="string"?S(e):e;return{pathname:n?n.startsWith("/")?n:ye(n,t):t,search:Pe(r),hash:Re(a)}}function ye(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(a=>{a===".."?n.length>1&&n.pop():a!=="."&&n.push(a)}),n.length>1?n.join("/"):"/"}function j(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Ce(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function K(e,t){let n=Ce(e);return t?n.map((r,a)=>a===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function Q(e,t,n,r){r===void 0&&(r=!1);let a;typeof e=="string"?a=S(e):(a=O({},e),v(!a.pathname||!a.pathname.includes("?"),j("?","pathname","search",a)),v(!a.pathname||!a.pathname.includes("#"),j("#","pathname","hash",a)),v(!a.search||!a.search.includes("#"),j("#","search","hash",a)));let l=e===""||a.pathname==="",i=l?"/":a.pathname,s;if(i==null)s=n;else{let c=t.length-1;if(!r&&i.startsWith("..")){let p=i.split("/");for(;p[0]==="..";)p.shift(),c-=1;a.pathname=p.join("/")}s=c>=0?t[c]:"/"}let o=xe(a,s),h=i&&i!=="/"&&i.endsWith("/"),d=(l||i===".")&&n.endsWith("/");return!o.pathname.endsWith("/")&&(h||d)&&(o.pathname+="/"),o}const R=e=>e.join("/").replace(/\/\/+/g,"/"),Ee=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Pe=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Re=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function be(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const X=["post","put","patch","delete"];new Set(X);const Se=["get",...X];new Set(Se);/**
 * React Router v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function B(){return B=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},B.apply(this,arguments)}const F=u.createContext(null),we=u.createContext(null),w=u.createContext(null),L=u.createContext(null),b=u.createContext({outlet:null,matches:[],isDataRoute:!1}),Y=u.createContext(null);function Ae(e,t){let{relative:n}=t===void 0?{}:t;I()||v(!1);let{basename:r,navigator:a}=u.useContext(w),{hash:l,pathname:i,search:s}=Ne(e,{relative:n}),o=i;return r!=="/"&&(o=i==="/"?r:R([r,i])),a.createHref({pathname:o,search:s,hash:l})}function I(){return u.useContext(L)!=null}function T(){return I()||v(!1),u.useContext(L).location}function Z(e){u.useContext(w).static||u.useLayoutEffect(e)}function qe(){let{isDataRoute:e}=u.useContext(b);return e?Je():Oe()}function Oe(){I()||v(!1);let e=u.useContext(F),{basename:t,future:n,navigator:r}=u.useContext(w),{matches:a}=u.useContext(b),{pathname:l}=T(),i=JSON.stringify(K(a,n.v7_relativeSplatPath)),s=u.useRef(!1);return Z(()=>{s.current=!0}),u.useCallback(function(h,d){if(d===void 0&&(d={}),!s.current)return;if(typeof h=="number"){r.go(h);return}let c=Q(h,JSON.parse(i),l,d.relative==="path");e==null&&t!=="/"&&(c.pathname=c.pathname==="/"?t:R([t,c.pathname])),(d.replace?r.replace:r.push)(c,d.state,d)},[t,r,i,l,e])}const Be=u.createContext(null);function Ie(e){let t=u.useContext(b).outlet;return t&&u.createElement(Be.Provider,{value:e},t)}function Ne(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=u.useContext(w),{matches:a}=u.useContext(b),{pathname:l}=T(),i=JSON.stringify(K(a,r.v7_relativeSplatPath));return u.useMemo(()=>Q(e,JSON.parse(i),l,n==="path"),[e,i,l,n])}function Ue(e,t){return Le(e,t)}function Le(e,t,n,r){I()||v(!1);let{navigator:a}=u.useContext(w),{matches:l}=u.useContext(b),i=l[l.length-1],s=i?i.params:{};i&&i.pathname;let o=i?i.pathnameBase:"/";i&&i.route;let h=T(),d;if(t){var c;let f=typeof t=="string"?S(t):t;o==="/"||(c=f.pathname)!=null&&c.startsWith(o)||v(!1),d=f}else d=h;let p=d.pathname||"/",x=p;if(o!=="/"){let f=o.replace(/^\//,"").split("/");x="/"+p.replace(/^\//,"").split("/").slice(f.length).join("/")}let g=ae(e,{pathname:x}),m=ke(g&&g.map(f=>Object.assign({},f,{params:Object.assign({},s,f.params),pathname:R([o,a.encodeLocation?a.encodeLocation(f.pathname).pathname:f.pathname]),pathnameBase:f.pathnameBase==="/"?o:R([o,a.encodeLocation?a.encodeLocation(f.pathnameBase).pathname:f.pathnameBase])})),l,n,r);return t&&m?u.createElement(L.Provider,{value:{location:B({pathname:"/",search:"",hash:"",state:null,key:"default"},d),navigationType:P.Pop}},m):m}function $e(){let e=_e(),t=be(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,a={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return u.createElement(u.Fragment,null,u.createElement("h2",null,"Unexpected Application Error!"),u.createElement("h3",{style:{fontStyle:"italic"}},t),n?u.createElement("pre",{style:a},n):null,null)}const je=u.createElement($e,null);class We extends u.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?u.createElement(b.Provider,{value:this.props.routeContext},u.createElement(Y.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Me(e){let{routeContext:t,match:n,children:r}=e,a=u.useContext(F);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),u.createElement(b.Provider,{value:t},r)}function ke(e,t,n,r){var a;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var l;if(!n)return null;if(n.errors)e=n.matches;else if((l=r)!=null&&l.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,s=(a=n)==null?void 0:a.errors;if(s!=null){let d=i.findIndex(c=>c.route.id&&(s==null?void 0:s[c.route.id])!==void 0);d>=0||v(!1),i=i.slice(0,Math.min(i.length,d+1))}let o=!1,h=-1;if(n&&r&&r.v7_partialHydration)for(let d=0;d<i.length;d++){let c=i[d];if((c.route.HydrateFallback||c.route.hydrateFallbackElement)&&(h=d),c.route.id){let{loaderData:p,errors:x}=n,g=c.route.loader&&p[c.route.id]===void 0&&(!x||x[c.route.id]===void 0);if(c.route.lazy||g){o=!0,h>=0?i=i.slice(0,h+1):i=[i[0]];break}}}return i.reduceRight((d,c,p)=>{let x,g=!1,m=null,f=null;n&&(x=s&&c.route.id?s[c.route.id]:void 0,m=c.route.errorElement||je,o&&(h<0&&p===0?(g=!0,f=null):h===p&&(g=!0,f=c.route.hydrateFallbackElement||null)));let y=t.concat(i.slice(0,p+1)),C=()=>{let E;return x?E=m:g?E=f:c.route.Component?E=u.createElement(c.route.Component,null):c.route.element?E=c.route.element:E=d,u.createElement(Me,{match:c,routeContext:{outlet:d,matches:y,isDataRoute:n!=null},children:E})};return n&&(c.route.ErrorBoundary||c.route.errorElement||p===0)?u.createElement(We,{location:n.location,revalidation:n.revalidation,component:m,error:x,children:C(),routeContext:{outlet:null,matches:y,isDataRoute:!0}}):C()},null)}var ee=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(ee||{}),U=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(U||{});function Fe(e){let t=u.useContext(F);return t||v(!1),t}function Te(e){let t=u.useContext(we);return t||v(!1),t}function De(e){let t=u.useContext(b);return t||v(!1),t}function te(e){let t=De(),n=t.matches[t.matches.length-1];return n.route.id||v(!1),n.route.id}function _e(){var e;let t=u.useContext(Y),n=Te(U.UseRouteError),r=te(U.UseRouteError);return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function Je(){let{router:e}=Fe(ee.UseNavigateStable),t=te(U.UseNavigateStable),n=u.useRef(!1);return Z(()=>{n.current=!0}),u.useCallback(function(a,l){l===void 0&&(l={}),n.current&&(typeof a=="number"?e.navigate(a):e.navigate(a,B({fromRouteId:t},l)))},[e,t])}function Ge(e){return Ie(e.context)}function ze(e){v(!1)}function Ke(e){let{basename:t="/",children:n=null,location:r,navigationType:a=P.Pop,navigator:l,static:i=!1,future:s}=e;I()&&v(!1);let o=t.replace(/^\/*/,"/"),h=u.useMemo(()=>({basename:o,navigator:l,static:i,future:B({v7_relativeSplatPath:!1},s)}),[o,s,l,i]);typeof r=="string"&&(r=S(r));let{pathname:d="/",search:c="",hash:p="",state:x=null,key:g="default"}=r,m=u.useMemo(()=>{let f=G(d,o);return f==null?null:{location:{pathname:f,search:c,hash:p,state:x,key:g},navigationType:a}},[o,d,c,p,x,g,a]);return m==null?null:u.createElement(w.Provider,{value:h},u.createElement(L.Provider,{children:n,value:m}))}function Qe(e){let{children:t,location:n}=e;return Ue(M(t),n)}new Promise(()=>{});function M(e,t){t===void 0&&(t=[]);let n=[];return u.Children.forEach(e,(r,a)=>{if(!u.isValidElement(r))return;let l=[...t,a];if(r.type===u.Fragment){n.push.apply(n,M(r.props.children,l));return}r.type!==ze&&v(!1),!r.props.index||!r.props.children||v(!1);let i={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=M(r.props.children,l)),n.push(i)}),n}export{w as N,Ge as O,Ke as R,qe as a,T as b,He as c,Ne as d,H as e,Qe as f,ze as g,G as s,Ae as u};