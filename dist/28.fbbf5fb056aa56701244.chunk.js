webpackJsonp([28],{663:function(e,t,n){n(776);var o=n(34)(n(707),n(827),null,null);o.options.__file="D:\\dongwei\\code\\daily-coding-vue\\src\\views\\advanced-router\\argument-page.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] argument-page.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},707:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(55),i=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default={name:"argument-page",data:function(){var e=this;return{shoppingColumns:[{type:"index",title:"序号",width:60},{title:"购物单号",key:"shopping_id",align:"center"},{title:"购买物品名称",key:"name",align:"center"},{title:"购买时间",key:"time"},{title:"查看详情",key:"show_more",align:"center",render:function(t,n){return t("Button",{props:{type:"text",size:"small"},on:{click:function(){var t={shopping_id:n.row.shopping_id};i.default.openNewPage(e,"shopping",void 0,t),e.$router.push({name:"shopping",query:t})}}},"了解详情")}}],shoppingData:[{shopping_id:100001,name:"《vue.js实战》",time:"2017年11月12日"},{shopping_id:100002,name:"面包",time:"2017年11月5日"},{shopping_id:100003,name:"咖啡",time:"2017年11月8日"},{shopping_id:100004,name:"超级豪华土豪金牙签",time:"2017年11月9日"}]}}}},776:function(e,t){},827:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("Row",[n("Card",[n("p",{attrs:{slot:"title"},slot:"title"},[n("Icon",{attrs:{type:"ios-list"}}),e._v("\n                购物记录(传递参数)\n            ")],1),e._v(" "),n("Row",{staticClass:"advanced-router",attrs:{type:"flex",justify:"center",align:"middle"}},[n("Table",{staticStyle:{width:"100%"},attrs:{columns:e.shoppingColumns,data:e.shoppingData}})],1)],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});