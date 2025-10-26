'use client';
import React, { useState } from 'react';
import { User, Smartphone, Cloud, Calendar, Github, BarChart3 } from 'lucide-react';

interface SectionData {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  tooltip: string;
}

const GymSystemDiagram: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [clickedSection, setClickedSection] = useState<number | null>(null);

  const sections: SectionData[] = [
    {
      id: 1,
      title: 'User Action',
      subtitle: '好きな時に',
      icon: <User className="w-6 h-6" />,
      x: 226.391,
      y: 22.5879,
      tooltip: '気になった時にiPhoneでスクリーンショットを撮影しデータを記録',
    },
    {
      id: 2,
      title: 'iOS Shortcuts',
      subtitle: '手動実行',
      icon: <Smartphone className="w-6 h-6" />,
      x: 402.151,
      y: 124.232,
      tooltip: 'ショートカットアプリで手動でデータ処理を実行',
    },
    {
      id: 3,
      title: 'iCloud Drive',
      subtitle: '自動同期',
      icon: <Cloud className="w-6 h-6" />,
      x: 402.151,
      y: 327.519,
      tooltip: 'iCloud Driveを通じて自動的にデータを同期',
    },
    {
      id: 4,
      title: 'Weekly Process',
      subtitle: '手動処理',
      icon: <Calendar className="w-6 h-6" />,
      x: 226.391,
      y: 429.17,
      tooltip: '週次でデータの手動処理とレビューを実施',
    },
    {
      id: 5,
      title: 'GitHub Actions',
      subtitle: 'CI/CD自動化',
      icon: <Github className="w-6 h-6" />,
      x: 50.6348,
      y: 327.519,
      tooltip: 'GitHub Actionsによる継続的インテグレーション',
    },
    {
      id: 6,
      title: 'Dashboard',
      subtitle: 'OCR + 可視化',
      icon: <BarChart3 className="w-6 h-6" />,
      x: 50.6348,
      y: 124.231,
      tooltip: 'OCR処理とデータの可視化ダッシュボード',
    },
  ];

  const centerX = 226.391;
  const centerY = 225.879;

  const handleSectionClick = (sectionId: number) => {
    setClickedSection(clickedSection === sectionId ? null : sectionId);
  };

  // ツールチップのアニメーション方向を取得
  const getTooltipAnimation = (sectionId: number) => {
    const animationClasses = {
      1: 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 slide-in-from-left-4', // 右上から
      2: 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 slide-in-from-right-8', // 右から
      3: 'animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 slide-in-from-left-16', // 右下から
      4: 'animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 slide-in-from-right-4', // 左下から
      5: 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 slide-in-from-right-8', // 左から
      6: 'animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 slide-in-from-right-4', // 左上から
    };

    return animationClasses[sectionId as keyof typeof animationClasses] || 'animate-in fade-in-0 zoom-in-95';
  };

  // ツールチップの位置を計算（各セクションのテキスト近くに配置）
  const getTooltipPosition = (sectionId: number) => {
    const textPos = getTextPosition(sectionId);

    // スマホ幅の判定
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    // スマホの場合は全て中央上部に固定
    if (isMobile) {
      return {
        x: 453 * 0.5, // 50%
        y: 452 * 0.1, // 10%
      };
    }

    // 各セクション専用の位置設定（デスクトップ）
    const customPositions = {
      1: { left: 0.76, top: 0.16 }, // User Action
      2: { left: 0.8, top: 0.38 }, // iOS Shortcuts
      3: { left: 0.75, top: 0.84 }, // iCloud Drive
      4: { left: 0.25, top: 0.84 }, // Weekly Process
      5: { left: 0.2, top: 0.38 }, // GitHub Actions - 右寄りに調整
      6: { left: 0.26, top: 0.16 }, // Dashboard
    };

    if (customPositions[sectionId as keyof typeof customPositions]) {
      const pos = customPositions[sectionId as keyof typeof customPositions];
      return {
        x: 453 * pos.left,
        y: 452 * pos.top,
      };
    }

    const angles = [30, 90, 150, 210, 270, 330];
    const angle = angles[sectionId - 1];

    // 角度に基づいてツールチップの位置を調整
    let offsetX = 0;
    let offsetY = 0;

    if (angle >= 0 && angle < 90) {
      // 右上象限
      offsetX = 60;
      offsetY = -10;
    } else if (angle >= 90 && angle < 180) {
      // 右下象限
      offsetX = 20;
      offsetY = 10;
    } else if (angle >= 180 && angle < 270) {
      // 左下象限
      offsetX = -160;
      offsetY = 10;
    } else {
      // 左上象限
      offsetX = -160;
      offsetY = -10;
    }

    return {
      x: textPos.x + offsetX,
      y: textPos.y + offsetY,
    };
  };

  // Figmaデザインに基づく6つのセクターパス（SVGから抽出）
  const getSectorPaths = () => {
    return [
      // セクター1 (上部)
      `M ${centerX} ${centerY} V 22.5878 C 301.038 22.5878 364.822 59.4734 402.147 124.231 L ${centerX} ${centerY} Z`,
      // セクター2 (右上)
      `M ${centerX} ${centerY} L 402.151 124.232 C 439.476 188.987 439.476 262.769 402.151 327.52 L ${centerX} ${centerY} Z`,
      // セクター3 (右下)
      `M ${centerX} ${centerY} L 402.151 327.519 C 364.825 392.276 301.042 429.17 226.391 429.17 V ${centerY} Z`,
      // セクター4 (下部)
      `M ${centerX} ${centerY} V 429.17 C 151.748 429.17 87.9602 392.276 50.6348 327.519 L ${centerX} ${centerY} Z`,
      // セクター5 (左下)
      `M ${centerX} ${centerY} L 50.634 327.52 C 13.3121 262.769 13.3121 188.987 50.634 124.232 L ${centerX} ${centerY} Z`,
      // セクター6 (左上)
      `M ${centerX} ${centerY} L 50.6348 124.231 C 87.9605 59.4735 151.748 22.5879 226.391 22.5879 V ${centerY} Z`,
    ];
  };

  // セクターの色を定義
  const getSectorColors = (sectionId: number) => {
    const colors = [
      '#F7FEE7', // セクター1
      '#ECFCCB', // セクター2
      '#D9F99D', // セクター3
      '#BEF264', // セクター4
      '#A3E635', // セクター5
      '#84CC16', // セクター6
    ];
    return colors[sectionId - 1];
  };

  // テキストとアイコンの位置を計算（円周上の適切な位置）
  const getTextPosition = (sectionId: number) => {
    const angles = [30, 90, 150, 210, 270, 330]; // 各セクターの角度
    const angle = angles[sectionId - 1];
    const radius = 135; // テキスト配置の半径
    const rad = (angle * Math.PI) / 180;

    return {
      x: centerX + radius * Math.cos(rad - Math.PI / 2),
      y: centerY + radius * Math.sin(rad - Math.PI / 2),
    };
  };

  return (
    <div className="relative w-full h-96 bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23666666' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <svg className="absolute inset-0 w-full h-[90%] top-[5%]" viewBox="0 0 453 452">
        {/* セクター */}
        {sections.map((section, index) => (
          <g key={section.id}>
            {/* セクター背景（Figmaデザインそのまま） */}
            <path
              d={getSectorPaths()[index]}
              fill={getSectorColors(section.id)}
              opacity={hoveredSection === null ? 0.5 : hoveredSection === section.id ? 0.8 : 0.2}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => handleSectionClick(section.id)}
            />
          </g>
        ))}

        {/* 中央から各セクターへの放射線（Figmaデザインから） */}
        <path
          d={`M ${centerX} ${centerY} V 0 M ${centerX} ${centerY} L 421.676 112.937 M ${centerX} ${centerY} L 421.68 338.812 M ${centerX} ${centerY} V 451.758 M ${centerX} ${centerY} L 31.1055 338.812 M ${centerX} ${centerY} L 31.1055 112.938`}
          stroke="#365314"
          strokeWidth="2"
          opacity="0.7"
        />

        {/* アイコンとテキスト */}
        {sections.map((section) => {
          const textPos = getTextPosition(section.id);
          return (
            <g
              key={`text-${section.id}`}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => handleSectionClick(section.id)}
            >
              {/* アイコン背景 */}
              <circle cx={textPos.x} cy={textPos.y - 18} r="14" fill="none" />

              {/* アイコン */}
              <foreignObject x={textPos.x - 12} y={textPos.y - 34} width="24" height="24">
                <div className="text-gray-800 flex items-center justify-center w-full h-full text-sm">
                  {section.icon}
                </div>
              </foreignObject>

              {/* タイトル */}
              <text x={textPos.x} y={textPos.y + 6} textAnchor="middle" className="text-s font-semibold fill-gray-800">
                {section.id}. {section.title}
              </text>

              {/* サブタイトル */}
              <text x={textPos.x} y={textPos.y + 24} textAnchor="middle" className="text-[14px] fill-gray-600">
                {section.subtitle}
              </text>
            </g>
          );
        })}

        {/* 中央点 */}
        <circle cx={centerX} cy={centerY} r="3" fill="#365314" />
      </svg>

      {/* ツールチップ */}
      {clickedSection && (
        <>
          {/* 背景オーバーレイ */}
          <div className="absolute inset-0 z-10" onClick={() => setClickedSection(null)} />
          {(() => {
            const tooltipPos = getTooltipPosition(clickedSection);
            return (
              <div
                className={`absolute bg-foreground text-background rounded-md px-3 py-1.5 text-xs z-20 ${getTooltipAnimation(
                  clickedSection,
                )} duration-200 ${
                  typeof window !== 'undefined' && window.innerWidth < 768
                    ? 'max-w-[280px] break-words'
                    : clickedSection === 5 || clickedSection === 2
                    ? 'max-w-[220px] break-words'
                    : 'max-w-sm'
                }`}
                style={{
                  left: `${(tooltipPos.x / 453) * 100}%`,
                  top: `${(tooltipPos.y / 452) * 100}%`,
                  transform:
                    typeof window !== 'undefined' && window.innerWidth < 768
                      ? 'translateX(-50%) translateY(-50%)'
                      : clickedSection === 5
                      ? 'translateX(-40%) translateY(-50%)'
                      : 'translateX(-50%) translateY(-50%)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="leading-3 text-[0.75rem]">{sections.find((s) => s.id === clickedSection)?.tooltip}</p>
              </div>
            );
          })()}
        </>
      )}
      

      {/* 下部テキスト */}
      <div className="absolute bottom-3 left-1/2 transform translate-x-1/2">
        <p className="text-xs text-gray-500">クリックで詳細表示</p>
      </div>
    </div>
  );
};

export default GymSystemDiagram;
