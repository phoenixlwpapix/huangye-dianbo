import "server-only";

import { Redis } from "@upstash/redis";
import { unstable_cache } from "next/cache";

const VIEW_KEY_PREFIX = "blog:views:";
const DEDUPE_KEY_PREFIX = "blog:view-dedupe:";
const DEDUPE_SECONDS = 24 * 60 * 60;

let redis: Redis | null | undefined;

function getRedis(): Redis | null {
  if (redis !== undefined) return redis;

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  redis = url && token ? new Redis({ url, token }) : null;
  return redis;
}

function viewKey(slug: string) {
  return `${VIEW_KEY_PREFIX}${slug}`;
}

async function readViewCounts(
  slugs: string[],
): Promise<Record<string, number>> {
  if (slugs.length === 0) return {};

  const client = getRedis();
  if (!client) return Object.fromEntries(slugs.map((slug) => [slug, 0]));

  try {
    const counts = await client.mget<(number | null)[]>(
      ...slugs.map(viewKey),
    );

    return Object.fromEntries(
      slugs.map((slug, index) => [slug, Number(counts[index] ?? 0)]),
    );
  } catch (error) {
    console.error("Unable to read article view counts", error);
    return Object.fromEntries(slugs.map((slug) => [slug, 0]));
  }
}

export const getCachedViewCounts = unstable_cache(
  readViewCounts,
  ["article-view-counts"],
  { revalidate: 60 },
);

export async function getViewCount(slug: string): Promise<number> {
  const counts = await readViewCounts([slug]);
  return counts[slug] ?? 0;
}

export async function incrementViewCount(
  slug: string,
  visitorHash: string,
): Promise<number> {
  const client = getRedis();
  if (!client) return 0;

  const isNewView = await client.set(
    `${DEDUPE_KEY_PREFIX}${slug}:${visitorHash}`,
    1,
    { nx: true, ex: DEDUPE_SECONDS },
  );

  if (!isNewView) return (await client.get<number>(viewKey(slug))) ?? 0;
  return client.incr(viewKey(slug));
}
