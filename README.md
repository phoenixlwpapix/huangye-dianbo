# 荒野电波 · Blog

阿荒的个人博客。Markdown 驱动的静态博客站。

## Tech Stack

- Next.js 16 (App Router, SSG)
- TypeScript + React 19
- Tailwind CSS v4
- gray-matter + remark (markdown)
- Upstash Redis（文章阅读量，24 小时访客去重）
- Vercel 托管，git push 自动部署

## 阅读量统计

- 主页显示每篇文章的累计阅读量，最多缓存 60 秒。
- 文章页打开后异步记录一次阅读，不阻塞正文渲染。
- 同一访客对同一篇文章在 24 小时内只计数一次；常见爬虫不计数。
- Vercel 项目需连接 Upstash Redis，并提供 `KV_REST_API_URL` 和
  `KV_REST_API_TOKEN` 环境变量。

## 发文章

往 `content/posts/` 丢一个 `.md` 文件，格式：

```markdown
---
title: "文章标题"
date: "YYYY-MM-DD"
excerpt: "一两句摘要"
cover: "/images/cover.png"
---

正文...
```

封面图和配图放 `public/images/`。

最近发布： [AI 不是又一次工业革命，它更像普通人的文艺复兴](https://blog.studioyyh.tech/posts/ai-renaissance)

```bash
git add . && git commit -m "post: 文章标题" && git push
```

Vercel 自动构建，1 分钟内上线。

## 开发

```bash
pnpm install
pnpm dev
```

## Links

- Live: [blog.studioyyh.tech](https://blog.studioyyh.tech)
- GitHub: [phoenixlwpapix/huangye-dianbo](https://github.com/phoenixlwpapix/huangye-dianbo)
