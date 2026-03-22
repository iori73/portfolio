'use client';

import { useRef, useState, useEffect } from 'react';

interface ColorLayer {
  image: string;
  swatchColor: string;
}

const COLOR_LAYERS: ColorLayer[] = [
  {
    image: '/work/ukiyoe/printing-process-study/printing-process-study05.webp',
    swatchColor: '#fbc546',
  },
  {
    image: '/work/ukiyoe/printing-process-study/printing-process-study02.webp',
    swatchColor: '#dfa69a',
  },
  {
    image: '/work/ukiyoe/printing-process-study/printing-process-study04.webp',
    swatchColor: '#cdbfb1',
  },
  {
    image: '/work/ukiyoe/printing-process-study/printing-process-study01.webp',
    swatchColor: '#7c8b65',
  },
  {
    image: '/work/ukiyoe/printing-process-study/printing-process-study03.webp',
    swatchColor: '#1b3e5b',
  },
];

function LayerCard({
  layer,
  index,
  isVisible,
}: {
  layer: ColorLayer;
  index: number;
  isVisible: boolean;
}) {
  const delay = index * 100;

  return (
    <div
      className="flex flex-col items-center gap-2 flex-1 min-w-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      {/* Color swatch dot */}
      <div
        className="w-4 h-4 rounded-none shrink-0"
        style={{ backgroundColor: layer.swatchColor }}
      />

      {/* Layer image with tinted border */}
      <div
        className="w-full overflow-hidden"
        style={{ aspectRatio: '177 / 264' }}
      >
        <img
          src={layer.image}
          alt=""
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function PrintingProcessStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex gap-3 md:gap-4">
      {COLOR_LAYERS.map((layer, i) => (
        <LayerCard
          key={layer.swatchColor}
          layer={layer}
          index={i}
          isVisible={isVisible}
        />
      ))}
    </div>
  );
}
