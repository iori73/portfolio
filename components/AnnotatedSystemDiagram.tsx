'use client';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const AnnotatedSystemDiagram: React.FC = () => {
  const t = useTranslations('systemDiagram');
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full">
      <div className="space-y-4">
        {/* System flow title and description */}

        {/* Row 1: Main Diagram */}
        <div className="flex justify-center">
          <div className="relative bg-gray-50 rounded-lg p-2 h-fit">
            <img src="/Diagram_v2.svg" alt="Gym System Architecture Diagram" className="w-full h-auto max-w-full" />
          </div>
        </div>

        {/* Row 2: Explanations Section - 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Left: The system flow explanation - Text on left, Figure on right */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6 bg-[#eeedee] p-4 rounded-lg">
            <div className="flex-1 text-left">
              <h4 className="text-body-sm md:text-body-lg mb-1">The system flow</h4>
              <p className="text-body-sm font-helvetica-neue text-gray-600">{t('eachComponentRepresents')}</p>
            </div>
            <div className="flex-shrink-0 flex justify-center md:justify-end bg-white p-1 rounded">
              <div className="p-2 md:p-0">
                <img src="/figures/figure1-noText.svg" alt="System flow diagram" className="w-36 h-36 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Top Right: User Action ↔ Weekly Process: Text on left, Figure on right */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6 bg-[#eeedee] p-4 rounded-lg">
            <div className="flex-1 text-left">
              <h4 className="text-body-sm md:text-body-lg mb-1">User Action ↔ Weekly Process</h4>
              <p className="text-body-sm font-helvetica-neue text-gray-600 ">
                {t('sevenBarsSevenDots')} {t('weeklyAutomaticUpdate')}
              </p>
            </div>
            <div className="flex-shrink-0 flex justify-center md:justify-end bg-white p-1 rounded">
              <div className="p-2 md:p-0">
                <img src="/figures/figure4-days.svg" alt="Weekly process diagram" className="w-36 h-36 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Bottom Left: How many people: Text on left, Figure on right */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6 bg-[#eeedee] p-4 rounded-lg">
            <div className="flex-1 text-left">
              <h4 className="text-body-sm md:text-body-lg mb-1">Number of people</h4>
              <p className="text-body-sm font-helvetica-neue text-gray-600">{t('dotSizeRepresentsPeople')}</p>
            </div>
            <div className="flex-shrink-0 flex justify-center md:justify-end bg-white p-1 rounded">
              <div className="p-2 md:p-0">
                <img
                  src="/figures/figure2.svg"
                  alt="Number of people visualization"
                  className="w-36 h-36 flex-shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Bottom Right: How many screenshots: Text on left, Figure on right */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6 bg-[#eeedee] p-4 rounded-lg">
            <div className="flex-1 min-w-0 text-left">
              <h4 className="text-body-sm md:text-body-lg mb-1">Number of data points</h4>
              <p className="text-body-sm font-helvetica-neue text-gray-600">{t('dotColorRepresentsScreenshots')}</p>
            </div>
            <div className="flex-shrink-0 flex justify-center md:justify-end bg-white p-1 rounded">
              <div className="p-2 md:p-0">
                <img
                  src="/figures/figure3.svg"
                  alt="Number of screenshots visualization"
                  className="w-36 h-36 flex-shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnotatedSystemDiagram;
