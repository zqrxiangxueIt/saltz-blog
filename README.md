# saltz的思想漫步 — 博客技术文档

## 概览

| 项目 | 方案 |
|------|------|
| 框架 | [Hexo](https://hexo.io/) 8.x |
| 主题 | [Butterfly](https://butterfly.js.org/) 5.x |
| 部署 | [Cloudflare Pages](https://pages.cloudflare.com/) |
| 源码仓库 | [github.com/zqrxiangxueIt/saltz-blog](https://github.com/zqrxiangxueIt/saltz-blog) |
| 线上地址 | [saltz-blog.pages.dev](https://saltz-blog.pages.dev/) |
| 图床 | GitHub + jsDelivr CDN |
| 图片上传 | [PicGo](https://github.com/Molunerfinn/PicGo) |
| 数学公式 | 主题自带 MathJax（客户端渲染） |

## 本地环境

```bash
Node.js  v24.14.0
npm      11.9.0
Git      2.47.1
Windows  11
```

源码路径：`D:\blog\`

## 项目结构

```
D:\blog\
├── _config.yml              # Hexo 主配置
├── _config.butterfly.yml    # Butterfly 主题配置（核心）
├── source/
│   ├── _posts/              # 博文（Markdown）
│   ├── about/index.md       # 关于页面
│   └── css/custom.css       # 自定义样式
├── scaffolds/               # 文章模板
├── themes/                  # 主题文件（不直接修改）
├── public/                  # 构建输出（不上传 Git）
└── node_modules/
```

## 日常操作

### 写文章

```bash
hexo -C /d/blog new post "标题"     # 创建
# 编辑 source/_posts/标题.md
hexo -C /d/blog server              # 本地预览（http://localhost:4000）
git -C /d/blog add -A
git -C /d/blog commit -m "new post: xxx"
git -C /d/blog push
```

CF Pages 会在 push 后自动构建部署，2-3 分钟生效。

### 插入图片

1. 截图或准备图片文件
2. 拖到 PicGo → 自动上传 → 链接自动复制
3. 粘贴到 Markdown：`![描述](jsDelivr链接)`

图片仓库：`D:\saltz-images\`（独立 Git 仓库），通过 jsDelivr CDN 访问：
```
https://cdn.jsdelivr.net/gh/zqrxiangxueIt/saltz-images@main/img/xxx.jpg
```

PicGo 直接推送到 GitHub，本地需要 `git pull` 同步：
```bash
git -C /d/saltz-images pull
```

### 数学公式

使用主题自带 MathJax，文章内直接写 LaTeX：

```markdown
行内：$E = mc^2$
块级：
$$
\int_0^\infty e^{-x^2} dx
$$
```

### 删除图片

在 `D:\saltz-images\` 中删除文件后 push 即可，CDN 缓存最长 24h 失效。

## 主题配置要点

所有主题配置集中在 `_config.butterfly.yml`，不要直接修改 `node_modules/` 下的主题文件。

### 已配置项

- **导航栏**：固定顶部，菜单含首页/归档/标签/分类/关于
- **头像**：GitHub 头像，关闭旋转效果
- **搜索**：本地搜索（hexo-generator-search）
- **封面图**：Unsplash 图片直链
- **副标题**：打字机效果
- **代码高亮**：highlight.js（主题默认）
- **社交链接**：GitHub
- **页脚**：版权始于 2026

### 自定义 CSS

位置：`source/css/custom.css`，通过主题 `inject.head` 注入。当前设置：

```css
.site-name   { font-size: 1.3rem; }    /* 导航栏标题 */
#site-title  { font-size: 3.5rem !important; }  /* 封面大标题 */
#nav .site-page { font-size: 1.1rem; } /* 导航菜单项 */
```

### 全局字体

```yaml
font:
  global_font_size: 17px   # 正文基准字号
```

## 已安装插件

| 插件 | 用途 |
|------|------|
| hexo-theme-butterfly | 主题 |
| hexo-renderer-pug | 模板引擎 |
| hexo-renderer-stylus | CSS 预处理器 |
| hexo-generator-search | 本地搜索 |
| hexo-generator-feed | RSS |
| hexo-generator-sitemap | 站点地图 |
| hexo-filter-mathjax | 数学公式（已安装未启用，暂用主题自带） |

## 网络说明

本机通过 Clash TUN 模式访问 GitHub。Git 配置为 SSH 推送：

```bash
git remote -v   # git@github.com:zqrxiangxueIt/saltz-blog.git
```

CF Pages 自动构建需设置环境变量 `NODE_VERSION: 22`。
