// // // // // // // /components/Header.tsx

'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    // <header className="fixed w-full mt-0 max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
    <header className="fixed top-0 left-0 w-full z-40 mx-auto px-4 md:px-16 py-4 flex justify-between items-center" style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)' }}>
      {/* Logo */}
      <Link href="/">
        <Image src="/icon.svg" alt="Logo" width={48} height={48} className="rounded-full" />
      </Link>

      {/* PC Nav (md以上) */}
      <nav className="hidden md:flex gap-12">
        <Link href="/experiment" className="text-body-xl-140 hover:opacity-70">
          Experiment
        </Link>

        <Link href="/about" className="text-body-xl-140 hover:opacity-70">
          About
        </Link>
        <Link href="/blog" className="text-body-xl-140 hover:opacity-70">
          Blog
        </Link>
      </nav>

      {/* Hamburger Icon (モバイル) */}
      <button
        onClick={toggleMenu}
        className="md:hidden relative z-50 w-8 h-8 flex items-center justify-center"
        aria-label="Toggle Menu"
      >
        {/* --- 上段ライン --- */}
        <span
          className={`absolute block w-6 h-[2px] bg-black transition-all duration-300
            ${isOpen ? 'rotate-45 -translate-y-[-1px]' : '-translate-y-2'}
          `}
        />
        {/* --- 中段ライン --- */}
        <span
          className={`absolute block w-6 h-[2px] bg-black transition-all duration-300
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}
        />
        {/* --- 下段ライン --- */}
        <span
          className={`absolute block w-6 h-[2px] bg-black transition-all duration-300
            ${isOpen ? '-rotate-45 translate-y-[1px]' : 'translate-y-2'}
          `}
        />
      </button>

      {/* モバイルメニュー (フルスクリーン) */}
      <div
        // className={`fixed top-0 left-0 h-full w-full z-40 flex items-start pt-24 justify-start px-6 md:hidden`}
        className={`fixed top-0 left-0 w-full h-screen z-40 flex items-start pt-24 justify-start px-6 md:hidden`}
        style={{
          pointerEvents: isOpen ? 'auto' : 'none',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
          background: 'linear-gradient(180deg, #FFF 33%, rgba(255, 255, 255, 0.50) 100%)',
          backdropFilter: 'blur(8px)',
          transition: isOpen ? 'all 0.8s ease' : 'all 2.0s ease',
          visibility: isOpen ? 'visible' : 'hidden',
          transitionProperty: 'opacity, transform, visibility',
        }}
      >
        {/* Menu Content */}
        <nav className="flex flex-col items-start justify-center gap-8">
          {['Experiment', 'About', 'Blog'].map((item, index) => (
            <Link
              key={item}
              // Experimentの場合はexperimentに遷移
              // Aboutの場合はaboutに遷移
              // Blogの場合はblogに遷移
              href={`/${item.toLowerCase()}`}
              className="text-body-xxxl-140 hover:opacity-70"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
                transition: isOpen ? 'all 0.8s ease' : 'all 0.2s ease',
                transitionDelay: isOpen ? `${index * 0.15 + 0.3}s` : '0s',
              }}
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black z-30 md:hidden"
          style={{
            opacity: isOpen ? 0.5 : 0,
            transition: isOpen ? 'opacity 0.8s ease' : 'opacity 0.3s ease',
          }}
          onClick={toggleMenu} // クリックで閉じる
        />
      )}
    </header>
  );
}
