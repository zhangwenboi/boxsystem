import{j as e,P as R,a as T,b as S,c as u,S as p,d as B,M as F,W as y,e as L,f as g}from"./ant-design-pro-components.js";import{az as M,r as l,C as O,s as z,B as A,V as m,aC as E,j as b}from"./antd.js";import{l as N}from"./icons.js";import{O as D,f as H,g as f,a as I}from"./react-router.js";import{L as $,H as q}from"./react-router-dom.js";import{e as G}from"./umi-request.js";import{_ as V}from"./react-countup.js";import{L as Y}from"./ant-charts.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();var x={},v=M;x.createRoot=v.createRoot,x.hydrateRoot=v.hydrateRoot;const K={route:{path:"/",routes:[{path:"/home",name:"欢迎",icon:e.jsx(N,{}),component:"./home"}]},location:{pathname:"/"}},W=()=>{const[t,s]=l.useState("/home");return typeof document>"u"?e.jsx("div",{}):e.jsx("div",{id:"test-pro-layout",style:{height:"100vh",overflow:"auto"},children:e.jsx(R,{hashed:!1,children:e.jsx(O,{getTargetContainer:()=>document.getElementById("test-pro-layout")||document.body,children:e.jsx(T,{prefixCls:"my-prefix",...K,location:{pathname:t},token:{header:{colorBgMenuItemSelected:"rgba(0,0,0,0.04)"}},siderMenuType:"group",menu:{collapsedShowGroupTitle:!0},title:"系统信息",menuItemRender:(o,n)=>e.jsx("div",{onClick:()=>{s(o.path||"/home")},children:n}),children:e.jsx(S,{token:{paddingInlinePageContainerContent:20},subTitle:"下行盒子拉取查看",children:e.jsx(D,{})})})})})})},U=()=>e.jsx(z,{status:"404",title:"404",subTitle:"哦吼,找不到页面了!",extra:e.jsx($,{to:"/",children:e.jsx(A,{type:"primary",children:"返回首页"})})}),k={200:"服务器成功返回请求的数据。",201:"新建或修改数据成功。",202:"一个请求已经进入后台排队（异步任务）。",204:"删除数据成功。",400:"发出的请求有错误，服务器没有进行新建或修改数据的操作。",401:"用户没有权限（令牌、用户名、密码错误）。",403:"用户得到授权，但是访问是被禁止的。",404:"发出的请求针对的是不存在的记录，服务器没有进行操作。",406:"请求的格式不可得。",410:"请求的资源被永久删除，且不会再得到的。",422:"当创建一个对象时，发生一个验证错误。",500:"服务器发生错误，请检查服务器。",502:"网关错误。",503:"服务不可用，服务器暂时过载或维护。",504:"网关超时。"},J=t=>{if(t.request.options.responseType==="blob")return t;const{response:s}=t;if(s&&s.status){const o=k[s.status]||s.statusText,{status:n,url:r}=s;let a=r;r.indexOf("?")!==-1&&(a=r.substring(0,r.indexOf("?"))),m.error(`请求错误 [${n}]: ${a}${o}`)}else s||m.error("您的网络发生异常，无法连接服务器");return s},c=G({errorHandler:J,credentials:"include"});c.interceptors.response.use(async(t,s)=>{if(s.responseType==="blob")return t;const{status:o}=t;return o===500&&m.error({content:"网络错误"}),t});const Q=async t=>await new Promise(s=>{setTimeout(()=>{s(!0)},t)}),X=({width:t})=>e.jsxs(F,{title:"设置模式",layout:"horizontal",labelCol:{span:8},request:async()=>{const s=await c.get("/api/conf_info/");if(s.code===1e3)return s.data},width:t,trigger:e.jsx("a",{className:"mx-2",children:" 系统设置 "}),onFinish:async s=>{(await c.post("/api/update_conf/",{data:s})).code===1e3?m.success("修改成功, 稍后生效！"):m.error("修改失败，请稍后再试")},submitter:{render(s,o){return e.jsx("div",{className:" flex gap-x-2 justify-center w-full ",children:o})}},children:[e.jsx(y,{name:"video_type",label:"下行流量类型",tooltip:"下行基本都是省外业务，只是业务不同",options:[{label:"抖音快手视频",value:"data"},{label:"抖音直播",value:"dlive"},{label:"快手直播",value:"klive"}],width:"md"}),e.jsx(L,{name:["video_type"],children:({video_type:s},o)=>{const n=s==="data";return n&&o.getFieldValue("video_thread")>6&&o.setFieldsValue({video_thread:6}),e.jsx(y,{name:"video_thread",label:`${n?"同时下载线程":"同时直播线程"}`,tooltip:"同时进行几个下载，越多越快",width:"md",options:new Array(n?10:20).fill(0).map((r,a)=>({label:a+1+" 个线程",value:a+1}))})}}),e.jsx(g,{name:"max_flow",label:"当天最大流量",tooltip:"当天下载的最大流量(GB)",allowClear:!1,fieldProps:{addonAfter:"GB/天"},width:"md"}),e.jsx(g,{name:"max_mb",label:"线程最大速度",allowClear:!1,fieldProps:{addonAfter:"MB/秒"},tooltip:"每个线程下载时的最大速度(MB/s)",width:"md"})]}),Z=t=>{if(t){const s=(t==null?void 0:t.split(/\ /g))||[0,"KB"];return e.jsx(V,{end:s[0],suffix:s[1],separator:",",decimals:2})}return"0KB"},ee=()=>{var h;const[t,s]=l.useState(),[o,n]=l.useState(1920),[r,a]=l.useState([]),d=async()=>{const i=await c.get("/api/system_status");i.code===1e3&&s(i.data)};l.useEffect(()=>{d()},[]);const w=(h=r==null?void 0:r[0])==null?void 0:h.rx,P=[{title:"日期",dataIndex:"day"},{title:"下载",dataIndex:"rx"},{title:"平均速率",tooltip:"下载速率统计可能不准确，仅供参考",dataIndex:"avg"}],C=r==null?void 0:r.reduce((i,_)=>{var j;return i+Number((j=_.rx.match(/\d+\.\d+/g))==null?void 0:j[0])},0);return e.jsx("div",{children:e.jsx(E,{onResize:i=>{n(i.width)},children:e.jsxs(u,{title:"数据概览",extra:e.jsxs(e.Fragment,{children:[e.jsx(X,{width:o>1e3?800:"md"}),o>1280&&b().format("YYYY-MM-DD HH:mm:ss")]}),split:o<1280?"horizontal":"vertical",headerBordered:!0,bordered:!0,children:[e.jsxs(u,{split:"horizontal",children:[e.jsxs(u,{split:"horizontal",children:[e.jsxs(u,{split:o<596?"horizontal":"vertical",children:[e.jsx(p,{statistic:{title:"今日下载",value:w,precision:3,formatter:Z}}),e.jsx(p,{statistic:{title:"近30日流量",value:C,suffix:"GB",precision:2}})]}),e.jsxs(u,{split:"vertical",children:[e.jsx(p,{statistic:{title:"内存占用",value:(t==null?void 0:t.memory_used_percent)||0,precision:2,suffix:"%"}}),e.jsx(p,{statistic:{title:"CPU占用",value:`${(t==null?void 0:t.cpu_percent)||0}`,suffix:"%",precision:2}})]})]}),e.jsx(B,{headerTitle:"近30日流量",options:o<596?!1:{density:!0,fullScreen:!0,reload:!0},tooltip:"数据更新有延迟，仅供参考",request:async()=>{const i=await c.get("/api/month_info");return i.code===1e3?(a(i.data),{data:i.data,success:!0}):{data:[],success:!1}},search:!1,columns:P,pagination:{hideOnSinglePage:!0,defaultPageSize:7}})]}),e.jsx(p,{title:"流量走势",extra:!1,chart:e.jsx(te,{})})]})},"resize-observer")})},te=()=>{const[t,s]=l.useState([]);l.useEffect(()=>{const n=async()=>{const r=await c.get("/api/network_speed");r.code===1e3&&(s(a=>[...a,{label:b().format("HH:mm:ss"),value:Number(r.data)}]),await Q(2e3),n())};n()},[]);const o={data:t||[],xField:"label",yField:"value",yAxis:{label:{formatter:n=>`${n}MB`}},tooltip:{title:"下载速度",formatter:n=>({name:n.label,value:n.value})},color:["#1979C9","#D62A0D","#FAA219"],smooth:!0,animation:!1};return e.jsx(Y,{...o})};function se({to:t}){let s=I();return l.useEffect(()=>{s(t)}),null}const re=t=>e.jsx(l.Suspense,{children:t});function oe(){return l.useEffect(()=>{var t;(t=document.querySelector("#index-loading"))==null||t.remove()},[]),e.jsx(H,{children:e.jsxs(f,{path:"/",element:e.jsx(W,{}),children:[e.jsx(f,{path:"NotFound",element:e.jsx(U,{})}),e.jsx(f,{index:!0,element:re(e.jsx(ee,{}))}),e.jsx(f,{path:"*",element:e.jsx(se,{to:"NotFound"})})]})})}x.createRoot(document.getElementById("root")).render(e.jsx(q,{children:e.jsx(oe,{})}));
