'use client';

import { useEffect } from 'react';

import { setUserProperties } from '@/lib/analytics';

/**
 * Composant invisible monté dans le layout de l'espace connecté. À chaque
 * arrivée dans l'espace, il pose la user property `user_type=etudiant` côté
 * GA4. Permet ensuite de filtrer/segmenter tous les rapports par type
 * d'utilisateur (anonyme vs étudiant connecté) sans dupliquer la donnée
 * sur chaque event.
 */
export function EspaceAnalytics() {
  useEffect(() => {
    setUserProperties({ user_type: 'etudiant' });
  }, []);

  return null;
}
