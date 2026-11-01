# RSSD Examples

RSSD 的本地主题与模块演示。用同一份虚构内容，通过真实发布引擎渲染不同主题与版式，方便检查文章、公式、图片、日历和展示模块。

**项目玩法、资源、写作流程和十个线上 Demo，统一见 [RSSD 主仓](https://github.com/scholay-rssd/rssd)。**

## 在组合工作区预览

本仓库位于主工作区的 `web/demo/`。在 RSSD 根目录运行：

```sh
npm run demo:build                 # 所有变体 → .local/demo/
npm run demo:build -- demo-docs    # 单个变体
npm run demo:preview               # 构建并打开本地预览服务
```

目录入口为 `http://127.0.0.1:4174/`，各变体使用 4175 起的独立本地端口。学术变体保留其渲染器的 canonical 地址，页面仍在本地提供。示例图片由程序生成，本演示用于本地检查，不执行部署。

## 维护与独立构建

`fixtures.mjs` 保存素材，`variants.mjs` 定义主题变体，`catalogue.mjs` 登记结构与展示页面；新增可复用结构时同步更新目录。

使用 Node.js 24+，在本仓库运行 `npm run build`，按 `compatibility.json` 固定的公开核心版本在 `.local/` 组装并生成产物，无需私有仓库或账号。
