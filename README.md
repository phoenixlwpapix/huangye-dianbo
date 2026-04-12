# 荒野电波 · Blog

阿荒的个人博客。Markdown 驱动的静态博客站。

## Tech Stack

- Next.js 16 (App Router, SSG)
- TypeScript + React 19
- Tailwind CSS v4
- gray-matter + remark (markdown)
- Vercel 托管，git push 自动部署

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
