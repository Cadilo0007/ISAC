import { Artist } from '../types.ts';

/**
 * ART CIRCLE RESIDENT ARTISTS & COLLECTIVE
 *
 * Dito nakalista ang mga artists na kasama at tinutulungan ni Elena Vance sa Art Circle studio.
 * Bawat isa ay may sariling portfolio page, bio, artist statement, at koleksyon ng arts.
 */
export const ARTISTS_DATA: Artist[] = [
  {
    id: 'artist-elena-vance',
    slug: 'elena-vance',
    name: 'Elena Vance',
    role: 'Founder & Principal Painter',
    discipline: 'Painting',
    location: 'London & Lisbon',
    portrait: '/src/assets/images/founder_portrait_editorial_1792565468351.jpg',
    bio: 'Elena Vance (b. 1984) is a painter, curator, and founder of Art Circle Studio. After working in museum curation across Paris and Berlin, she established Art Circle in 2019 to champion contemplative art, tactile materiality, and sustained artist support.',
    statement: 'My paintings investigate the tension between architectural reduction and tactile presence. By building slow stratifications of raw marble dust, chalk, and unbleached Belgian linen, the surface becomes a quiet breathing plane that changes tone with the passage of natural light.',
    techniques: ['Marble dust stratification', 'Cold oil washes', 'Hand-stretched raw linen', 'Mineral earth pigments'],
    exhibitions: [
      '2025 · "The Silent Room", Pavilion Mews Gallery, London',
      '2024 · "Void & Resonance", Galerie Marais, Paris',
      '2023 · "Matter in Time", Kunsthalle Basel',
    ],
    featured: true,
  },
  {
    id: 'artist-evelyn-dubois',
    slug: 'evelyn-dubois',
    name: 'Evelyn Dubois',
    role: 'Resident Fine Art Photographer',
    discipline: 'Photography',
    location: 'Normandy & Paris',
    portrait: '/src/assets/images/artist_evelyn_dubois_1792569612669.jpg',
    bio: 'Evelyn Dubois (b. 1978, Honfleur) is an acclaimed landscape and architectural photographer whose analog and large-format archival pigment works study atmospheric dissolution, fog thresholds, and the quiet liminality of coastal geography.',
    statement: 'I am drawn to moments where sea, mist, and sky lose their defining boundaries. Using analog medium-format cameras and natural light during solstice periods, I seek to capture the meditative pause before daybreak.',
    techniques: ['Medium format analog film', 'Archival pigment on Hahnemühle Photo Rag', 'Toned carbon printing', 'Museum float framing'],
    exhibitions: [
      '2025 · "Meridians of Solitude", Galerie de l\'Ombre, Paris',
      '2024 · "Tides and Mineral Gradients", Art Circle Studio, London',
      '2022 · "The Atlantic Horizon", Zurich Photography Center',
    ],
    featured: true,
  },
  {
    id: 'artist-kaelen-chen',
    slug: 'kaelen-chen',
    name: 'Kaelen Chen',
    role: 'Resident Sculptor & Ceramicist',
    discipline: 'Sculpture',
    location: 'Taipei & London',
    portrait: '/src/assets/images/artist_kaelen_chen_1792569613894.jpg',
    bio: 'Kaelen Chen (b. 1982, Taipei) bridges sculpture, geological mass, and ritual vessel forms. His practice interrogates tectonic balance through hand-coiled volcanic stonewares, cold-cast bronzes, and carved basalt pedestals.',
    statement: 'A vessel is defined not by the density of its exterior walls, but by the quiet void it encloses. Each piece is carved by hand over months, allowing the natural grain of volcanic clays and bronze patinas to evoke ancient geologic time.',
    techniques: ['Hand-coiling & reductive carving', 'High-fire wood kilns', 'Blackened bronze patina', 'Honed volcanic basalt plinths'],
    exhibitions: [
      '2025 · "Monoliths in Basalt", Art Circle Studio, London',
      '2024 · "Tectonic Apertures", Song Art Space, Taipei',
      '2023 · "Vessel as Void", Kyoto Contemporary Crafts Center',
    ],
    featured: true,
  },
  {
    id: 'artist-astrid-lindholm',
    slug: 'astrid-lindholm',
    name: 'Astrid Lindholm',
    role: 'Resident Master Printmaker',
    discipline: 'Printmaking',
    location: 'Stockholm & London',
    portrait: '/src/assets/images/artist_astrid_lindholm_1792569614102.jpg',
    bio: 'Astrid Lindholm (b. 1991, Stockholm) specializes in singular, non-editioned relief monotypes and mineral ink washes. Her delicate compositions on handmade Japanese washi paper investigate ephemerality, silence, and organic fiber memory.',
    statement: 'Monotype printing demands both radical surrender and precision. Because each print is pressed only once, the ink transfers its unique topography into the damp mulberry fibers, creating an unrepeatable record of a single fleeting moment.',
    techniques: ['Relief monotype matrix', 'Mineral sumi ink washes', 'Handmade Echizen washi paper', 'Bespoke oak float frames'],
    exhibitions: [
      '2026 · "Paper Memory & Vellum", Modern Art Museum, Stockholm',
      '2025 · "Singular Matrices", Art Circle Studio, London',
      '2023 · "Fibers in Light", Nordic Cultural Institute, Copenhagen',
    ],
    featured: true,
  },
  {
    id: 'artist-julian-croft',
    slug: 'julian-croft',
    name: 'Julian Croft',
    role: 'Resident Color-Field Painter',
    discipline: 'Painting',
    location: 'Melbourne & London',
    portrait: '/src/assets/images/artist_julian_croft_1792569614471.jpg',
    bio: 'Julian Croft (b. 1975, Melbourne) explores the chromatic resonance of earth umber, raw indigo, and natural casein. His expansive stretched linen canvases explore spatial rhythm and harmonic light in contemporary architecture.',
    statement: 'Color is not something placed onto a surface; it is an atmosphere that radiates from it. Working with natural earth binders on Belgian linen, I aim to evoke the sensory weight of dusk falling across ancient plaster walls.',
    techniques: ['Raw casein & egg tempera', 'Glaze washes on heavy linen', 'Charcoal & graphite under-drawings', 'Natural white oak casing'],
    exhibitions: [
      '2025 · "Spatial Echoes", Art Circle Studio, London',
      '2024 · "Chromatic Resonance", Melbourne Modern',
      '2023 · "Umber & Indigo Dialogues", Whitechapel Project Space',
    ],
    featured: true,
  },
];
