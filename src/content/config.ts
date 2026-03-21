import { defineCollection, z } from 'astro:content';

const ressources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['tension', 'parole', 'recul', 'accompagnement', 'juridique']),
    kicker: z.string(),
    publishDate: z.date().optional(),
    isPremium: z.boolean().default(false),
  }),
});

export const collections = {
  'ressources': ressources,
};
