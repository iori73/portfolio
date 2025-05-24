// /src/compositions/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 画面幅によって MD / SP を切り替える
    if (window.innerWidth < 768) {
      // SP 用のグラデーション
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0.01, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.1, 'rgba(249, 250, 235, .4)');
      gradient.addColorStop(0.4, 'rgba(214, 228, 174, .6)');
      gradient.addColorStop(1, 'rgba(125, 181, 118, .6)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else {
      // MD 用のグラデーション
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0.1, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(249, 250, 235, .4)');
      gradient.addColorStop(0.5, 'rgba(214, 228, 174, .6)');
      gradient.addColorStop(1, 'rgba(125, 181, 118, .6)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    // Add grain effect
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 6) {
      // Add variations to each pixel
      const grainAmount = Math.random() * 20 - 10; // Random value between -10 and 10

      // Apply grain variation to RGB channels
      data[i] = Math.min(255, Math.max(0, data[i] + grainAmount));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grainAmount));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grainAmount));
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  return (
    <div className="relative flex flex-col items-center py-16 md:pb-16">
      {/* Canvas background */}
      <canvas ref={canvasRef} width="1200" height="600" className="absolute inset-0 w-full h-full object-cover z-0" />

      <div className="w-full max-w-3xl relative z-10">
        <div className="flex flex-col items-center gap-4 justify-center flex-column">
          {/* Frequency legend (desktop only, vertical) */}
          <div className="hidden md:flex flex-col items-center gap-2 top-1/2 left-80">
            <span
              className="font-space-mono text-caption-s-120"
              style={{
                textOrientation: 'mixed',
              }}
            >
              The size of each circle represents its frequency
            </span>
          </div>
          {/* Frequency legend (mobile only, horizontal) */}
          <div className="flex md:hidden w-full flex-column items-center justify-center gap-2">
            <span className="font-space-mono text-caption-xs-120 text-center">
              The size of each circle
              <br /> represents its frequency
            </span>
          </div>

          {/* Icon list */}
          <div className="relative md:mx-auto flex flex-wrap items-center justify-center gap-4">
            {/* X (Twitter) */}
            <Link
              href="https://twitter.com/iori73wsy"
              aria-label="Twitter/X"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[112px] h-[112px] md:w-[128px] md:h-[128px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Image src="/socials/X.svg" alt="X" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/X.svg" alt="X" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* GitHub */}
            <Link
              href="https://github.com/iori73"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[72px] h-[72px] md:w-[88px] md:h-[88px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image src="/socials/GitHub.svg" alt="GitHub" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/GitHub.svg" alt="GitHub" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://www.linkedin.com/in/iori-kawano-131a4122a/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[88px] h-[88px] md:w-[104px] md:h-[104px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image src="/socials/LinkedIn.svg" alt="LinkedIn" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/LinkedIn.svg" alt="LinkedIn" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* Note */}
            <Link
              href="https://note.com/io_73"
              aria-label="note"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[104px] h-[104px] md:w-[120px] md:h-[120px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image src="/socials/note.svg" alt="note" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/note.svg" alt="note" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* Behance */}
            <Link
              href="https://www.behance.net/835e5127"
              aria-label="Behance"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[56px] h-[56px] md:w-[72px] md:h-[72px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image src="/socials/Behance.svg" alt="Behance" width={32} height={32} className="block md:hidden" />
              <Image src="/socials/Behance.svg" alt="Behance" width={40} height={40} className="hidden md:block" />
            </Link>

            {/* Medium */}
            <Link
              href="https://medium.com/@iori730002204294"
              aria-label="Medium"
              target="_blank"
              rel="noreferrer"
              className="flex-none flex items-center justify-center rounded-full
                         w-[64px] h-[64px] md:w-[80px] md:h-[80px]"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.0) 100%)',
                backdropFilter: 'blur(4px)',
              }}
            >
              <Image
                src="/socials/Medium-Icon-Black.svg"
                alt="Medium"
                width={32}
                height={32}
                className="block md:hidden"
              />
              <Image
                src="/socials/Medium-Icon-Black.svg"
                alt="Medium"
                width={40}
                height={40}
                className="hidden md:block"
              />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-body-m-140 md:text-body-l-140 font-noto-sans-jp mt-8 md:mt-8">
          @ 2025 Iori Kawano
        </div>
      </div>
    </div>
  );
}
