import type { Context } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

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
      status: 405, headers,
    });
  }

  // Verify admin key
  const authHeader = req.headers.get("Authorization");
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || !authHeader || authHeader !== `Bearer ${adminKey}`) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers,
    });
  }

  try {
    const body = await req.json();
    const { title, description, tags, author, body: content } = body;

    if (!title || !description || !content) {
      return new Response(
        JSON.stringify({ error: "Title, description, and content are required." }),
        { status: 400, headers }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Create frontmatter
    const pubDate = new Date().toISOString().split("T")[0];
    const tagsArray = Array.isArray(tags) ? tags : [];
    const frontmatter = [
      "---",
      `title: "${title}"`,
      `description: "${description}"`,
      `pubDate: ${pubDate}`,
      `tags: [${tagsArray.map((t: string) => `"${t}"`).join(", ")}]`,
      `author: "${author || "Medhat"}"`,
      "---",
      "",
      content,
    ].join("\n");

    // Store in Netlify Blobs as backup
    const store = getStore("blog-posts");
    await store.set(slug, frontmatter, {
      metadata: { title, description, pubDate, tags: tagsArray.join(","), author: author || "Medhat" },
    });

    // Push to GitHub repo (this triggers Netlify auto-deploy)
    const ghToken = process.env.GITHUB_TOKEN;
    const ghRepo = process.env.GITHUB_REPO || "muh404med/medhats-blog";
    let pushedToGitHub = false;

    if (ghToken) {
      const filePath = `src/content/blog/${slug}.md`;
      const apiUrl = `https://api.github.com/repos/${ghRepo}/contents/${filePath}`;

      // Base64 encode the content
      const base64Content = btoa(unescape(encodeURIComponent(frontmatter)));

      const ghResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${ghToken}`,
          "Content-Type": "application/json",
          "Accept": "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `📝 New post: ${title}`,
          content: base64Content,
          branch: "main",
        }),
      });

      if (ghResponse.ok) {
        pushedToGitHub = true;
      } else {
        const ghErr = await ghResponse.text();
        console.log(`GitHub push failed: ${ghErr}`);
      }
    }

    // Fallback: trigger rebuild via build hook if GitHub push didn't work
    if (!pushedToGitHub) {
      const buildHookUrl = process.env.BUILD_HOOK_URL;
      if (buildHookUrl) {
        await fetch(buildHookUrl, { method: "POST" });
      }
    }

    return new Response(
      JSON.stringify({
        message: "Post created successfully!",
        slug,
        pushedToGitHub,
      }),
      { status: 201, headers }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Failed to create post", details: err.message }),
      { status: 500, headers }
    );
  }
};
