'use client';
import React, { useState, useEffect, useRef } from 'react';

interface DataPoint {
  datetime: Date;
  count: number;
  weekday: number;
  hour: number;
}

type Period = 'all' | 'lastmonth' | 'month' | 'week';

const InteractiveChart: React.FC = () => {
  const [currentPeriod, setCurrentPeriod] = useState<Period>('all');
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<any>(null);

  // サンプルデータ生成
  const generateSampleData = (days: number = 30): DataPoint[] => {
    const data: DataPoint[] = [];
    const now = new Date();

    for (let d = days; d > 0; d--) {
      for (let h = 7; h <= 22; h++) {
        const date = new Date(now);
        date.setDate(date.getDate() - d);
        date.setHours(h, Math.floor(Math.random() * 60), 0, 0);

        // 時間帯による混雑パターンをシミュレート
        let baseCount = 15;
        if (h >= 17 && h <= 20) baseCount = 35; // ピークタイム
        else if (h >= 11 && h <= 14) baseCount = 25; // ランチタイム
        else if (h < 9 || h > 21) baseCount = 10; // 早朝・深夜

        const count = Math.max(
          5,
          Math.min(45, baseCount + Math.floor(Math.random() * 20 - 10))
        );

        data.push({
          datetime: date,
          count: count,
          weekday: date.getDay(),
          hour: h,
        });
      }
    }

    return data;
  };

  useEffect(() => {
    const allData = generateSampleData(90);
    setChartData(allData);
  }, []);

  useEffect(() => {
    if (chartData.length === 0) return;

    const loadChartJS = async () => {
      // Chart.js の動的読み込み
      const { Chart, registerables } = await import('chart.js');
      
      Chart.register(...registerables);

      initChart(Chart);
    };

    loadChartJS();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, currentPeriod]);

  const initChart = (Chart: any) => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    // 既存のチャートを破棄
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const processedData = processDataForPeriod(currentPeriod);
    updateCanvasSize(processedData);

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(101, 163, 13, 0.6)');
    gradient.addColorStop(1, 'rgba(101, 163, 13, 0.0)');

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: processedData.map((point, index) => {
          const date = new Date(point.x);
          return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
        }),
        datasets: [
          {
            label: currentPeriod === 'all' ? 'Daily Average Crowd' : 'Gym Crowd',
            data: processedData.map(point => point.y),
            borderColor: '#65a30d',
            backgroundColor: gradient,
            tension: 0.4,
            fill: true,
            pointRadius: 3,
            pointBackgroundColor: '#65a30d',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'nearest',
          intersect: false,
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#333',
            bodyColor: '#666',
            padding: 10,
            callbacks: {
              title: function (tooltipItems: any[]) {
                const index = tooltipItems[0].dataIndex;
                const dataPoint = processedData[index];
                if (dataPoint) {
                  const date = new Date(dataPoint.x);
                  if (currentPeriod === 'all') {
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      weekday: 'long',
                    });
                  } else {
                    return date.toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      weekday: 'short',
                    });
                  }
                }
                return '';
              },
              label: function (context: any) {
                const count = context.parsed.y;
                let status = 'Empty';
                if (count >= 30) status = 'Crowded';
                else if (count >= 20) status = 'Slightly Crowded';
                
                const prefix = currentPeriod === 'all' ? 'Average ' : '';
                return `${prefix}${count} people (${status})`;
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxRotation: 0,
              minRotation: 0,
            },
          },
          y: {
            beginAtZero: true,
            max: 50,
            ticks: {
              stepSize: 10,
            },
          },
        },
      },
    });
  };

  const processDataForPeriod = (period: Period) => {
    const now = new Date();
    let filteredData = chartData;
    let useHourlyData = false;

    switch (period) {
      case 'week':
        filteredData = chartData.filter((d) => {
          const diff = (now.getTime() - d.datetime.getTime()) / (1000 * 60 * 60 * 24);
          return diff <= 7;
        });
        useHourlyData = true;
        break;
      case 'month':
        filteredData = chartData.filter((d) => {
          const diff = (now.getTime() - d.datetime.getTime()) / (1000 * 60 * 60 * 24);
          return diff <= 30;
        });
        useHourlyData = true;
        break;
      case 'lastmonth':
        filteredData = chartData.filter((d) => {
          const diff = (now.getTime() - d.datetime.getTime()) / (1000 * 60 * 60 * 24);
          return diff > 30 && diff <= 60;
        });
        useHourlyData = true;
        break;
      default:
        // 全期間：日単位の集約データ
        const dailyData: { [key: string]: number[] } = {};
        filteredData.forEach((d) => {
          const dateKey = d.datetime.toDateString();
          if (!dailyData[dateKey]) {
            dailyData[dateKey] = [];
          }
          dailyData[dateKey].push(d.count);
        });

        return Object.keys(dailyData)
          .map((date) => ({
            x: new Date(date),
            y: Math.round(
              dailyData[date].reduce((a, b) => a + b, 0) / dailyData[date].length
            ),
          }))
          .sort((a, b) => a.x.getTime() - b.x.getTime());
    }

    if (useHourlyData) {
      return filteredData.map((d) => ({
        x: d.datetime,
        y: d.count,
      }));
    }

    return [];
  };

  const updateCanvasSize = (data: any[]) => {
    if (!wrapperRef.current || !chartRef.current) return;

    const wrapper = wrapperRef.current;
    let chartWidth;

    if (currentPeriod === 'all') {
      const days = data.length;
      chartWidth = Math.min(
        wrapper.offsetWidth * 3,
        Math.max(wrapper.offsetWidth, days * 30)
      );
    } else if (currentPeriod === 'week') {
      chartWidth = wrapper.offsetWidth * 2;
    } else {
      chartWidth = wrapper.offsetWidth * 2.6;
    }

    chartRef.current.style.width = chartWidth + 'px';
    chartRef.current.parentElement!.style.width = chartWidth + 'px';
  };

  const handlePeriodChange = (period: Period) => {
    setCurrentPeriod(period);
    
    // 最新データにスクロール
    setTimeout(() => {
      if (wrapperRef.current) {
        wrapperRef.current.scrollLeft = wrapperRef.current.scrollWidth;
      }
    }, 100);
  };

  return (
    <div className="w-full">
      {/* Period Selector */}
      <div className="flex items-center gap-2 flex-wrap justify-center mb-5">
        {[
          { key: 'all', label: 'Entire period' },
          { key: 'lastmonth', label: 'Last month' },
          { key: 'month', label: 'This month' },
          { key: 'week', label: 'This week' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handlePeriodChange(key as Period)}
            className={`inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium leading-5 rounded-md cursor-pointer transition-all duration-200 border ${
              currentPeriod === key
                ? 'bg-gray-900 border-gray-900 text-white shadow-sm'
                : 'border-gray-300 bg-transparent text-gray-600 hover:bg-gray-100 hover:border-gray-400 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="relative bg-white border-radius-12 p-5 shadow-sm border border-gray-200 rounded-xl">
        <div
          ref={wrapperRef}
          className="relative overflow-x-auto overflow-y-hidden rounded-lg bg-white"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#65a30d #f1f1f1',
          }}
        >
          <div className="relative h-96 min-w-full pb-4">
            <canvas ref={chartRef} className="w-full h-full" />
          </div>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          height: 8px;
        }
        div::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb {
          background: #65a30d;
          border-radius: 10px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: #4d7c0f;
        }
      `}</style>
    </div>
  );
};

export default InteractiveChart;