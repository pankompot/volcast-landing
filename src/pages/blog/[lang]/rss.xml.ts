import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export function getStaticPaths() {
  return [{ params: { lang: 'en' } }, { params: { lang: 'pl' } }];
}

export async function GET(context: APIContext) {
  const lang = context.params.lang as 'en' | 'pl';
  const posts = await getCollection('blog', ({ data }) =>
    !data.draft && data.lang === lang
  );
  posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: `Volcast Blog (${lang.toUpperCase()})`,
    description: lang === 'pl'
      ? 'Blog techniczny o energii słonecznej i prognozowaniu PV'
      : 'Technical blog about solar energy and PV forecasting',
    site: context.site!,
    customData: `<language>${lang}</language>`,
    items: posts.map(post => {
      const slug = post.id.split('/').pop()!;
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description,
        link: `/blog/${lang}/${slug}/`,
      };
    }),
  });
}
