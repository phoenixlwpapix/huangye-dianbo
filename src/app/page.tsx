import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          荒野电波
        </h1>
        <p className="text-[var(--muted)] text-lg leading-relaxed max-w-xl">
          阿荒写的长文。记录想法、作品与过程。
        </p>
      </section>

      <section className="space-y-12">
        {posts.length === 0 && (
          <p className="text-[var(--muted)]">还没有文章，先喝杯茶。</p>
        )}
        {posts.map((post, index) => (
          <article key={post.slug} className="group">
            <Link href={`/posts/${post.slug}`} className="block">
              {post.cover && (
                <div className="relative aspect-[16/9] mb-5 overflow-hidden rounded-xl bg-[var(--border)]">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    {...(index === 0 && { priority: true })}
                  />
                </div>
              )}
              <div className="flex items-center gap-3 text-xs text-[var(--muted)] mb-2">
                <time>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight mb-2 group-hover:opacity-70 transition-opacity">
                {post.title}
              </h2>
              <p className="text-[var(--muted)] leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
