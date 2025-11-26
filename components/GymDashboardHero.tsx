'use client';
import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Frown, Smile } from 'lucide-react';

interface KeyInsightCard {
  id: number;
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  width?: string;
  iconBgColor?: {
    light: string;
    dark: string;
  };
}

export interface GymStats {
  totalRecords: number;
  dateRange: string;
  averageCrowd: number;
  peakTime: {
    time: string;
    count: number;
  };
  quietTime: {
    time: string;
    count: number;
  };
  systemUptime?: number;
  operationDurationMonths?: number;
  crowdednessComparison?: {
    time: string;
    multiplier: number;
  };
}

interface GymDashboardHeroProps {
  gymStats?: GymStats | null;
  isLoading?: boolean;
}

const GymDashboardHero: React.FC<GymDashboardHeroProps> = ({ gymStats: propGymStats, isLoading: propIsLoading }) => {
  const [animationState, setAnimationState] = useState({
    iphoneVisible: false,
    card1Visible: false,
    card2Visible: false,
    card3Visible: false,
    card4Visible: false,
    darkMode: false,
  });

  const [gymStats, setGymStats] = useState<GymStats | null>(propGymStats || null);
  const [isLoading, setIsLoading] = useState(propIsLoading !== undefined ? propIsLoading : true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update local state when props change
  useEffect(() => {
    if (propGymStats !== undefined) {
      setGymStats(propGymStats);
    }
    if (propIsLoading !== undefined) {
      setIsLoading(propIsLoading);
    }
  }, [propGymStats, propIsLoading]);

  // Fetch gym statistics from API only if not provided via props
  useEffect(() => {
    if (propGymStats === undefined) {
      const fetchGymStats = async () => {
        try {
          const response = await fetch('/api/gym-stats');
          if (response.ok) {
            const data = await response.json();
            // Validate that we received valid data
            if (data && typeof data.totalRecords === 'number') {
              setGymStats(data);
            } else {
              console.error('Invalid data format received from API');
              // Keep gymStats as null to use defaultStats
            }
          } else {
            console.error('Failed to fetch gym stats:', response.status, response.statusText);
            // Keep gymStats as null to use defaultStats
          }
        } catch (error) {
          console.error('Error fetching gym stats:', error);
          // Keep gymStats as null to use defaultStats
        } finally {
          setIsLoading(false);
        }
      };

      fetchGymStats();
    }
  }, [propGymStats]);

  // Default values (fallback)
  const defaultStats: GymStats = {
    totalRecords: 466,
    dateRange: '2025-06-29 - 2025-11-09',
    averageCrowd: 20,
    peakTime: { time: 'Wednesday 19:00', count: 45 },
    quietTime: { time: 'Monday 9:00', count: 4 },
  };

  const stats = gymStats || defaultStats;

  const keyInsights: KeyInsightCard[] = [
    {
      id: 1,
      title: 'Total Records',
      value: isLoading ? '...' : stats.totalRecords.toString(),
      subtitle: isLoading ? 'Loading...' : stats.dateRange,
      icon: <BarChart3 className="w-8 h-8" />,
      position: 'top-left',
      width: 'clamp(260px, 26vw, 286px)',
      iconBgColor: {
        light: '#f7fee7', // lime-50
        dark: '#f7fee7', // lime-50
      },
    },
    {
      id: 2,
      title: 'Average Crowd',
      value: isLoading ? '...' : `${stats.averageCrowd} people`,
      subtitle: 'All Period Average',
      icon: <Users className="w-8 h-8" />,
      position: 'top-right',
      width: 'clamp(260px, 26vw, 290px)',
      iconBgColor: {
        light: '#f7fee7', // lime-50
        dark: '#f7fee7', // lime-50
      },
    },
    {
      id: 3,
      title: 'Peak Time',
      value: isLoading ? '...' : stats.peakTime.time,
      subtitle: isLoading ? 'Loading...' : `Max: ${stats.peakTime.count} people`,
      icon: <Frown className="w-8 h-8" />,
      position: 'bottom-left',
      width: 'clamp(260px, 26vw, 286px)',
      iconBgColor: {
        light: '#f7fee7', // lime-50
        dark: '#f7fee7', // lime-50
      },
    },
    {
      id: 4,
      title: 'Quiet Time',
      value: isLoading ? '...' : stats.quietTime.time,
      subtitle: isLoading ? 'Loading...' : `Min: ${stats.quietTime.count} people`,
      icon: <Smile className="w-8 h-8" />,
      position: 'bottom-right',
      width: 'clamp(234px, 23.4vw, 239px)',
      iconBgColor: {
        light: '#f7fee7', // lime-50
        dark: '#f7fee7', // lime-50
      },
    },
  ];

  useEffect(() => {
    // Animation timeline - More relaxed spacing for better user experience
    // t=0s: iPhone starts sliding up
    const iphoneTimer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, iphoneVisible: true }));
    }, 0);

    // t=0.5s: Card 1 appears
    const card1Timer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, card1Visible: true }));
    }, 600);

    // t=0.9s: Card 2 appears
    const card2Timer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, card2Visible: true }));
    }, 700);

    // t=1.3s: Card 3 appears
    const card3Timer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, card3Visible: true }));
    }, 900);

    // t=1.7s: Card 4 appears
    const card4Timer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, card4Visible: true }));
    }, 1000);

    // t=2.8s: Dark mode transition starts (more breathing room after cards)
    const darkModeTimer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, darkMode: true }));
    }, 2500);

    return () => {
      clearTimeout(iphoneTimer);
      clearTimeout(card1Timer);
      clearTimeout(card2Timer);
      clearTimeout(card3Timer);
      clearTimeout(card4Timer);
      clearTimeout(darkModeTimer);
    };
  }, []);

  const getCardVisibility = (cardId: number) => {
    switch (cardId) {
      case 1:
        return animationState.card1Visible;
      case 2:
        return animationState.card2Visible;
      case 3:
        return animationState.card3Visible;
      case 4:
        return animationState.card4Visible;
      default:
        return false;
    }
  };

  return (
    <div
      className="relative w-full rounded-none md:rounded-lg overflow-hidden md:max-h-[600px] lg:max-h-[550px]"
      style={{ aspectRatio: '1152/600', minHeight: 'clamp(300px, 50vw, 500px)' }}
    >
      {/* Background Image - Always visible */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/figma-reference/gcsd_thumbnail_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Mode Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          opacity: animationState.darkMode ? 1 : 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'brightness(0.8) saturate(0.9)',
        }}
      />

      {/* Main Container */}
      <div className="relative w-full h-full flex items-center justify-center p-8 md:p-1">
        {/* iPhone Mockup Container */}
        <div
          className={`relative ${animationState.iphoneVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            width: 'min(1400px, 100vw)',
            height: 'min(100%, 600px)',
            maxWidth: '100%',
            zIndex: 10,
            transform: animationState.iphoneVisible ? 'translateY(20%) scale(1)' : 'translateY(50%) scale(0.85)',
            transition: 'transform 2400ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1600ms ease-out',
          }}
        >
          {/* iPhone Mockup SVG - Light Mode */}
          <div
            className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: animationState.darkMode ? 0 : 1,
              // filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4))',
            }}
          >
            <img
              src="/figma-reference/iphone-mockup_light.svg"
              alt="iPhone Mockup Light"
              className="w-full h-full object-contain"
              style={{
                transform: 'scale(1.2)',
              }}
            />
          </div>

          {/* iPhone Mockup SVG - Dark Mode */}
          <div
            className="absolute inset-0 z-10 transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: animationState.darkMode ? 1 : 0,
              // filter: 'drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4))',
            }}
          >
            <img
              src="/figma-reference/iphone-mockup_dark.svg"
              alt="iPhone Mockup Dark"
              className="w-full h-full object-contain"
              style={{
                transform: 'scale(1.2)',
              }}
            />
          </div>
        </div>

        {/* Key Insights Cards */}
        {keyInsights.map((card) => {
          const isVisible = getCardVisibility(card.id);

          // Mobile positions
          const mobilePositionStyles: Record<string, React.CSSProperties> = {
            'top-left': {
              top: '0px',
              left: '-50px',
            },
            'top-right': {
              top: '20px',
              right: '-50px',
            },
            'bottom-left': {
              bottom: '-20px',
              left: '-30px',
            },
            'bottom-right': {
              bottom: '0px',
              right: '-30px',
            },
          };

          // Desktop positions
          const desktopPositionStyles: Record<string, React.CSSProperties> = {
            'top-left': {
              //  clamp(最小値, 値, 最大値)
              top: 'clamp(32px, 3%, 48px)',
              left: 'clamp(80px, 8%, 120px)',
            },
            'top-right': {
              top: 'clamp(90px, 10%, 120px)',
              right: 'clamp(100px, 8%, 104px)',
            },
            'bottom-left': {
              bottom: 'clamp(50px, 5%, 72px)',
              left: 'clamp(160px, 14%, 210px)',
            },
            'bottom-right': {
              bottom: 'clamp(40px, 14%, 80px)',
              right: 'clamp(40px, 12%, 159px)',
            },
          };

          const positionStyles = isMobile ? mobilePositionStyles : desktopPositionStyles;

          // Calculate transform with mobile scale
          const baseScale = isMobile ? 0.5 : 1;
          const baseTransform = isVisible
            ? `translateY(0) scale(${baseScale})`
            : `translateY(100%) scale(${baseScale * 0.5})`;

          return (
            <div
              key={card.id}
              className={`absolute ${isVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{
                width: card.width || 'clamp(234px, 23.4vw, 239px)',
                minHeight: '135px',
                zIndex: 20,
                backdropFilter: 'blur(2px)',
                backgroundColor: animationState.darkMode ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                border: `0.5px solid ${animationState.darkMode ? 'rgba(64, 64, 64, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '10px',
                // boxShadow: '0px 0px 20.923px 0px rgba(0, 0, 0, 0.2)',
                transform: baseTransform,
                transition: 'transform 2400ms cubic-bezier(0.25, 0.1, 0.25, 1), opacity 1800ms ease-out',
                ...positionStyles[card.position],
              }}
            >
              <div className="flex items-start gap-3 p-5">
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <h4
                    className={`text-body-base font-merriweather leading-[1.2] transition-colors duration-5000 ease-in-out ${
                      animationState.darkMode ? 'text-gray-200' : 'text-gray-600'
                    }`}
                  >
                    {card.title}
                  </h4>
                  <p
                    className={`text-body-3xl font-semibold leading-[1.2] tracking-[-0.4px] transition-colors duration-500 ease-in-out ${
                      animationState.darkMode ? 'text-white' : 'text-[#101828]'
                    }`}
                  >
                    {card.value}
                  </p>
                  <p
                    className={`text-body-base leading-[1.2] transition-colors duration-500 ease-in-out ${
                      animationState.darkMode ? 'text-gray-200' : 'text-gray-600'
                    }`}
                  >
                    {card.subtitle}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 p-2 rounded-lg transition-colors duration-500 ease-in-out"
                  style={{
                    backgroundColor: animationState.darkMode
                      ? card.iconBgColor?.dark || 'rgba(217, 249, 157, 0.1)'
                      : card.iconBgColor?.light || '#f7fee7',
                  }}
                >
                  <div className="transition-colors duration-500 ease-in-out text-[#65a30d]">{card.icon}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GymDashboardHero;
