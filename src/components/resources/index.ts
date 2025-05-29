// Barrel exports para componentes de recursos
// Facilita la importación de múltiples componentes

export { default as ResourceHero } from './ResourceHero.astro';
export { default as ResourceMetadata } from './ResourceMetadata.astro';
export { default as ResourceContent } from './ResourceContent.astro';
export { default as ExternalResourceLink } from './ExternalResourceLink.astro';
export { default as ExternalResources } from './ExternalResources.astro';
export { default as ExamplesGrid } from './ExamplesGrid.astro';
export { default as TagsAndTopics } from './TagsAndTopics.astro';
export { default as RelatedResources } from './RelatedResources.astro';
export { default as ResourceNavigation } from './ResourceNavigation.astro';

// Re-exportar tipos y constantes relacionadas
export type {
  DifficultyLevel,
  TopicType,
  ResourceContentType,
  ExternalResourceType
} from '../../constants/resources';

export {
  difficultyConfig,
  topicConfig,
  typeConfig,
  resourceTypeConfig
} from '../../constants/resources';
