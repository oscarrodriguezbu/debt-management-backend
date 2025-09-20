import{c as o,u as h,a as c,j as e,C as m,L as u,b,B as g,r as p,O as f}from"./index-CPA_mJPF.js";/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],y=o("chevron-left",j);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],N=o("chevron-right",v);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],w=o("file-text",k);/**
 * @license lucide-react v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],L=o("settings",C),_=({isCollapsed:s,onToggle:a})=>{const{pathname:n}=h(),{user:r}=c(),i=[{icon:w,label:"My Debts",to:"/debts"},{icon:L,label:"Create Debt",to:"/debts/create"}],l=t=>n.includes("/debts/create/")&&t==="/debts/create"?!0:n===t;return e.jsxs("div",{className:`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out  ${s?"w-18":"w-64"} flex flex-col`,children:[e.jsxs("div",{className:"p-4 border-b border-gray-200 flex items-center justify-between h-18",children:[!s&&e.jsx(m,{}),e.jsx("button",{onClick:a,className:"p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer",children:s?e.jsx(N,{size:20}):e.jsx(y,{size:20})})]}),e.jsx("nav",{className:"flex-1 p-4",children:e.jsx("ul",{className:"space-y-2",children:i.map((t,d)=>{const x=t.icon;return e.jsx("li",{children:e.jsxs(u,{to:t.to||"/debts",className:`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group ${l(t.to||"/xxxx")?"bg-red-50 text-red-600 border-r-2 border-red-600":"text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`,children:[e.jsx(x,{size:20,className:"flex-shrink-0"}),!s&&e.jsx("span",{className:"font-medium",children:t.label})]})},d)})})}),!s&&e.jsx("div",{className:"p-4 border-t border-gray-200",children:e.jsx("div",{className:"flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer",children:e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("p",{className:"text-sm font-medium text-gray-900 truncate",children:r==null?void 0:r.name}),e.jsx("p",{className:"text-xs text-gray-500 truncate",children:r==null?void 0:r.email})]})})})]})},z=()=>{const{user:s,logout:a}=c(),n=b();return e.jsx("header",{className:"bg-white border-b border-gray-200 px-6 py-4 h-18",children:e.jsxs("div",{className:"flex items-center justify-end space-x-4",children:[e.jsx(g,{onClick:()=>{a(),n.clear()},variant:"outline",size:"sm",className:"cursor-pointer ml-2",children:"Logout"}),e.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow",children:s==null?void 0:s.name.substring(0,2)})]})})},D=()=>{const[s,a]=p.useState(!1);return e.jsxs("div",{className:"min-h-screen bg-gray-50 flex",children:[e.jsx(_,{isCollapsed:s,onToggle:()=>a(!s)}),e.jsxs("div",{className:"flex-1 flex flex-col",children:[e.jsx(z,{}),e.jsx("main",{className:"flex-1 p-6",children:e.jsx(f,{})})]})]})};export{D as default};
