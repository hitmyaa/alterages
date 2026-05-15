/* Constantes typées des noms d'events — évite les typos qui pourrissent
 * la donnée dans GA4 (impossible de fusionner deux events après coup). */
export const GA_EVENTS = {
  CTA_CLICK: 'cta_click',
  FAQ_OPEN: 'faq_open',
  FORM_START: 'form_start',
  FORM_STEP_VIEW: 'form_step_view',
  FORM_STEP_COMPLETE: 'form_step_complete',
  FORM_STEP_BACK: 'form_step_back',
  FORM_SUBMIT: 'form_submit',
  GENERATE_LEAD: 'generate_lead',
  SIGN_UP: 'sign_up',
  PASSWORD_RESET_COMPLETE: 'password_reset_complete',
} as const;

type EventName = (typeof GA_EVENTS)[keyof typeof GA_EVENTS];
type EventParams = Record<string, string | number | boolean | undefined>;

interface DataLayerWindow {
  dataLayer?: unknown[];
}

/* Silencieux si GA n'est pas chargé (dev local sans GA_ID, visiteur ayant
 * refusé le consent à venir, etc.) — pas de console.warn intempestif. */
function pushToDataLayer(args: unknown[]): void {
  if (typeof window === 'undefined') return;
  const dl = (window as DataLayerWindow).dataLayer;
  if (!dl) return;
  dl.push(args);
}

export function trackEvent(name: EventName, params: EventParams = {}): void {
  const cleaned: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) cleaned[key] = value;
  }
  pushToDataLayer(['event', name, cleaned]);
}

/* User properties — appliquées à tous les events suivants pour cet
 * utilisateur, jusqu'à un nouveau `set`. Permet de filtrer/segmenter dans
 * GA4 sans dupliquer la donnée sur chaque event. */
export function setUserProperties(props: Record<string, string>): void {
  pushToDataLayer(['set', 'user_properties', props]);
}
