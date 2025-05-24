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

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Track hover states for each platform
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 画面幅によって MD / SP を切り替える
    if (window.innerWidth < 768) {
      // SP 用のグラデーション
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(252, 251, 252, 0.1)');
      gradient.addColorStop(0.05, 'rgba(252, 251, 252, .1)');
      gradient.addColorStop(0.15, 'rgba(249, 250, 235, .2)');
      gradient.addColorStop(0.35, 'rgba(214, 228, 174, .4)');
      gradient.addColorStop(1, 'rgba(125, 181, 118, .6)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    } else {
      // MD 用のグラデーション
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(252, 251, 252, 1)');
      gradient.addColorStop(0.2, 'rgba(252, 251, 252, 1)');
      gradient.addColorStop(0.25, 'rgba(252, 251, 252, .1)');
      gradient.addColorStop(0.4, 'rgba(214, 228, 174, .5)');
      gradient.addColorStop(1, 'rgba(125, 181, 118, .65)');

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

  // Social icon wrapper with hover effect
  const SocialIcon = ({
    platform,
    href,
    circleSize,
    desktopCircleSize,
  }: {
    platform: keyof typeof PLATFORM_DATA;
    href: string;
    circleSize: string;
    desktopCircleSize: string;
  }) => {
    const { score, color } = PLATFORM_DATA[platform];
    const isHovered = hoveredPlatform === platform;

    return (
      <div className="w-[80px] h-[80px] flex items-center justify-center">
        <Link
          href={href}
          aria-label={platform}
          target="_blank"
          rel="noreferrer"
          className={`flex-none flex items-center justify-center rounded-full transition-all duration-300
                     w-[${circleSize}] h-[${circleSize}] md:w-[${desktopCircleSize}] md:h-[${desktopCircleSize}]`}
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)',
            backdropFilter: 'blur(4px)',
          }}
          onMouseEnter={() => setHoveredPlatform(platform)}
          onMouseLeave={() => setHoveredPlatform(null)}
        >
          <div
            className="transition-all duration-600"
            style={{
              filter: 'grayscale(0%)',
              opacity: 1,
            }}
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
                fill: isHovered ? color : 'inherit',
                color: isHovered ? color : 'inherit',
              }}
            />
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="relative flex flex-col items-center py-16 md:pb-16">
      {/* Canvas background */}
      <canvas ref={canvasRef} width="1200" height="600" className="absolute inset-0 w-full h-full object-cover z-0" />

      <div className="mt-4 w-full max-w-3xl relative z-10">
        <div className=" flex flex-col items-center gap-4 md:gap-8 justify-center flex-column">
          {/* Frequency legend (desktop only, vertical) */}
          <div className="hidden md:flex flex-col items-center gap-2 top-1/2 left-80">
            <span
              className="font-space-mono text-caption-s-120"
              style={{
                textOrientation: 'mixed',
              }}
            >
              Circle size reflects how often I use each platform
            </span>
          </div>
          {/* Frequency legend (mobile only, horizontal) */}
          <div className="flex md:hidden w-full flex-column items-center justify-center gap-2">
            <span className="font-space-mono text-caption-xs-120 text-center">
              Circle size reflects how often
              <br /> I use each platform
            </span>
          </div>

          {/* Icon list - Figmaデザインに合わせた並び順 */}
          <div className="relative md:mx-auto grid grid-cols-3 md:flex md:flex-wrap items-center justify-center gap-4">
            {/* Behance */}
            <SocialIcon
              platform="behance"
              href="https://www.behance.net/835e5127"
              circleSize="56px"
              desktopCircleSize="72px"
            />

            {/* GitHub */}
            <SocialIcon platform="github" href="https://github.com/iori73" circleSize="72px" desktopCircleSize="88px" />

            {/* LinkedIn */}
            <SocialIcon
              platform="linkedin"
              href="https://www.linkedin.com/in/iori-kawano-131a4122a/"
              circleSize="88px"
              desktopCircleSize="104px"
            />

            {/* Medium */}
            <SocialIcon
              platform="medium"
              href="https://medium.com/@iori730002204294"
              circleSize="64px"
              desktopCircleSize="80px"
            />

            {/* Note */}
            <SocialIcon platform="note" href="https://note.com/io_73" circleSize="104px" desktopCircleSize="120px" />

            {/* X (Twitter) */}
            <SocialIcon
              platform="twitter"
              href="https://twitter.com/iori73wsy"
              circleSize="112px"
              desktopCircleSize="128px"
            />
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
