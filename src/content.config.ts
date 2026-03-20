import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    author: z.string().default('Michal'),
    tags: z.array(z.string()),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    lang: z.enum(['en', 'pl']),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    seo: z.object({
      ogTitle: z.string().optional(),
      ogDescription: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    }).optional(),
    relatedPosts: z.array(z.string()).optional(),
  }).refine(
    (data) => !data.series || data.seriesOrder !== undefined,
    { message: 'seriesOrder is required when series is set' }
  ),
});

export const collections = { blog };
