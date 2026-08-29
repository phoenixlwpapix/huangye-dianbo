import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { getViewCount, incrementViewCount } from "@/lib/views";

const BOT_PATTERN =
  /bot|crawler|spider|preview|facebookexternalhit|slurp|bingpreview/i;

function isKnownSlug(slug: string) {
  return getAllPosts().some((post) => post.slug === slug);
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json().catch(() => null);
  const slug =
    body && typeof body === "object" && "slug" in body
      ? (body as { slug?: unknown }).slug
      : null;

  if (typeof slug !== "string" || !isKnownSlug(slug)) {
    return NextResponse.json({ error: "Invalid article slug" }, { status: 400 });
  }

  const userAgent = request.headers.get("user-agent") ?? "unknown";
  if (BOT_PATTERN.test(userAgent)) {
    return NextResponse.json({ views: await getViewCount(slug) });
  }

  const forwardedFor =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    "unknown";
  const ip = forwardedFor.split(",")[0]?.trim() ?? "unknown";
  const visitorHash = createHash("sha256")
    .update(`${ip}:${userAgent}`)
    .digest("hex");

  try {
    const views = await incrementViewCount(slug, visitorHash);
    return NextResponse.json({ views });
  } catch (error) {
    console.error("Unable to increment article view count", error);
    return NextResponse.json(
      { views: await getViewCount(slug) },
      { status: 503 },
    );
  }
}
