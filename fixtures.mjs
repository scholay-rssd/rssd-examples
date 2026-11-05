import {fixtureAsset} from './images.mjs';
import {sourceContentSha256} from '../../contracts/language-editions.mjs';
import {bodyHash} from '../engine/knowledge-graph.mjs';

// Fixture content for the RSSD Demo. Every article atom the public renderer
// supports appears at least once, so a Theme or module change can be reviewed
// against one stable publication. Nothing here is real editorial content.
export const DEMO_COLUMNS=['演示动态','排版样张','开源资源','演示日程','演示历史'];
const author='RSSD 演示编辑部';
const sources={
  markdown:{label:'markdown-it',url:'https://github.com/markdown-it/markdown-it'},
  katex:{label:'KaTeX',url:'https://github.com/KaTeX/KaTeX'},
  rssd:{label:'RSSD 主题目录',url:'https://github.com/scholay-rssd/rssd'},
};
const art=[
  {from:'#2b6e52',to:'#f4efe3',bands:0},{from:'#3949ac',to:'#eceaf8',bands:6},
  {from:'#855434',to:'#f6eadc',bands:3},{from:'#46596e',to:'#eef1f4',bands:9},
  {from:'#8a4437',to:'#f3e6df',bands:4},{from:'#536247',to:'#edf0e6',bands:2},
].map(o=>fixtureAsset({width:640,height:400,...o}));
const square=fixtureAsset({width:400,height:400,from:'#316b5c',to:'#f6f4ec',bands:5});

