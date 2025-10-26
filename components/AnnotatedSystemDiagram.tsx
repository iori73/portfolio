'use client';
import React, { useState } from 'react';

const AnnotatedSystemDiagram: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

  const annotationSections = [
    {
      id: 1,
      title: "Using the System Overview",
      description: "6つのセクションが放射状に配置されています。時計回りに：User Action（右上）→ iOS Shortcuts（右）→ iCloud Drive（右下）→ Weekly Process（左下）→ GitHub Actions（左）→ Dashboard（左上）",
      details: [
        "中央から外に向かって読む",
        "各セクションは独立した処理を表現",
        "外側の輪は自動化フローを示す"
      ]
    },
    {
      id: 2,
      title: "Reading the Flow",
      description: "外側の輪のlinear-gradientは、User Action（アプリを開く）→ iOS Shortcutsのポップアップ自動表示 → クリックでスクショ撮影 → iCloud Driveへ自動保存という流れを表現",
      details: [
        "緑色のグラデーションはスムーズな自動化",
        "ユーザーアクションが起点となる",
        "段階的な処理の連鎖を視覚化"
      ]
    },
    {
      id: 3,
      title: "Understanding the Patterns",
      description: "User Actionの7つのバーは日曜日から始まる1週間。各曜日のドット数は撮影回数の違いを表し、色の濃淡はジム利用者数の違いを表現",
      details: [
        "5つのドット = 比較的少ない撮影回数",
        "6つのドット = より多い撮影回数",
        "色の濃さ = ジムの混雑度合い",
        "週間パターンの可視化"
      ]
    },
    {
      id: 4,
      title: "Time-based Elements",
      description: "Weekly Processの7つの点は各曜日を表し、最初の点（日曜0:01自動実行）は他より長く表現。GitHub Actionsの弧はGitHubブランドスタイルを引用",
      details: [
        "日曜0:01の自動実行を強調",
        "週次処理のタイミング表示",
        "GitHub Actions = 継続的処理",
        "Dashboardは実際のBar chartのUI表現"
      ]
    }
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-6">
      {/* Main Layout: Diagram + Annotation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* SVG Diagram Section */}
        <div className="lg:col-span-2">
          <div className="relative bg-gray-50 rounded-lg p-4">
            <img
              src="/figma-reference/gym-system-diagram.svg"
              alt="Gym System Architecture Diagram"
              className="w-full h-auto max-w-full"
            />

            {/* Overlay arrows and indicators */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Reading Order Indicators */}
              <div className="absolute top-2 left-4">
                <div className="bg-green-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  1
                </div>
              </div>

              <div className="absolute top-6 right-8">
                <div className="bg-green-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  2
                </div>
              </div>

              <div className="absolute bottom-6 right-8">
                <div className="bg-green-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  3
                </div>
              </div>

              <div className="absolute bottom-6 left-4">
                <div className="bg-green-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  4
                </div>
              </div>

              <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                <div className="bg-green-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  5
                </div>
              </div>

              <div className="absolute top-1/3 left-6 transform -translate-y-1/2">
                <div className="bg-green-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                  6
                </div>
              </div>

              {/* Flow Direction Arrows */}
              <div className="absolute top-1/4 right-1/4">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-green-600 drop-shadow-md">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
                </svg>
              </div>

              <div className="absolute bottom-1/4 right-1/4 transform rotate-90">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-green-600 drop-shadow-md">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
                </svg>
              </div>

              <div className="absolute bottom-1/4 left-1/4 transform rotate-180">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-green-600 drop-shadow-md">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* HOW TO READ THE VISUALIZATION Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                HOW TO READ THE VISUALIZATION
              </h3>

              <div className="space-y-6">
                {annotationSections.map((section) => (
                  <div
                    key={section.id}
                    className={`border-l-4 pl-4 relative transition-all duration-300 cursor-pointer ${
                      hoveredSection === section.id || selectedSection === section.id
                        ? 'border-green-600 bg-green-50'
                        : 'border-green-500'
                    }`}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    onClick={() => setSelectedSection(selectedSection === section.id ? null : section.id)}
                  >
                    {/* Section Number */}
                    <div className="absolute -left-3 top-0">
                      <div className={`text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        hoveredSection === section.id || selectedSection === section.id
                          ? 'bg-green-700 scale-110'
                          : 'bg-green-600'
                      }`}>
                        {section.id}
                      </div>
                    </div>

                    <h4 className="font-medium text-gray-800 text-sm mb-2 ml-4">
                      {section.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-3 ml-4">
                      {section.description}
                    </p>

                    {/* Detailed explanation */}
                    <ul className="space-y-1 ml-4">
                      {section.details.map((detail, index) => (
                        <li key={index} className="text-xs text-gray-500 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Enhanced Legend */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 text-sm mb-3">
                  Visual Elements Guide
                </h4>

                {/* Color Legend */}
                <div className="mb-4">
                  <h5 className="text-xs font-medium text-gray-700 mb-2">Color Intensity</h5>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-300 rounded"></div>
                      <span className="text-xs text-gray-600">Low Gym Crowd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-stone-500 rounded"></div>
                      <span className="text-xs text-gray-600">Medium Gym Crowd</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-stone-700 rounded"></div>
                      <span className="text-xs text-gray-600">High Gym Crowd</span>
                    </div>
                  </div>
                </div>

                {/* Pattern Legend */}
                <div className="mb-4">
                  <h5 className="text-xs font-medium text-gray-700 mb-2">Pattern Meaning</h5>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-lime-400 rounded-full opacity-80"></div>
                      <span className="text-xs text-gray-600">Screenshot Events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-1 bg-gray-400 rounded"></div>
                      <span className="text-xs text-gray-600">Weekly Timeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-1 bg-lime-400 rounded opacity-80"></div>
                      <span className="text-xs text-gray-600">Automation Flow</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          {selectedSection
            ? `Section ${selectedSection} selected - Click to deselect or explore other sections`
            : 'Click numbered sections for highlighted viewing • Hover for preview'
          }
        </p>
      </div>
    </div>
  );
};

export default AnnotatedSystemDiagram;