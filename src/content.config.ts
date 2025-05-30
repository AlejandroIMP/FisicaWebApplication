import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';
import { title } from 'process';
import { diff } from 'util';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});



const exercise = defineCollection({
	// Load Markdown and MDX files in the `src/content/exercises/` directory.
	loader: glob({ base: './src/content/exercise', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		difficulty: z.enum(['Facil', 'Medio', 'Dificil']).optional(),
		tags: z.array(z.string()).optional(),
		topic: z.enum(['cinematica', 'dinamica', 'estatica', 'termica', 'vibraciones', 'electromagnetismo','termodinamica']).optional(),
		solution: z.string().optional(),
		steps: z.array(
			z.object({
				title: z.string(),
				content: z.string(),
				image: z.string().optional(),
			})
		).optional(),
		interactive: z.boolean().optional(),
		reference: z.array(z.string()).optional(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
})

const resources = defineCollection({
	loader: glob({ base: './src/content/resources', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		author: z.string().optional(),
		authorLink: z.string().optional(),
		source: z.string().optional(),
		sourceLink: z.string().optional(),
		difficulty: z.enum(['Facil', 'Medio', 'Dificil']).optional(),
		topic: z.enum(['cinematica', 'dinamica', 'estatica', 'termica', 'vibraciones', 'electromagnetismo','termodinamica']).optional(),
		type: z.enum(['texto', 'video', 'interactivo', 'ejemplo practico']).optional(),
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()).optional(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		examples: z.array(
			z.object({
				title: z.string(),
				description: z.string(),
				image: z.string().optional(),
				link: z.string().optional(),
			})
		).optional(),
		relatedTopics: z.array(z.string()).optional(),
		relatedResources: z.array(
			z.object({
				id: z.string().optional(),
				title: z.string(),
				description: z.string().optional(),
				link: z.string().optional(),
				image: z.string().optional(),
				topic: z.enum(['cinematica', 'dinamica', 'estatica', 'termica', 'vibraciones', 'electromagnetismo','termodinamica']).optional(),
				tags: z.array(z.string()).optional(),
			})
		).optional(),
		resourceType: z.enum(['video', 'article', 'book', 'website']).optional(),
		resourceLink: z.string().optional(),
	}),
})

export const collections = { blog, exercise, resources };