export function demoSnapshot(site){
  const [cover,figure,second,third,fourth,fifth]=art;
  const typography={id:'atoms-typography',title:'排版样张：标题、段落、列表与表格',category:DEMO_COLUMNS[1],date:'2026-10-20',author,
    summary:'一篇文章里同时出现多级标题、行内格式、列表、引用、代码、表格与长链接，用于检查主题的基础排版。',
    sources:[sources.markdown,sources.rssd],assets:[],
    markdown:`# 排版样张：标题、段落、列表与表格

> 好的版式让读者忘记版式。
>
> —— 排版样张的题记

正文段落混合中文与 English words，包含**加粗**、*强调*、~~删除线~~、\`行内代码\` 与[一个普通链接](https://github.com/markdown-it/markdown-it)。裸链接也会被识别：https://github.com/scholay-rssd/rssd 。

## 二级标题：列表

- 无序列表第一项
- 第二项包含一个嵌套列表
  - 嵌套项 A
  - 嵌套项 B
- 第三项

1. 有序列表第一步
2. 第二步
3. 第三步

## 二级标题：引用与分隔

> 引用块用于摘录原文。它可以包含**格式**与 \`代码\`。

---

### 三级标题：代码

\`\`\`js
// 代码块保持原样，不解析其中的 $公式$ 或 <html>。
export const greet=name=>\`你好，\${name}\`;
\`\`\`

\`\`\`python
def mean(xs):
    return sum(xs) / len(xs)
\`\`\`

### 三级标题：表格

| 模块 | 路由 | 默认启用 | 说明 |
| :--- | :--- | :---: | ---: |
| 日历 | /calendar/ | 是 | 年度惯例与历史上的今天 |
| 图片栅格 | /gallery/ | 否 | 汇集文章与作品配图 |
| 知识关系图 | /graph/ | 否 | 只展示经过审阅的关系 |
| 橱窗 | /showcase/ | 否 | 卡片式内容入口 |
| 路线图 | /roadmap/ | 否 | 按状态汇总项目进展 |

#### 四级标题：长内容

一个很长、没有空格的链接不应撑破版面：https://example.org/a/very/long/path/that/keeps/going/and/going/without/any/natural/break/point/at/all/index.html

最后一段普通正文，用来确认段落间距与行高。
`};
  const figures={id:'atoms-figures',title:'图片、图注与图组',category:DEMO_COLUMNS[1],date:'2026-10-19',author,
    summary:'检查单张配图、带说明的图注、图片来源标注，以及同一段落中的多张图片。',
    sources:[sources.markdown],assets:[cover,figure,second,third,fourth].map(({path,data})=>({path,data})),
    markdown:`# 图片、图注与图组

单张配图后紧跟以“图：”开头的段落时，该段落被识别为图注。

![绿色渐变的示意图](${cover.path})

图：一张由构建脚本生成的示意图，用于检查图注字号与间距。

![蓝色条纹示意图](${figure.path})

图片来源：RSSD 演示站生成，CC BY 4.0。

普通段落紧跟在图片之后，但不是图注，因此保持正文样式。

![棕色条纹](${second.path}) ![灰蓝条纹](${third.path}) ![红棕条纹](${fourth.path})

图：同一段落中的三张图片组成一组。

## 图片之后的正文

知识关系图会引用这一段：图注与图片一起构成一个不可拆分的图像单元。
`};
  const math={id:'atoms-math',title:'公式：行内、独立与容错',category:DEMO_COLUMNS[1],date:'2026-10-18',author,
    summary:'行内公式、独立公式、括号定界、货币符号与无法排版公式的保留原式。',sources:[sources.katex],assets:[],
    markdown:`# 公式：行内、独立与容错

行内公式 $E=mc^2$ 与 \\(a^2+b^2=c^2\\) 嵌在正文中。价格写作 5 美元或 \`$5\` 时不会被误认为公式。

独立公式：

$$
\\bar{x}=\\frac{1}{n}\\sum_{i=1}^{n}x_i,\\qquad s^2=\\frac{1}{n-1}\\sum_{i=1}^{n}(x_i-\\bar{x})^2
$$

\\[
P(A\\mid B)=\\frac{P(B\\mid A)\\,P(A)}{P(B)}
\\]

无法排版的公式会保留原式：$\\frac{1}{$。

| 符号 | 含义 |
| --- | --- |
| $\\mu$ | 总体均值 |
| $\\sigma^2$ | 总体方差 |
`};
  const endnotes={id:'atoms-endnotes',title:'尾注、参考文献与品牌说明',category:DEMO_COLUMNS[1],date:'2026-10-17',author,
    summary:'正文末尾的参考文献与品牌说明会合并为文章尾注，与正文分开排版。',sources:[sources.markdown,sources.katex],assets:[],
    markdown:`# 尾注、参考文献与品牌说明

正文引用资料时，公开渲染器把文末“参考文献”列表与品牌说明合并为尾注，独立于正文排版。

## 参考文献

1. markdown-it 项目文档：https://github.com/markdown-it/markdown-it
2. KaTeX 项目文档：https://github.com/KaTeX/KaTeX

[${site.name}](${site.origin}/)
`};
  const cases=[
    {id:'roadmap-released',title:'路线图：演示站首次发布',state:'released',date:'2026-10-10',targetDate:'2026-10-10',platforms:['网页']},
    {id:'roadmap-active',title:'路线图：结构目录持续扩展',state:'active',date:'2026-10-21',targetDate:'2026-12-31',platforms:['网页','桌面']},
    {id:'roadmap-planned',title:'路线图：更多语言版本',state:'planned',date:'2026-10-15',platforms:['网页']},
  ].map(r=>({id:r.id,title:r.title,category:DEMO_COLUMNS[0],date:r.date,author,summary:'路线图卡片读取文章内声明的状态、目标日期与平台。',sources:[sources.rssd],assets:[],
    markdown:`# ${r.title}\n\n这篇文章携带一个路线图视图，状态为“${r.state}”。视图配置本身不会显示为代码。\n\n\`\`\`scholay-view\n${JSON.stringify({version:1,roadmap:{state:r.state,sourceUrl:'https://github.com/scholay-rssd/rssd',...(r.targetDate?{targetDate:r.targetDate}:{}),platforms:r.platforms}})}\n\`\`\`\n\n进展说明写在正文里。\n`}));
  const coverStory={id:'cover-story',title:'带封面的长文：首页卡片与图片栅格',category:DEMO_COLUMNS[0],date:'2026-10-22',author,
    summary:'第一张图片成为首页卡片封面，并进入图片栅格与橱窗。',sources:[sources.rssd],assets:[fifth,square].map(({path,data})=>({path,data})),
    markdown:`# 带封面的长文：首页卡片与图片栅格\n\n![封面：橄榄绿条纹](${fifth.path})\n\n图：文章第一张图片会成为卡片封面。\n\n${Array.from({length:4},(_,i)=>`## 第 ${i+1} 节\n\n这是用于检查长文阅读节奏的段落。每一节都有标题，便于目录、阅读进度与上下篇导航等结构使用。`).join('\n\n')}\n\n![方形示意图](${square.path})\n`};
  const brief={id:'short-note',title:'一句话短讯',category:DEMO_COLUMNS[0],date:'2026-10-16',author,summary:'最短的文章，只有一段正文。',sources:[],assets:[],markdown:'# 一句话短讯\n\n短文章同样需要完整的页面结构。\n'};
  const callouts={id:'atoms-callouts',title:'提示块：说明、提示、重要、注意与警告',category:DEMO_COLUMNS[1],date:'2026-10-21',author,
    summary:'以 [!NOTE] 等标记开头的引用块渲染为提示块；其他引用保持原样。',sources:[sources.markdown],assets:[],
    markdown:`# 提示块：说明、提示、重要、注意与警告

## 五种提示块

> [!NOTE]
> 说明：补充背景，不影响主线阅读。

> [!TIP]
> 提示：更省力的做法，可以包含 **格式**、\`代码\` 与公式 $a+b$。

> [!IMPORTANT]
> 重要：读者必须知道的信息。

> [!WARNING] 升级前请备份
> 注意：可以在标记后写自定义标题。

> [!CAUTION]
> 警告：可能造成数据丢失的操作。
>
> 提示块内可以有多个段落。

## 普通引用不受影响

> 这仍是一段普通引用，即使其中出现 [!NOTE] 字样。

### 三级标题也进入目录

目录只收录二级与三级标题。
`};
  const leaderboard={id:'atoms-leaderboard',title:'数据表格：一张宽排行榜',category:DEMO_COLUMNS[1],date:'2026-10-14',author,
    summary:'列数多、需要横向滚动的数据表格，检查表头吸顶、隔行底色、数字对齐与公式单元格。',sources:[sources.rssd],assets:[],
    markdown:`# 数据表格：一张宽排行榜\n\n> [!NOTE]\n> 表中数据为演示虚构，不代表任何真实评测。\n\n| 排名 | 名称 | 类型 | 得分 | 置信区间 | 参数量 | 上下文 | 许可 | 更新 |\n| ---: | :--- | :--- | ---: | :---: | ---: | ---: | :--- | :--- |\n${Array.from({length:12},(_,i)=>`| ${i+1} | 演示条目 ${String.fromCharCode(65+i)} | ${i%2?'开源':'闭源'} | ${(92.4-i*1.7).toFixed(1)} | ±${(0.4+i*.1).toFixed(1)} | ${(70-i*5)}B | ${128-i*8}K | ${i%3?'MIT':'Apache-2.0'} | 2026-10-${String(20-i).padStart(2,'0')} |`).join('\n')}\n\n得分 $s=\\frac{1}{k}\\sum_j s_j$ 为各项平均。\n`};
  const news=[typography,figures,math,endnotes,callouts,leaderboard,...cases,coverStory,brief];
  const english={id:'atoms-typography-en',locale:'en',translationOf:{articleId:typography.id,sha256:sourceContentSha256(typography)},title:'Specimen: headings, paragraphs, lists and tables',
    summary:'The English edition of the typography specimen, rendered by the same Theme shell.',date:typography.date,author:'RSSD Demo Desk',category:DEMO_COLUMNS[1],assets:[],
    markdown:`# Specimen: headings, paragraphs, lists and tables\n\nThis English edition links back to its Chinese source. It contains **bold**, *emphasis* and \`inline code\`.\n\n## Lists\n\n- First item\n- Second item\n\n## Formula\n\nInline $e^{i\\pi}+1=0$ and a display formula:\n\n$$\\int_0^1 x\\,dx=\\tfrac12$$\n\n| Module | Route |\n| --- | --- |\n| Calendar | /calendar/ |\n| Roadmap | /roadmap/ |\n`};
  const year=[
    {id:'demo-winter-school',title:'跨年冬季学校（跨越年末的日程）',start:'2026-12-30',end:'2027-01-02',summary:'检查跨年的日期区间在日历中的呈现。',category:'演示活动',sourceUrl:'https://github.com/scholay-rssd/rssd',sourceName:'RSSD',provenance:'已核验',sources:[sources.rssd]},
    {id:'demo-leap-day',title:'闰日纪念（每年惯例）',start:'2028-02-29',recurrence:{frequency:'yearly',monthDay:'02-29',leapDay:'feb28'},summary:'非闰年在 2 月 28 日显示。',category:'纪念日',sourceUrl:'https://github.com/scholay-rssd/rssd',sourceName:'RSSD',provenance:'已核验',sources:[sources.rssd]},
    {id:'demo-notice',title:'仅有发布日期的通知',start:'2026-11-01',dateBasis:'发布日期（事件日期未核实）',summary:'事件日期未核实时，日历只按发布日期收录。',category:'通知',sourceUrl:'https://github.com/scholay-rssd/rssd',sourceName:'RSSD',provenance:'已核验',sources:[sources.rssd]},
  ];
  const history=[
    {id:'demo-gutenberg',title:'活字印刷的传播（历史上的今天）',year:1455,dateKey:'02-23',summary:'历史记录保留真实发生的年份。',historicalSignificance:'用于检查“历史上的今天”视图与年份显示。',sourceUrl:'https://github.com/scholay-rssd/rssd',sourceName:'RSSD',provenance:'已核验',sources:[sources.rssd]},
    {id:'demo-www',title:'第一个网站上线',year:1991,dateKey:'08-06',summary:'另一条历史记录，用于日历的历史模式。',historicalSignificance:'检查同一视图中多条历史记录的排序。',sourceUrl:'https://github.com/scholay-rssd/rssd',sourceName:'RSSD',provenance:'已核验',sources:[sources.rssd]},
  ];
  const openSource=[
    {url:'https://github.com/markdown-it/markdown-it',title:'markdown-it',date:'2026-10-12',summary:'公开渲染器使用的 Markdown 解析器。',value:'资源记录展示开源项目的名称、摘要与原始入口。',category:'开放资源',sourceName:'GitHub'},
    {url:'https://github.com/KaTeX/KaTeX',title:'KaTeX',date:'2026-10-11',summary:'发布时预排版公式，访客只需要样式与字体。',value:'检查资源卡片与来源链接。',category:'开放资源',sourceName:'GitHub'},
  ];
  return {news:[...news,english],data:{year,history},openSource:{items:openSource},permalinks:{[`news:${english.id}`]:`/en/news/${typography.id}/`}};
}

export function demoOrganization(site){
  return {version:1,siteId:site.id,
    sections:[
      {id:'typesetting',name:'排版样张',description:'每一种文章原子：标题、图注、公式、代码、表格与尾注。',includes:['column-2']},
      {id:'updates',name:'动态与路线',description:'带封面的长文、短讯与路线图文章。',includes:['column-1','column-4','column-5']},
      {id:'resources',name:'开源资源',description:'结构化资源记录与原始入口。',includes:['column-3']},
    ],
    hubs:[{id:'rssd-demo',name:'RSSD 演示项目',sectionId:'updates',route:'/projects/rssd-demo/',summary:'演示站本身的项目页：常设页面汇集与它关联的文章。',links:[{label:'全部文章',url:'/archive/'},{label:'源代码',url:'https://github.com/scholay-rssd/rssd'}]}],
    bindings:[
      {recordId:'news:atoms-typography',sectionId:'typesetting',tags:['排版','标题','表格'],related:[{id:'rssd-demo',role:'tutorial'}]},
      {recordId:'news:atoms-figures',sectionId:'typesetting',tags:['图片','图注'],related:[{id:'rssd-demo',role:'note'}]},
      {recordId:'news:roadmap-active',sectionId:'updates',tags:['路线图'],related:[{id:'rssd-demo',role:'update'}]},
      {recordId:'news:cover-story',sectionId:'updates',tags:['封面','长文'],related:[{id:'rssd-demo',role:'reflection'}]},
    ]};
}

// Curated relations need exact evidence anchors, so they are bound to the
// adapted records' body hashes at build time.
export function demoKnowledge(content){
  const record=id=>content.records.find(r=>r.id===id);
  const anchor=(id,quote,sourceUrl)=>{const r=record(id);if(!r?.bodyMarkdown.includes(quote))throw Error('Demo knowledge quote missing: '+id);return {recordId:id,bodySha256:bodyHash(r.bodyMarkdown),quote,sourceUrl};};
  const figure=anchor('news:atoms-figures','图注与图片一起构成一个不可拆分的图像单元','https://github.com/markdown-it/markdown-it');
  const math=anchor('news:atoms-math','行内公式','https://github.com/KaTeX/KaTeX');
  const typography=anchor('news:atoms-typography','引用块用于摘录原文','https://github.com/markdown-it/markdown-it');
  return {version:1,siteId:content.siteId,
    nodes:[
      {id:'atom:figure',label:'图片',kind:'atom',evidence:[figure]},
      {id:'atom:caption',label:'图注',kind:'atom',evidence:[figure]},
      {id:'atom:math',label:'公式',kind:'atom',evidence:[math]},
      {id:'atom:quote',label:'引用',kind:'atom',evidence:[typography]},
    ],
    relations:[
      {id:'rel:figure-caption',from:'atom:caption',to:'atom:figure',kind:'describes',label:'说明',statement:'图注与图片一起构成一个不可拆分的图像单元。',scope:'RSSD 演示站的文章原子。',attribution:'source-statement',reviewedBy:'RSSD 演示编辑部',reviewedAt:'2026-10-20',evidence:[figure]},
      {id:'rel:math-quote',from:'atom:math',to:'atom:quote',kind:'appears-with',label:'同属正文原子',statement:'公式与引用都嵌在正文流中。',scope:'RSSD 演示站的文章原子。',attribution:'source-statement',reviewedBy:'RSSD 演示编辑部',reviewedAt:'2026-10-20',evidence:[math,typography]},
    ]};
}
