import { getCollection } from 'astro:content';

export async function GET() {
  const posts = (await getCollection('blog'))
    .filter(post => !post.data.draft);

  const index = posts.map(post => ({
    title: post.data.title,
    description: post.data.description,
    tags: post.data.tags || [],
    url: `/blog/${post.id}/`,
    date: post.data.pubDate.toISOString(),
  }));

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
}
