import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return rss({
    title: 'Medhat Blog',
    description: 'Thoughts on software development and technology',
    site: `${context.site}${base}`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `${base}/${post.id}/`,
    })),
  });
}
