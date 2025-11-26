// /components/Header.tsx

'use client';
import { useState } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useMenu } from '@/src/contexts/MenuContext';

export default function Header() {
  const { isMenuOpen, setIsMenuOpen } = useMenu();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    setIsMenuOpen(newState);
  };
  
  const toggleLanguage = (newLocale: 'en' | 'jp') => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  // メニュー項目 - 常に英語表示
  const menuItems = [
    { name: 'Experiment', path: '/experiment' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 mx-auto px-4 py-3 md:px-6 flex justify-between items-center">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={
          {
            // background:
            //   'linear-gradient(180deg, rgba(255, 255, 255, .5) 0%, rgba(255, 255, 255, 0.55) 30%, rgba(255, 255, 255, 0.3) 60%, rgba(255, 255, 255, 0.1) 80%, rgba(255, 255, 255, 0) 100%)',
          }
        }
      />
      {/* Progressive blur background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: 'blur(40px)',
          // maskImage:
          //   'linear-gradient(180deg, rgba(229, 229, 229, 10) 0%, rgba(229, 229, 229, 0.9) 25%, rgba(229, 229, 229, 0.7) 50%, rgba(229, 229, 229, .5) 70%, rgba(229, 229, 229, 0.1) 90%, rgba(229, 229, 229, 0) 100%)',
          // WebkitMaskImage:
          //   'linear-gradient(180deg, rgba(229, 229, 229, 10) 0%, rgba(229, 229, 229, 0.9) 25%, rgba(229, 229, 229, 0.7) 50%, rgba(229, 229, 229, .5) 70%, rgba(229, 229, 229, 0.1) 90%, rgba(229, 229, 229, 0) 100%)',
        }}
      />
      {/* Content layer */}
      <div className="relative z-10 w-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/icon.svg" alt="Logo" width={48} height={48} className="rounded-full" />
        </Link>

        {/* PC Nav (md以上) */}
        <div className="hidden md:flex items-center">
          <nav className="flex gap-12 mr-12">
            {menuItems.map((item) => (
              <div key={item.path} className="relative flex flex-col items-center">
                <Link
                  href={item.path}
                  className={`font-helvetica-neue text-body-xl leading-[33.6px] transition-[font-weight] duration-300 ${
                    isActive(item.path) ? 'font-bold' : 'font-normal'
                  }`}
                >
                  {item.name}
                </Link>
                {isActive(item.path) && (
                  <div className="absolute top-full mt-0 w-2 h-2 rounded-full bg-[#1A1A1A]"></div>
                )}
              </div>
            ))}
          </nav>

          {/* Language Switcher for Desktop */}
          <div className="flex items-center">
              <button
                onClick={() => toggleLanguage('en')}
                disabled={isPending}
                className={`font-helvetica-neue text-body-xl leading-[33.6px] text-center transition-[font-weight] duration-300 ${
                  locale === 'en' ? 'font-bold' : 'font-light'
                }`}
              >
                EN
              </button>
              <span className="mx-2 text-body-sm leading-6">|</span>
              <button
                onClick={() => toggleLanguage('jp')}
                disabled={isPending}
                className={`font-helvetica-neue text-body-xl leading-[33.6px] text-center transition-[font-weight] duration-300 ${
                  locale === 'jp' ? 'font-bold' : 'font-light'
                }`}
              >
                JP
              </button>
          </div>
        </div>

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
        {isOpen && (
          <div
            className="fixed top-0 left-0 w-full h-screen z-40 flex items-start pt-24 justify-start px-6 md:hidden"
            style={{
              background: 'linear-gradient(rgb(255, 255, 255) 33%, rgba(255, 255, 255, 0.5) 100%)',
              backdropFilter: 'blur(16px)',
              transition: 'all 0.8s ease',
            }}
          >
            {/* Menu Content */}
            <nav className="flex flex-col items-start justify-center gap-8 w-full">
              {menuItems.map((item, index) => (
                <div key={item.path} className="relative flex items-center gap-2">
                  <Link
                    href={item.path}
                    className="text-body-3xl font-merriweather"
                    style={{
                      opacity: 1,
                      transform: 'translateY(0)',
                      transition: 'all 0.8s ease',
                      transitionDelay: `${index * 0.15 + 0.3}s`,
                      fontWeight: isActive(item.path) ? 600 : 400,
                    }}
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                  {isActive(item.path) && (
                    <div
                      className="w-2 h-2 rounded-full bg-[#1A1A1A]"
                      style={{
                        opacity: 1,
                        transform: 'translateY(-10px)',
                        transition: 'all 0.8s ease',
                        transitionDelay: `${index * 0.15 + 0.3}s`,
                      }}
                    />
                  )}
                </div>
              ))}

              {/* Language Switcher for Mobile */}
              <div
                className="flex items-center mt-4"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
                  transition: isOpen ? 'all 0.8s ease' : 'all 0.2s ease',
                  transitionDelay: isOpen ? '0.75s' : '0s',
                }}
              >
                <button
                  onClick={() => toggleLanguage('en')}
                  disabled={isPending}
                  className="text-body-xl font-merriweather"
                  style={{
                    fontWeight: locale === 'en' ? 600 : 400,
                    transition: 'font-weight 300ms ease',
                  }}
                >
                  EN
                </button>
                <span className="mx-2">|</span>
                <button
                  onClick={() => toggleLanguage('jp')}
                  disabled={isPending}
                  className="text-body-xl font-merriweather"
                  style={{
                    fontWeight: locale === 'jp' ? 600 : 400,
                    transition: 'font-weight 300ms ease',
                  }}
                >
                  JP
                </button>
              </div>
            </nav>
          </div>
        )}

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
      </div>
    </header>
  );
}
