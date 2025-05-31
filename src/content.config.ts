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

  loader: glob({ base: './src/content/exercise', pattern: '**/*.{md,mdx}' }),
  
	schema: z.object({
    title: z.string(),
    description: z.string(),
    // Datos básicos
    difficulty: z.enum(['Facil', 'Medio', 'Dificil']).optional(),
    educationLevel: z.enum(['Secundaria', 'Bachillerato', 'Universidad']).optional(),
    estimatedTime: z.number().optional(), // Tiempo estimado en minutos
    
    // Categorización
    tags: z.array(z.string()).optional(),
    topic: z.enum(['cinematica', 'dinamica', 'estatica', 'termica', 'vibraciones', 'electromagnetismo', 'termodinamica']).optional(),
    subtopic: z.string().optional(), // Subtema dentro del topic principal
    
    // Tipo de ejercicio y estado
    type: z.enum(['example', 'challenge']), // example=resuelto, challenge=por resolver
    status: z.enum(['draft', 'published', 'featured']).optional().default('published'),
    
    // Planteamiento del problema
    problem: z.object({
      statement: z.string(), // Enunciado del problema
      givens: z.array(z.string()).optional(), // Datos dados
      unknowns: z.array(z.string()).optional(), // Incógnitas
      images: z.array(z.string()).optional(), // Imágenes o diagramas
      formulas: z.array(z.string()).optional(), // Fórmulas relevantes
    }),
    
    // Solución estructurada
    solution: z.object({
      approach: z.string().optional(), // Enfoque general
      steps: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          image: z.string().optional(),
          formula: z.string().optional(),
        })
      ).optional(),
      finalAnswer: z.string().optional(), // Respuesta final
      explanation: z.string().optional(), // Explicación adicional
      video: z.string().optional(), // URL a video explicativo
    }).optional(),
    
    // Para ejercicios interactivos
    interactive: z.boolean().optional(),
    interactiveConfig: z.object({
      inputType: z.enum(['numeric', 'formula', 'multiplechoice', 'custom']).optional(),
      hints: z.array(z.string()).optional(), // Pistas secuenciales
      validationFunction: z.string().optional(), // Función JS para validar respuesta
      variables: z.record(z.any()).optional(), // Variables para generar diferentes versiones
      acceptedPrecision: z.number().optional(), // Para respuestas numéricas
      options: z.array(z.string()).optional(), // Para opciones múltiples
    }).optional(),
    
    // Material complementario
    prerequisites: z.array(z.string()).optional(), // Conocimientos previos necesarios
    reference: z.array(z.string()).optional(),
    relatedExercises: z.array(z.string()).optional(), // Referencias a otros ejercicios
    
    // Metadatos
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    author: z.string().optional(),
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
