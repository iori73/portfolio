'use client';
import React, { useState } from 'react';
import { User, Smartphone, Cloud, Calendar, Github, BarChart3 } from 'lucide-react';

interface SectionData {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  angle: number;
  tooltip: string;
}

const SystemArchitectureDiagram: React.FC = () => {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [clickedSection, setClickedSection] = useState<number | null>(null);

  const sections: SectionData[] = [
    {
      id: 1,
      title: "User Action",
      subtitle: "ジム訪問時",
      icon: <User className="w-6 h-6" />,
      angle: 0,
      tooltip: "ジム利用時にiPhoneでデータ記録を開始"
    },
    {
      id: 2,
      title: "iOS Shortcuts",
      subtitle: "手動実行",
      icon: <Smartphone className="w-6 h-6" />,
      angle: 60,
      tooltip: "ショートカットアプリで手動でデータ処理を実行"
    },
    {
      id: 3,
      title: "iCloud Drive",
      subtitle: "自動同期",
      icon: <Cloud className="w-6 h-6" />,
      angle: 120,
      tooltip: "iCloud Driveを通じて自動的にデータを同期"
    },
    {
      id: 4,
      title: "Weekly Process",
      subtitle: "手動処理",
      icon: <Calendar className="w-6 h-6" />,
      angle: 180,
      tooltip: "週次でデータの手動処理とレビューを実施"
    },
    {
      id: 5,
      title: "GitHub Actions",
      subtitle: "CI/CD自動化",
      icon: <Github className="w-6 h-6" />,
      angle: 240,
      tooltip: "GitHub Actionsによる継続的インテグレーション"
    },
    {
      id: 6,
      title: "Dashboard",
      subtitle: "OCR + 可視化",
      icon: <BarChart3 className="w-6 h-6" />,
      angle: 300,
      tooltip: "OCR処理とデータの可視化ダッシュボード"
    }
  ];

  // SVG内での座標計算
  const centerX = 400;
  const centerY = 300;
  const radius = 180;

  // 各セクションの座標を計算
  const getSectionPath = (angle: number): string => {
    const startAngle = angle - 30;
    const endAngle = angle + 30;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  // テキストとアイコンの位置を計算
  const getTextPosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    const textRadius = radius * 0.7;
    return {
      x: centerX + textRadius * Math.cos(rad),
      y: centerY + textRadius * Math.sin(rad)
    };
  };

  const handleSectionClick = (sectionId: number) => {
    setClickedSection(clickedSection === sectionId ? null : sectionId);
  };

  // デフォルトで左半分（4,5,6）が表示される
  const getOpacity = (sectionId: number): number => {
    if (hoveredSection === sectionId) return 1;
    if (hoveredSection !== null && hoveredSection !== sectionId) return 0.1;
    if (clickedSection === sectionId) return 1;
    // デフォルト状態：左半分（4,5,6）のみ50%表示
    return [4, 5, 6].includes(sectionId) ? 0.5 : 0.1;
  };

  return (
    <div className="w-full">
      <div className="relative bg-white border border-gray-200 rounded-xl p-6">
        <svg width="800" height="600" viewBox="0 0 800 600" className="w-full h-auto">
          {/* 背景の円 */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity="0.3"
          />
          
          {/* 中央の十字線 */}
          <line
            x1={centerX}
            y1={centerY - radius}
            x2={centerX}
            y2={centerY + radius}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={centerX - radius}
            y1={centerY}
            x2={centerX + radius}
            y2={centerY}
            stroke="#374151"
            strokeWidth="2"
          />
          
          {/* セクション */}
          {sections.map((section) => (
            <g key={section.id}>
              {/* セクション背景 */}
              <path
                d={getSectionPath(section.angle)}
                fill="#ecfccb"
                opacity={getOpacity(section.id)}
                stroke="#65a30d"
                strokeWidth="1"
                className="cursor-pointer transition-opacity duration-300"
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={() => handleSectionClick(section.id)}
              />
              
              {/* アイコンとテキスト */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={() => handleSectionClick(section.id)}
              >
                {/* アイコン背景 */}
                <circle
                  cx={getTextPosition(section.angle).x}
                  cy={getTextPosition(section.angle).y - 20}
                  r="18"
                  fill="#374151"
                />
                
                {/* アイコン */}
                <foreignObject
                  x={getTextPosition(section.angle).x - 12}
                  y={getTextPosition(section.angle).y - 32}
                  width="24"
                  height="24"
                >
                  <div className="text-white flex items-center justify-center w-full h-full">
                    {section.icon}
                  </div>
                </foreignObject>
                
                {/* 番号 */}
                <text
                  x={getTextPosition(section.angle).x}
                  y={getTextPosition(section.angle).y + 15}
                  textAnchor="middle"
                  className="text-lg font-bold fill-gray-800"
                >
                  {section.id}.
                </text>
                
                {/* タイトル */}
                <text
                  x={getTextPosition(section.angle).x}
                  y={getTextPosition(section.angle).y + 35}
                  textAnchor="middle"
                  className="text-sm font-semibold fill-gray-800"
                >
                  {section.title}
                </text>
                
                {/* サブタイトル */}
                <text
                  x={getTextPosition(section.angle).x}
                  y={getTextPosition(section.angle).y + 50}
                  textAnchor="middle"
                  className="text-xs fill-gray-600"
                >
                  {section.subtitle}
                </text>
              </g>
            </g>
          ))}
          
          {/* 中央のポイント */}
          <circle
            cx={centerX}
            cy={centerY}
            r="4"
            fill="#374151"
          />
        </svg>
        
        {/* ツールチップ */}
        {clickedSection && (
          <div className="absolute top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-1 bg-blue-500 text-white text-xs rounded">
                Interaction
              </span>
            </div>
            <p className="text-sm text-gray-700">
              {sections.find(s => s.id === clickedSection)?.tooltip}
            </p>
          </div>
        )}
        
        {/* 下部テキスト */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">クリックで詳細表示</p>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitectureDiagram;