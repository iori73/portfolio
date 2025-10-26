// /src/compositions/Footer.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

// Define platform usage frequency and brand colors
const PLATFORM_DATA = {
  twitter: { score: 50, color: '#1DA1F2' },
  github: { score: 20, color: '#333333' },
  linkedin: { score: 30, color: '#0077B5' },
  note: { score: 30, color: '#41c9b4' },
  behance: { score: 10, color: '#1769ff' },
  medium: { score: 10, color: '#000000' },
};

// Size mapping for different platforms
const PLATFORM_SIZES = {
  behance: { mobile: 'w-14 h-14', desktop: 'md:w-16 md:h-16' }, // 56px -> 64px
  github: { mobile: 'w-16 h-16', desktop: 'md:w-20 md:h-20' }, // 64px -> 80px
  linkedin: { mobile: 'w-20 h-20', desktop: 'md:w-24 md:h-24' }, // 80px -> 96px
  medium: { mobile: 'w-14 h-14', desktop: 'md:w-16 md:h-16' }, // 56px -> 64px
  note: { mobile: 'w-24 h-24', desktop: 'md:w-28 md:h-28' }, // 96px -> 112px
  twitter: { mobile: 'w-28 h-28', desktop: 'md:w-32 md:h-32' }, // 112px -> 128px
};

export default function Footer() {
  console.log('Footer component rendered');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  useEffect(() => {
    console.log('useEffect started');

    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas not found!');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Canvas context not found!');
      return;
    }

    console.log('Canvas found, drawing...');

    // 簡単な描画テスト
    const draw = () => {
      const rect = canvas.getBoundingClientRect();

      if (rect.width === 0 || rect.height === 0) {
        console.log('Canvas size is 0, retrying...');
        setTimeout(draw, 100);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;

      // 白からf9f8f7への自然なグラデーション
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(255, 255, 255, .1)');
      gradient.addColorStop(.5, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(.8, 'rgba(249, 248, 247, .8)');
      gradient.addColorStop(1, 'rgba(239, 238, 237, 1)');


      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      console.log('Gradient drawn successfully!');
    };

    draw();

    const handleResize = () => {
      draw();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Social icon wrapper with hover effect
  const SocialIcon = ({ platform, href }: { platform: keyof typeof PLATFORM_DATA; href: string }) => {
    const { color } = PLATFORM_DATA[platform];
    const isHovered = hoveredPlatform === platform;
    const sizes = PLATFORM_SIZES[platform];

    return (
      <div className="w-20 h-20 flex items-center justify-center">
        <Link
          href={href}
          aria-label={platform}
          target="_blank"
          rel="noreferrer"
          className={`flex-none flex items-center justify-center rounded-full transition-all duration-300 ${sizes.mobile} ${sizes.desktop}`}
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)',
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={() => setHoveredPlatform(platform)}
          onMouseLeave={() => setHoveredPlatform(null)}
        >
          <Image
            src={`/socials/${
              platform === 'twitter'
                ? 'X'
                : platform === 'note'
                ? 'note'
                : platform === 'github'
                ? 'GitHub'
                : platform === 'linkedin'
                ? 'LinkedIn'
                : platform.charAt(0).toUpperCase() + platform.slice(1)
            }.svg`}
            alt={platform}
            width={32}
            height={32}
            style={{
              filter: isHovered ? 'none' : 'grayscale(100%)',
            }}
          />
        </Link>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center py-16 md:pb-16">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      <div className="mt-4 w-full max-w-3xl relative z-10">
        <div className="flex flex-col items-center gap-4 md:gap-8 justify-center">
          {/* Frequency legend */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-space-mono text-caption-s-120 text-center">
              Circle size reflects how often I use each platform
            </span>
          </div>

          {/* Icon list */}
          <div className="relative grid grid-cols-3 md:flex md:flex-wrap items-center justify-center gap-4">
            <SocialIcon platform="behance" href="https://www.behance.net/835e5127" />
            <SocialIcon platform="github" href="https://github.com/iori73" />
            <SocialIcon platform="linkedin" href="https://www.linkedin.com/in/iori-kawano-131a4122a/" />
            <SocialIcon platform="medium" href="https://medium.com/@iori730002204294" />
            <SocialIcon platform="note" href="https://note.com/io_73" />
            <SocialIcon platform="twitter" href="https://twitter.com/iori73wsy" />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-body-m-140 md:text-body-l-140 font-noto-sans-jp mt-8">@ 2025 Iori Kawano</div>
      </div>
    </div>
  );
}
