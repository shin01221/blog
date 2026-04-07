import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

export default async (req: Request, context: Context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "DELETE, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "DELETE") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers,
    });
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
    const body = await req.json();
    const { slug } = body;

    if (!slug) {
      return new Response(
        JSON.stringify({ error: "Slug is required." }),
        { status: 400, headers }
      );
    }

    const store = getStore("blog-posts");
    await store.delete(slug);

    // Trigger rebuild if BUILD_HOOK_URL is set
    const buildHookUrl = process.env.BUILD_HOOK_URL;
    if (buildHookUrl) {
      await fetch(buildHookUrl, { method: "POST" });
    }

    return new Response(
      JSON.stringify({ message: `Post "${slug}" deleted successfully.` }),
      { status: 200, headers }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Failed to delete post", details: err.message }),
      { status: 500, headers }
    );
  }
};
