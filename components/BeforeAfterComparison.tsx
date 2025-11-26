'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { useTranslations } from 'next-intl';

interface BeforeAfterComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeDescription?: string;
  afterDescription?: string;
  mode?: 'slider' | 'tabs' | 'side-by-side';
}

const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  beforeDescription,
  afterDescription,
  mode = 'slider',
}) => {
  const t = useTranslations('common');
  const [sliderValue, setSliderValue] = useState([50]);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultBeforeLabel = beforeLabel || t('before') || 'Before';
  const defaultAfterLabel = afterLabel || t('after') || 'After';

  // スライダーのドラッグ処理
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderValue([percentage]);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // スライダーモード
  if (mode === 'slider') {
    return (
      <div className="w-full">
        <div className="mb-4 text-center">
          <p className="text-body-sm md:text-body-lg font-helvetica-neue text-gray-600 mb-2">
            {t('beforeAfterComparison') || 'Drag the slider to compare'}
          </p>
        </div>
        <div
          ref={containerRef}
          className="relative w-full bg-white rounded-xl overflow-hidden border-2 border-gray-200"
          onMouseLeave={() => setIsDragging(false)}
        >
          {/* Before Image */}
          <div className="relative w-full aspect-video bg-gray-100">
            <img src={beforeImage} alt={defaultBeforeLabel} className="w-full h-full object-contain" />
            {/* Overlay with clip path */}
            <div
              className="absolute inset-0 bg-gray-900/10"
              style={{
                clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)`,
              }}
            />
          </div>

          {/* After Image */}
          <div
            className="absolute inset-0 w-full aspect-video"
            style={{
              clipPath: `inset(0 0 0 ${sliderValue[0]}%)`,
              pointerEvents: 'none',
            }}
          >
            <img src={afterImage} alt={defaultAfterLabel} className="w-full h-full object-contain" />
          </div>

          {/* Slider Control */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10 flex items-center justify-center"
            style={{ left: `${sliderValue[0]}%`, transform: 'translateX(-50%)' }}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
          >
            <div className="w-10 h-10 bg-white rounded-full shadow-xl border-2 border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-gray-400 rounded-full" />
                <div className="w-1 h-4 bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Clickable area for slider */}
          <div
            className="absolute inset-0 cursor-ew-resize z-5"
            onClick={(e) => {
              if (!isDragging && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
                setSliderValue([percentage]);
              }
            }}
            style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
          />

          {/* Descriptions */}
          {(beforeDescription || afterDescription) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-caption-xs font-semibold mb-1">{defaultBeforeLabel}</p>
                  <p className="text-caption-xs opacity-90">{beforeDescription}</p>
                </div>
                <div>
                  <p className="text-caption-xs font-semibold mb-1">{defaultAfterLabel}</p>
                  <p className="text-caption-xs opacity-90">{afterDescription}</p>
                </div>
              </div>
            </div>
          )}

          {/* Slider Input */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64 z-20">
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              min={0}
              max={100}
              step={1}
              className="cursor-pointer"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
            />
          </div>
        </div>
      </div>
    );
  }

  // タブモード
  if (mode === 'tabs') {
    return (
      <div className="w-full">
        <Tabs defaultValue="before" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="before" className="text-body-sm md:text-body-sm">
              {defaultBeforeLabel}
            </TabsTrigger>
            <TabsTrigger value="after" className="text-body-sm md:text-body-sm">
              {defaultAfterLabel}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="before" className="mt-0">
            <div className="relative w-full bg-white rounded-xl overflow-hidden border-2 border-red-200">
              <div className="relative w-full aspect-video bg-gray-100">
                <img src={beforeImage} alt={defaultBeforeLabel} className="w-full h-full object-contain p-6" />
              </div>
              {beforeDescription && (
                <div className="p-4 bg-red-50 border-t border-red-200">
                  <p className="text-body-xs text-gray-700">{beforeDescription}</p>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="after" className="mt-0">
            <div className="relative w-full bg-white rounded-xl overflow-hidden border-2 border-green-200">
              <div className="relative w-full aspect-video bg-gray-100">
                <img src={afterImage} alt={defaultAfterLabel} className="w-full h-full object-contain p-6" />
              </div>
              {afterDescription && (
                <div className="p-4 bg-green-50 border-t border-green-200">
                  <p className="text-body-xs text-gray-700">{afterDescription}</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // サイドバイサイドモード
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Before */}
        <div className="relative w-full bg-white rounded-xl overflow-hidden border-2 border-red-200">
          <div className="relative w-full aspect-video bg-gray-100">
            <img src={beforeImage} alt={defaultBeforeLabel} className="w-full h-full object-contain p-6" />
          </div>
          {beforeDescription && (
            <div className="p-4 bg-red-50 border-t border-red-200">
              <p className="text-body-xs text-gray-700">{beforeDescription}</p>
            </div>
          )}
        </div>

        {/* After */}
        <div className="relative w-full bg-white rounded-xl overflow-hidden border-2 border-green-200">
          <div className="relative w-full aspect-video bg-gray-100">
            <img src={afterImage} alt={defaultAfterLabel} className="w-full h-full object-contain p-6" />
          </div>
          {afterDescription && (
            <div className="p-4 bg-green-50 border-t border-green-200">
              <p className="text-body-xs text-gray-700">{afterDescription}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
