import {DEMO_COLUMNS} from './fixtures.mjs';

// One fixture site rendered once per Theme and journal style. Each variant is
// a normal site profile, so it goes through the same registry and renderer as
// the ten production sites; only its id, Theme and local origin differ.
export const DEMO_PORT=4174;
export const DEMO_VARIANTS=Object.freeze([
  {id:'demo-papermod',themeId:'journal',label:'Journal · PaperMod',note:'学习类站点（study）使用的样式'},
  {id:'demo-archie',themeId:'journal',label:'Journal · Archie',note:'研究方法、学术之门使用的样式'},
  {id:'demo-xmin',themeId:'journal',label:'Journal · XMin',note:'智法、国学使用的样式'},
  {id:'demo-bear',themeId:'journal',label:'Journal · Bear',note:'默认日志样式'},
  {id:'demo-showcase',themeId:'journal',layout:'showcase',label:'Journal · 橱窗布局',note:'layout: showcase 的列表卡片'},
  {id:'demo-docs',themeId:'docs',label:'Docs',note:'犀术 IME 使用的文档主题'},
  {id:'demo-encyclopedia',themeId:'encyclopedia',label:'Encyclopedia',note:'小猪萌宠使用的百科主题'},
  {id:'demo-portfolio',themeId:'portfolio',label:'Portfolio',note:'小猪盖被使用的作品集主题（含自带首页）'},
  {id:'demo-personal',themeId:'personal',label:'Personal',note:'学术海使用的个人主题（含自带首页）'},
  // Each real site's own skin on the shared fixture content (see journal/skins/).
  ...['metho','enter','study','legis','xsiching','xsime','pets','personal'].map(site=>({id:'demo-skin-'+site,themeId:'journal',label:'Skin · '+site,note:site+' 的专属外观（journal/skins）'})),
  // The academic renderer is bound to its own origin; it is still served locally.
  {id:'demo-academic',themeId:'academic',origin:'https://today.scholay.com',label:'Academic',note:'今日学术使用的学术主题（含日历工作台）'},
].map((v,i)=>Object.freeze({...v,port:DEMO_PORT+1+i,preview:`http://127.0.0.1:${DEMO_PORT+1+i}`})));

export function demoSite(variant){
  return {version:1,id:variant.id,spaceId:'demo',name:'RSSD 演示站',domain:'主题与模块演示',
    origin:variant.origin||variant.preview,description:'覆盖每一种文章原子、展示模块与常设页面的主题测试站。',
    slogan:'一个站点，看遍所有结构',accent:'#2b6e52',homeMode:'engine',columns:[...DEMO_COLUMNS],
    yearCategories:['演示活动','纪念日','通知'],sourceCategories:['开放资源'],author:'RSSD 演示编辑部',timezone:'Asia/Shanghai',
    retainLocal:true,languages:['zh-CN','en'],themeId:variant.themeId,...(variant.layout?{layout:variant.layout}:{}),
    services:{guestbook:{enabled:false}},
    navigation:[
      {id:'home',label:'首页',href:'/',view:'home'},
      {id:'feed',label:'文章',href:'/archive/',view:'feed',match:['/archive/','/news/','/journal/','/project-notes/']},
      {id:'calendar',label:'日历',href:'/calendar/',view:'calendar',module:'calendar'},
      {id:'gallery',label:'图片',href:'/gallery/',view:'gallery',module:'gallery'},
      {id:'graph',label:'关系图',href:'/graph/',view:'graph',module:'graph'},
      {id:'showcase',label:'橱窗',href:'/showcase/',view:'showcase',module:'showcase'},
      {id:'roadmap',label:'路线图',href:'/roadmap/',view:'roadmap',module:'roadmap'},
      {id:'project',label:'项目页',href:'/projects/rssd-demo/',view:'projects'},
    ],
    display:{version:1,modules:{calendar:{enabled:true},gallery:{enabled:true,columns:3},graph:{enabled:true},showcase:{enabled:true},roadmap:{enabled:true}}}};
}
