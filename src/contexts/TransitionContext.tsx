'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface SourceRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

// A transition can fly a plain image, or a named custom component (e.g. the
// Figma Plugins card deck) whose rendering TransitionOverlay looks up by key.
export type TransitionContent = { type: 'image'; src: string } | { type: 'node'; key: 'figmaPluginsDeck' };

interface TransitionState {
  isTransitioning: boolean;
  phase: 'idle' | 'expanding' | 'navigating' | 'fading';
  content: TransitionContent;
  sourceRect: SourceRect | null;
  targetUrl: string;
}

interface TransitionContextType {
  state: TransitionState;
  startTransition: (content: TransitionContent, rect: SourceRect, url: string) => void;
  setPhase: (phase: TransitionState['phase']) => void;
  endTransition: () => void;
}

const initialState: TransitionState = {
  isTransitioning: false,
  phase: 'idle',
  content: { type: 'image', src: '' },
  sourceRect: null,
  targetUrl: '',
};

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<TransitionState>(initialState);

  const startTransition = useCallback((content: TransitionContent, rect: SourceRect, url: string) => {
    setState({
      isTransitioning: true,
      phase: 'expanding',
      content,
      sourceRect: rect,
      targetUrl: url,
    });
  }, []);

  const setPhase = useCallback((phase: TransitionState['phase']) => {
    setState((prev) => ({ ...prev, phase }));
  }, []);

  const endTransition = useCallback(() => {
    setState((prev) => ({ ...prev, phase: 'fading' }));
  }, []);

  return (
    <TransitionContext.Provider value={{ state, startTransition, setPhase, endTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error('usePageTransition must be used within a TransitionProvider');
  }
  return context;
}
