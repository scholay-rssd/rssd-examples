import {escapeHtml as esc} from '../modules/shared.mjs';

// The long-term catalogue of structures the Demo covers. Each entry names the
// page that shows it; add an entry whenever a Theme gains a reusable structure.
export const DEMO_STRUCTURES=Object.freeze([
  // Article atoms (Markdown → shared public renderer)
  {group:'文章原子',id:'headings',name:'多级标题 H2–H4',route:'/news/atoms-typography/'},
  {group:'文章原子',id:'inline',name:'加粗、强调、删除线、行内代码、链接与裸链接',route:'/news/atoms-typography/'},
  {group:'文章原子',id:'lists',name:'有序、无序与嵌套列表',route:'/news/atoms-typography/'},
  {group:'文章原子',id:'quote',name:'引用块与题记',route:'/news/atoms-typography/'},
  {group:'文章原子',id:'code',name:'代码块（不解析公式与 HTML）',route:'/news/atoms-typography/'},
  {group:'文章原子',id:'table',name:'对齐表格',route:'/news/atoms-typography/'},
  {group:'文章原子',id:'long-url',name:'长链接断行',route:'/news/atoms-typography/'},
  {group:'文章原子',id:'figure',name:'配图与图注、图片来源',route:'/news/atoms-figures/'},
  {group:'文章原子',id:'image-row',name:'同段多图',route:'/news/atoms-figures/'},
  {group:'文章原子',id:'math',name:'行内/独立公式、括号定界与容错',route:'/news/atoms-math/'},
  {group:'文章原子',id:'endnotes',name:'参考文献与品牌说明合并为尾注',route:'/news/atoms-endnotes/'},
  {group:'文章原子',id:'sources',name:'来源列表',route:'/news/atoms-endnotes/'},
  {group:'文章原子',id:'callout',name:'提示块 [!NOTE] / [!TIP] / [!IMPORTANT] / [!WARNING] / [!CAUTION]',route:'/news/atoms-callouts/'},
  {group:'文章原子',id:'article-view',name:'文章内路线图视图（scholay-view）',route:'/news/roadmap-active/'},
  // Reusable page structures (web/themes/structures.mjs), by origin site
  {group:'页面结构',id:'toc',name:'本页目录（lingxi · Starlight）',route:'/news/atoms-callouts/'},
  {group:'页面结构',id:'neighbors',name:'上一篇 / 下一篇（lingxi · Starlight）',route:'/news/atoms-figures/'},
  {group:'页面结构',id:'byline',name:'署名栏：栏目、发布、作者、阅读时长（metho · Distill）',route:'/news/atoms-math/'},
  {group:'页面结构',id:'wide-figures',name:'宽幅配图（metho · Distill）',route:'/news/atoms-figures/'},
  {group:'页面结构',id:'appendix',name:'附录区：来源与参考文献（metho · Distill）',route:'/news/atoms-endnotes/'},
  {group:'页面结构',id:'fact-sheet',name:'要素卡：要旨、栏目、日期、标签、原始来源（legis · CourtListener）',route:'/news/atoms-typography/'},
  {group:'页面结构',id:'citations',name:'引用来源：编号与来源网站（legis · CourtListener）',route:'/news/atoms-endnotes/'},
  {group:'页面结构',id:'infobox',name:'信息框（pets · MediaWiki）',route:'/news/atoms-figures/'},
  {group:'页面结构',id:'see-also',name:'参见：共同标签与栏目（pets · MediaWiki）',route:'/news/atoms-typography/'},
  {group:'页面结构',id:'epigraph',name:'题记：开篇引用与“——”出处（xsiching · Tufte CSS）',route:'/news/atoms-typography/'},
  {group:'页面结构',id:'title-seal',name:'题签：宽屏竖排标题（xsiching · Tufte CSS）',route:'/news/atoms-typography/'},
  {group:'页面结构',id:'link-directory',name:'首页分类导航：栏目标签与链接卡片（enter · WebStack）',route:'/'},
  {group:'页面结构',id:'source-action',name:'访问官网按钮（enter · WebStack）',record:'openSource:https://github.com/KaTeX/KaTeX'},
  {group:'页面结构',id:'post-meta',name:'文章信息行：日期、阅读时长、#标签（personal · AstroPaper）',route:'/news/atoms-typography/'},
  {group:'页面结构',id:'reading-progress',name:'阅读进度条（personal · AstroPaper）',route:'/news/cover-story/'},
  {group:'页面结构',id:'image-rows',name:'图组：等高多图与共用图注（piggytuck · Hugo Theme Gallery）',route:'/news/atoms-figures/'},
  {group:'页面结构',id:'contents',name:'文首目录（scholay-today · al-folio）',route:'/news/atoms-typography/'},
  {group:'页面结构',id:'tables',name:'数据表格：滚动区域、表头吸顶、隔行底色（study · Just the Docs）',route:'/news/atoms-leaderboard/'},
  // Structured records
  {group:'结构化记录',id:'scheduled',name:'跨年日程',record:'year:demo-winter-school'},
  {group:'结构化记录',id:'annual',name:'每年惯例（闰日）',route:'/calendar/'},
  {group:'结构化记录',id:'history',name:'历史上的今天',record:'history:demo-www'},
  {group:'结构化记录',id:'open-source',name:'开源资源记录',record:'openSource:https://github.com/KaTeX/KaTeX'},
  // Display modules
  {group:'展示模块',id:'calendar',name:'日历',route:'/calendar/'},
  {group:'展示模块',id:'gallery',name:'图片栅格',route:'/gallery/'},
  {group:'展示模块',id:'graph',name:'知识关系图',route:'/graph/'},
  {group:'展示模块',id:'showcase',name:'橱窗',route:'/showcase/'},
  {group:'展示模块',id:'roadmap',name:'路线图',route:'/roadmap/'},
  // Standing pages and site shell
  {group:'常设页面',id:'home',name:'首页（引擎首页或自带首页）',route:'/'},
  {group:'常设页面',id:'feed',name:'阅读目录、栏目筛选与分页',route:'/archive/'},
  {group:'常设页面',id:'section',name:'栏目页',route:'/archive/typesetting/'},
  {group:'常设页面',id:'hub',name:'项目常设页与关联文章',route:'/projects/rssd-demo/'},
  {group:'常设页面',id:'journal',name:'旧阅读目录别名',route:'/journal/'},
  {group:'语言',id:'english',name:'英文版文章与语言切换',route:'/en/news/atoms-typography/'},
  {group:'语言',id:'english-home',name:'英文首页',route:'/en/'},
]);

