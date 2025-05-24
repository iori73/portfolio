//  /app/about/InterestsVisualization.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { useJPFontSize } from '@/src/lib/i18n';

interface InterestNode {
  name: string;
  curve?: string;
  color?: string;
  children?: InterestNode[];
}

interface InterestData {
  name: string;
  children: InterestNode[];
}

const InterestsVisualization: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { jpFontSize } = useJPFontSize();

  // ✅ useState を useEffect の前に配置
  const [scaleFactor, setScaleFactor] = useState(1.2); // 初期値: デスクトップ

  useEffect(() => {
    const updateScaleFactor = () => {
      if (window.innerWidth < 768) {
        setScaleFactor(1.7); // モバイル
      } else {
        setScaleFactor(1.5); // デスクトップ
      }
    };

    // 初回実行 & ウィンドウサイズ変更時に適用
    updateScaleFactor();
    window.addEventListener('resize', updateScaleFactor);

    return () => window.removeEventListener('resize', updateScaleFactor);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/my_interests_colors.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: InterestData = await response.json();
        createVisualization(data);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, [scaleFactor]); // ✅ `scaleFactor` が変わったら再レンダリング

  const createVisualization = (data: InterestData) => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 1000;

    svg
      .attr('viewBox', [-width / 2, -height / 3, width, height])
      .attr('width', '100%')
      .attr('height', 'auto')
      .style('overflow', 'hidden')
      .style('display', 'block');

    const g = svg.append('g').attr('transform', `scale(${scaleFactor})`);

    const root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();
    const mainCategories = nodes.filter((d) => d.depth === 1);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance((d: any) => (d.source.depth === 0 ? 100 : 80)),
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(0, 110))
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    const defs = g.append('defs');

    mainCategories.forEach((node, i) => {
      defs.append('path').attr('id', `arcPath-${i}`).attr('d', 'M 0,0 A 40,40 0 0,1 0,0');
    });

    const link = g
      .append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.4)
      .attr('stroke-width', (d) => (d.source.depth === 0 ? 2 : 1));

    const node = g.append('g').selectAll('.node').data(nodes).join('g').attr('class', 'node').call(drag(simulation));

    node
      .append('circle')
      .attr('r', (d) => (d.depth === 0 ? 30 : d.depth === 1 ? 20 : 8))
      .attr('fill', (d) => d.data.color || (d.depth === 0 ? '#fff' : '#ccc'))
      .attr('stroke', '#333')
      .attr('stroke-width', 1.5);

    node
      .append('text')
      .attr('dy', (d) => (d.depth === 0 ? -35 : -25))
      .attr('text-anchor', 'middle')
      .attr('font-size', (d) => (d.depth === 0 ? '18px' : d.depth === 1 ? '16px' : '12px'))
      .text((d) => d.data.name);

    mainCategories.forEach((n, i) => {
      g.append('text')
        .attr('class', `curved-text-${i}`)
        .attr('dy', -5)
        .attr('font-size', '12px')
        .attr('fill', n.data.color || '#333')
        .append('textPath')
        .attr('href', `#arcPath-${i}`)
        .attr('startOffset', '50%')
        .attr('text-anchor', 'middle')
        .text(n.data.curve || '');
    });

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);

      mainCategories.forEach((n, i) => {
        defs.select(`#arcPath-${i}`).attr('d', `M ${n.x! - 40},${n.y!} A 40,40 0 0,1 ${n.x! + 40},${n.y!}`);
      });
    });

    function drag(simulation: d3.Simulation<any, any>) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag<SVGGElement, unknown>().on('start', dragstarted).on('drag', dragged).on('end', dragended);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center py-4 gap-8 md:gap-4">
      <div
        className="flex items-center justify-center gap-2 py-2 px-4 rounded-[16px] bg-[#f5f5f7] text-[#696969]"
        // style={{
        //   backgroundColor: '#646464',
        //   borderRadius: '100px',
        // }}
      >
        <img src="/about/drag_icon.svg" alt="Drag icon" width={32} height={32} className="flex-shrink-0" />
        <p
          className={`font-space-mono ${jpFontSize(
            'text-caption-xxxs-120',
            'text-caption-s-120',
            'text-caption-xxs-120',
            'text-caption-m-120',
          )}`}
          style={{
            color: '#0A0A0A',
          }}
        >
          You can drag me
        </p>
      </div>
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default InterestsVisualization;
