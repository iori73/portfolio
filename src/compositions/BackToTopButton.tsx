'use client';

import { useState, useEffect } from 'react';
import { useMenu } from '@/src/contexts/MenuContext';

/**
 * BackToTopButton:
 * - On mobile (below md):
 *    - 48×48 circle (w-12 h-12)
 *    - position: bottom-44 right-4 (adjusted to avoid footer overlap)
 *    - when scrolled: 50% opacity
 * - On md+:
 *    - 64×64 circle (w-16 h-16)
 *    - position: bottom-28 right-12 (adjusted to avoid footer overlap)
 *    - when scrolled: 100% opacity
 * - Uses a blur background
 * - Only visible when user has scrolled down a bit
 */
export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { isMenuOpen } = useMenu();

  // Show/hide the button based on scroll position
  useEffect(() => {
    function onScroll() {
      // Example: Show after 200px of scrolling
      setIsVisible(window.scrollY > 200);
    }
    window.addEventListener('scroll', onScroll);
    onScroll(); // check initial position
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={`
        fixed
        bottom-44 md:bottom-28
        right-4 md:right-12
        w-12 h-12 md:w-16 md:h-16
        flex items-center justify-center
        rounded-full
        z-50
        transition-opacity
        ${
          isVisible && !isMenuOpen
            ? // Visible: 50% opacity on mobile, 100% on md+ (only when menu is closed)
              'opacity-50 md:opacity-100'
            : // Hidden: 0% opacity + no pointer events (when not scrolled or menu is open)
              'opacity-0 pointer-events-none'
        }
      `}
      style={{
        // Same background & blur effect as your header
        background: '#d2d2d780',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Chevron up icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0000008f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
