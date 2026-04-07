import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method !== "POST") {
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

  const buildHookUrl = process.env.BUILD_HOOK_URL;

  if (!buildHookUrl) {
    return new Response(
      JSON.stringify({ error: "BUILD_HOOK_URL is not configured." }),
      { status: 500, headers }
    );
  }

  try {
    await fetch(buildHookUrl, { method: "POST" });

    return new Response(
      JSON.stringify({ message: "Build triggered successfully!" }),
      { status: 200, headers }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Failed to trigger build", details: err.message }),
      { status: 500, headers }
    );
  }
};
