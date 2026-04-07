const { getStore } = require("@netlify/blobs");

module.exports = {
  onPreBuild: async ({ constants, utils }) => {
    const fs = require("fs");
    const path = require("path");

    const blogDir = path.join(constants.PUBLISH_DIR, "..", "src", "content", "blog");

    console.log("📦 Syncing blog posts from Netlify Blobs...");

    try {
      const store = getStore("blog-posts");
      const { blobs } = await store.list();

      if (!blobs || blobs.length === 0) {
        console.log("   No posts found in Netlify Blobs.");
        return;
      }

      // Ensure blog directory exists
      if (!fs.existsSync(blogDir)) {
        fs.mkdirSync(blogDir, { recursive: true });
      }

      let synced = 0;
      for (const blob of blobs) {
        const content = await store.get(blob.key);
        if (content) {
          const filePath = path.join(blogDir, `${blob.key}.md`);
          // Only write if file doesn't already exist (don't overwrite local posts)
          if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, content);
            console.log(`   ✅ Synced: ${blob.key}.md`);
            synced++;
          } else {
            console.log(`   ⏭️  Skipped (exists locally): ${blob.key}.md`);
          }
        }
      }

      console.log(`📦 Sync complete: ${synced} new post(s) pulled from Blobs.`);
    } catch (err) {
      console.log(`⚠️  Could not sync from Blobs: ${err.message}`);
      console.log("   This is normal for local builds without Netlify context.");
    }
  },
};
