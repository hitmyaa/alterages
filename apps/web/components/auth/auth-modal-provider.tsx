'use client';

import * as React from 'react';

interface AuthModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const AuthModalContext = React.createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  /* Verrouille le scroll du body quand la modal est ouverte. */
  React.useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  /* Échap pour fermer. */
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, close]);

  return (
    <AuthModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = React.useContext(AuthModalContext);
  if (!ctx) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return ctx;
}
