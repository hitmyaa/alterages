'use client';

import * as React from 'react';

import { AccordionItem, type AccordionItemProps } from '@/components/ui/accordion';
import { GA_EVENTS, trackEvent } from '@/lib/analytics';

/**
 * Wrapper client autour de `AccordionItem` qui émet un event `faq_open`
 * GA4 lorsque l'item passe à l'état ouvert. Le `<details>` natif déclenche
 * `onToggle` à chaque changement d'état (ouvert/fermé) — on ne tague que
 * l'ouverture, c'est elle qui porte l'intention de lecture.
 */
export function TrackedFaqItem({ question, ...props }: AccordionItemProps) {
  const handleToggle: React.ReactEventHandler<HTMLDetailsElement> = (event) => {
    if (event.currentTarget.open) {
      const label = typeof question === 'string' ? question : '';
      trackEvent(GA_EVENTS.FAQ_OPEN, {
        question: label.slice(0, 100),
      });
    }
  };

  return <AccordionItem question={question} onToggle={handleToggle} {...props} />;
}
