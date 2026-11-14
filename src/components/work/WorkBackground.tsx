'use client';

import { useEffect } from 'react';

/** work/ 配下を開いている間だけ、body の背景を --background（白）にする。離れるときに元へ戻す。 */
export default function WorkBackground() {
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'hsl(var(--background))';
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);
  return null;
}
