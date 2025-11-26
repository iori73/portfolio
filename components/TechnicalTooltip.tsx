'use client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect, useRef } from 'react';

interface TechnicalTooltipProps {
  children: React.ReactNode;
  content: string;
}

const TechnicalTooltip: React.FC<TechnicalTooltipProps> = ({ children, content }) => {
  const [isMobileTooltipOpen, setIsMobileTooltipOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipContentRef = useRef<HTMLDivElement>(null);

  // モバイルデバイスの検出
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // クリックアウトサイドでツールチップを閉じる
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsMobileTooltipOpen(false);
      }
    };

    if (isMobileTooltipOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileTooltipOpen]);

  // モバイルtooltipの位置を計算して画面内に収める
  useEffect(() => {
    if (isMobileTooltipOpen && triggerRef.current && tooltipContentRef.current) {
      // 次のフレームで位置を計算（tooltipの幅が確定してから）
      requestAnimationFrame(() => {
        if (!triggerRef.current || !tooltipContentRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipContentRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const padding = 16; // 画面端からの余白

        let left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

        // 左端にはみ出す場合
        if (left < padding) {
          left = padding;
        }

        // 右端にはみ出す場合
        if (left + tooltipRect.width > viewportWidth - padding) {
          left = viewportWidth - tooltipRect.width - padding;
        }

        tooltipContentRef.current.style.left = `${left}px`;
        tooltipContentRef.current.style.top = `${triggerRect.top - tooltipRect.height - 8}px`;
      });
    }
  }, [isMobileTooltipOpen]);

  const handleMobileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileTooltipOpen(!isMobileTooltipOpen);
  };

  if (isMobile) {
    return (
      <div ref={tooltipRef} className="relative inline-block">
        <span
          ref={triggerRef}
          className="px-2 py-0.5 rounded-md bg-[#f5f5f7] text-[#1d1d1f] font-medium cursor-pointer inline-flex items-center mr-1"
          onClick={handleMobileClick}
        >
          {children}
        </span>
        {isMobileTooltipOpen && (
          <div
            ref={tooltipContentRef}
            className="fixed z-50 bg-black/50 backdrop-blur-md border border-white/20 text-white shadow-lg rounded-md p-3"
            style={{
              width: 'calc(100vw - 2rem)',
              maxWidth: '400px',
            }}
          >
            <p className="text-body-xs leading-relaxed break-words whitespace-normal">{content}</p>
          </div>
        )}
      </div>
    );
  }

  // デスクトップ用の既存の実装
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="px-2 py-0.5 rounded-md bg-[#f5f5f7] text-[#1d1d1f] font-medium cursor-help inline-flex items-center mr-1">
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent
          className="bg-black/50 backdrop-blur-md border-white/20 text-white shadow-lg"
          style={{ width: 'fit-content', maxWidth: 'min(40vw, calc(100vw - 4rem))', minWidth: '200px' }}
          collisionPadding={32}
        >
          <p className="text-sm leading-relaxed break-words whitespace-normal">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TechnicalTooltip;
