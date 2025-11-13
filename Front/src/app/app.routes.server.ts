import { RenderMode, ServerRoute } from '@angular/ssr';
// Pas besoin d'importer getPrerenderParams si vous utilisez Server ou Client

export const serverRoutes: ServerRoute[] = [
  // Toutes les routes sont forcées en rendu Client (CSR).
  // Cela désactive le SSR et le Prerendering pour l'ensemble de ces chemins.
  { path: '', renderMode: RenderMode.Client },
  { path: 'new', renderMode: RenderMode.Client },

  // Route dynamique : forcée en rendu Client (CSR).
  { path: 'pollution/:id', renderMode: RenderMode.Client },

  // Fallback : toutes les autres routes sont également gérées par le navigateur (CSR)
  { path: '**', renderMode: RenderMode.Client },
];
