"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

type ArticleViewCountProps = {
  slug: string;
};

export function ArticleViewCount({ slug }: ArticleViewCountProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function recordView() {
      try {
        const response = await fetch("/api/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
          cache: "no-store",
          signal: controller.signal,
        });
        const data: unknown = await response.json();

        if (
          data &&
          typeof data === "object" &&
          "views" in data &&
          typeof (data as { views?: unknown }).views === "number"
        ) {
          setViews((data as { views: number }).views);
        }
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          console.error("Unable to record article view", error);
        }
      }
    }

    void recordView();
    return () => controller.abort();
  }, [slug]);

  return (
    <span className="inline-flex items-center gap-1.5 tabular-nums">
      <Eye className="size-3.5" aria-hidden="true" />
      {views === null ? "—" : views.toLocaleString("zh-CN")} 次阅读
    </span>
  );
}
