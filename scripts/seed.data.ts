// Datos semilla de los catálogos (sección 7 del Project-context).
// El doc id de cada documento es su slug, para lecturas legibles y reproducibles.

export interface SeedInterest {
  slug: string;
  name: string;
}

export interface SeedSubgenre {
  slug: string;
  name: string;
  interestSlug: string;
}

export interface SeedPerspective {
  slug: string;
  name: string;
  description: string | null;
}

export const SEED_INTERESTS: SeedInterest[] = [
  { slug: 'cine', name: 'Cine' },
  { slug: 'teatro', name: 'Teatro' },
  { slug: 'lectura', name: 'Lectura' },
];

export const SEED_SUBGENRES: SeedSubgenre[] = [
  // Cine
  { slug: 'ciencia-ficcion', name: 'Ciencia ficción', interestSlug: 'cine' },
  { slug: 'drama', name: 'Drama', interestSlug: 'cine' },
  { slug: 'comedia', name: 'Comedia', interestSlug: 'cine' },
  { slug: 'documental', name: 'Documental', interestSlug: 'cine' },
  { slug: 'animacion', name: 'Animación', interestSlug: 'cine' },
  // Teatro
  { slug: 'clasico', name: 'Clásico', interestSlug: 'teatro' },
  { slug: 'contemporaneo', name: 'Contemporáneo', interestSlug: 'teatro' },
  { slug: 'musical', name: 'Musical', interestSlug: 'teatro' },
  { slug: 'experimental', name: 'Experimental', interestSlug: 'teatro' },
  // Lectura
  { slug: 'novela', name: 'Novela', interestSlug: 'lectura' },
  { slug: 'ensayo', name: 'Ensayo', interestSlug: 'lectura' },
  { slug: 'poesia', name: 'Poesía', interestSlug: 'lectura' },
  { slug: 'cuento', name: 'Cuento', interestSlug: 'lectura' },
  { slug: 'no-ficcion', name: 'No ficción', interestSlug: 'lectura' },
];

export const SEED_PERSPECTIVES: SeedPerspective[] = [
  { slug: 'trama', name: 'Trama', description: 'Análisis de la historia y su estructura.' },
  { slug: 'tecnica', name: 'Técnica', description: 'Aspectos técnicos y de producción.' },
  {
    slug: 'actuacion',
    name: 'Actuación o interpretación',
    description: 'Desempeño de intérpretes y dirección actoral.',
  },
  {
    slug: 'reflexion',
    name: 'Reflexión filosófica',
    description: 'Temas, ideas y reflexión que propone la obra.',
  },
  {
    slug: 'contexto-historico',
    name: 'Contexto histórico',
    description: 'Marco histórico y cultural de la obra.',
  },
];