export function demoCatalogue(builds){
  const groups=[...new Set(DEMO_STRUCTURES.map(s=>s.group))];
  const variants=builds.map(b=>`<li><a href="${esc(b.variant.preview)}/"><strong>${esc(b.variant.label)}</strong></a><span>${esc(b.variant.note)}</span><code>${esc(b.theme.id)}</code></li>`).join('');
  const route=(s,b)=>s.route||b.routes[s.record];
  const link=(s,b)=>!b.pages.has(route(s,b))?`<span class="missing" title="${esc(b.variant.label)} 不提供此页面">${esc(b.variant.id.replace(/^demo-/,''))} —</span>`:`<a href="${esc(b.variant.preview+route(s,b))}" title="${esc(b.variant.label)}">${esc(b.variant.id.replace(/^demo-/,''))}</a>`;
  const rows=groups.map(g=>`<h2>${esc(g)}</h2><table><thead><tr><th>结构</th><th>在各主题中查看</th></tr></thead><tbody>${DEMO_STRUCTURES.filter(s=>s.group===g).map(s=>`<tr><td>${esc(s.name)}<br><code>${esc(route(s,builds[0]))}</code></td><td>${builds.map(b=>link(s,b)).join(' ')}</td></tr>`).join('')}</tbody></table>`).join('');
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>RSSD 演示站 · 结构目录</title><style>:root{color-scheme:light dark;--ink:light-dark(#222,#e6e6e6);--muted:light-dark(#666,#a0a0a0);--line:light-dark(#ddd,#3a3a3a)}body{margin:0 auto;max-width:1040px;padding:40px 20px;font:15px/1.7 system-ui,"PingFang SC",sans-serif;color:var(--ink);background:light-dark(#fcfbf8,#1c1f20)}h1{font-size:32px;margin:0 0 8px}p{color:var(--muted)}ul{padding:0;list-style:none;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px}li{border:1px solid var(--line);border-radius:6px;padding:14px;display:grid;gap:4px}li span{color:var(--muted);font-size:13px}code{font-size:12px;color:var(--muted)}table{width:100%;border-collapse:collapse;margin-bottom:24px}th,td{text-align:left;vertical-align:top;padding:8px;border-bottom:1px solid var(--line)}td .missing{color:var(--muted);margin:0 8px 4px 0;display:inline-block}td a{display:inline-block;margin:0 8px 4px 0;color:#2b6e52}</style></head><body><h1>RSSD 演示站</h1><p>同一份固定内容经共享渲染器、主题注册表与全部展示模块生成，每个主题一份。用于审阅主题与模块改动，从不部署。</p><ul>${variants}</ul>${rows}</body></html>`;
}
