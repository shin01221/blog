import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  // Verify admin key
  const authHeader = req.headers.get("Authorization");
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || !authHeader || authHeader !== `Bearer ${adminKey}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers,
    });
  }

  try {
    const store = getStore("blog-posts");
    const { blobs } = await store.list();

    const posts = await Promise.all(
      blobs.map(async (blob) => {
        const data = await store.getMetadata(blob.key);
        return {
          slug: blob.key,
          title: data?.metadata?.title || blob.key,
          description: data?.metadata?.description || "",
          date: data?.metadata?.pubDate || "Unknown",
          tags: data?.metadata?.tags ? (data.metadata.tags as string).split(",") : [],
          author: data?.metadata?.author || "Medhat",
        };
      })
    );

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return new Response(JSON.stringify({ posts }), { status: 200, headers });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Failed to list posts", details: err.message }),
      { status: 500, headers }
    );
  }
};
