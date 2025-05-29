// Configuraciones para el sistema de recursos

export const difficultyConfig = {
  easy: { label: 'Fácil', color: 'bg-green-100 text-green-800', icon: '📗' },
  medium: { label: 'Intermedio', color: 'bg-yellow-100 text-yellow-800', icon: '📙' },
  hard: { label: 'Avanzado', color: 'bg-red-100 text-red-800', icon: '📕' }
} as const;

export const topicConfig = {
  cinematica: { label: 'Cinemática', color: 'bg-blue-100 text-blue-800' },
  dinamica: { label: 'Dinámica', color: 'bg-purple-100 text-purple-800' },
  estatica: { label: 'Estática', color: 'bg-gray-100 text-gray-800' },
  termica: { label: 'Térmica', color: 'bg-orange-100 text-orange-800' },
  vibraciones: { label: 'Vibraciones', color: 'bg-pink-100 text-pink-800' },
  electromagnetismo: { label: 'Electromagnetismo', color: 'bg-indigo-100 text-indigo-800' },
  termodinamica: { label: 'Termodinámica', color: 'bg-red-100 text-red-800' }
} as const;

export const typeConfig = {
  texto: { label: 'Texto', icon: '📄' },
  video: { label: 'Video', icon: '🎥' },
  interactivo: { label: 'Interactivo', icon: '🎮' },
  'ejemplo practico': { label: 'Ejemplo Práctico', icon: '⚡' }
} as const;

export const resourceTypeConfig = {
  video: { label: 'Video', icon: '🎥', color: 'bg-red-50 border-red-200' },
  article: { label: 'Artículo', icon: '📰', color: 'bg-blue-50 border-blue-200' },
  book: { label: 'Libro', icon: '📚', color: 'bg-green-50 border-green-200' },
  website: { label: 'Sitio Web', icon: '🌐', color: 'bg-purple-50 border-purple-200' }
} as const;

export type DifficultyLevel = keyof typeof difficultyConfig;
export type TopicType = keyof typeof topicConfig;
export type ResourceContentType = keyof typeof typeConfig;
export type ExternalResourceType = keyof typeof resourceTypeConfig;
