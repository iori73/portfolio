'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { Episode, Cluster, CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from './types';

interface Props {
  episodes: Episode[];
  clusters: Cluster[];
  activeCluster: number | null;
  hoveredEpisode: string | null;
  onClusterClick: (clusterId: number | null) => void;
  onEpisodeHover: (episodeId: string | null) => void;
  onEpisodeClick: (episodeId: string) => void;
}

export default function KnowledgeConstellation({
  episodes,
  clusters,
  activeCluster,
  hoveredEpisode,
  onClusterClick,
  onEpisodeHover,
  onEpisodeClick,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    episode: Episode;
  } | null>(null);
  const transformRef = useRef(d3.zoomIdentity);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const getColor = useCallback(
    (episode: Episode) => {
      const cat = episode.category || 'Others';
      return CATEGORY_COLORS[cat] || DEFAULT_CATEGORY_COLOR;
    },
    []
  );

  const getScale = useCallback(() => {
    if (episodes.length === 0) return { xScale: d3.scaleLinear(), yScale: d3.scaleLinear() };

    const xExtent = d3.extent(episodes, (e) => e.embedding2d[0]) as [number, number];
    const yExtent = d3.extent(episodes, (e) => e.embedding2d[1]) as [number, number];

    const padding = 60;
    const xScale = d3
      .scaleLinear()
      .domain([xExtent[0] - 0.5, xExtent[1] + 0.5])
      .range([padding, dimensions.width - padding]);
    const yScale = d3
      .scaleLinear()
      .domain([yExtent[0] - 0.5, yExtent[1] + 0.5])
      .range([padding, dimensions.height - padding]);

    return { xScale, yScale };
  }, [episodes, dimensions]);

  // Draw function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    const { xScale, yScale } = getScale();
    const t = transformRef.current;

    // Draw cluster connection lines (subtle)
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 0.5;
    for (const cluster of clusters) {
      const clusterEpisodes = episodes.filter((e) => e.cluster === cluster.id);
      const cx = t.applyX(xScale(cluster.center[0]));
      const cy = t.applyY(yScale(cluster.center[1]));

      for (const ep of clusterEpisodes) {
        const ex = t.applyX(xScale(ep.embedding2d[0]));
        const ey = t.applyY(yScale(ep.embedding2d[1]));
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
    }

    // Draw episode dots
    for (const ep of episodes) {
      const x = t.applyX(xScale(ep.embedding2d[0]));
      const y = t.applyY(yScale(ep.embedding2d[1]));
      const color = getColor(ep);
      const isActive = activeCluster === null || ep.cluster === activeCluster;
      const isHovered = hoveredEpisode === ep.id;

      const baseRadius = 4 * t.k;
      const radius = isHovered ? baseRadius * 1.8 : baseRadius;

      // Glow effect
      if (isActive) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        gradient.addColorStop(0, color + '40');
        gradient.addColorStop(1, color + '00');
        ctx.globalAlpha = isHovered ? 0.6 : 0.3;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dot
      ctx.globalAlpha = isActive ? 0.9 : 0.15;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      if (isActive) {
        ctx.globalAlpha = isHovered ? 1 : 0.7;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw cluster labels
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    for (const cluster of clusters) {
      const cx = t.applyX(xScale(cluster.center[0]));
      const cy = t.applyY(yScale(cluster.center[1])) - 20 * t.k;
      const isActiveCluster = activeCluster === null || activeCluster === cluster.id;
      ctx.globalAlpha = isActiveCluster ? 0.6 : 0.15;
      ctx.fillText(cluster.label, cx, cy);
    }

    ctx.globalAlpha = 1;
  }, [episodes, clusters, dimensions, activeCluster, hoveredEpisode, getColor, getScale]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Zoom behavior
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const zoom = d3
      .zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        transformRef.current = event.transform;
        draw();
      });

    d3.select(canvas).call(zoom);

    return () => {
      d3.select(canvas).on('.zoom', null);
    };
  }, [dimensions, draw]);

  // Mouse interaction
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const { xScale, yScale } = getScale();
      const t = transformRef.current;

      let closest: Episode | null = null;
      let closestDist = 20;

      for (const ep of episodes) {
        const x = t.applyX(xScale(ep.embedding2d[0]));
        const y = t.applyY(yScale(ep.embedding2d[1]));
        const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (dist < closestDist) {
          closestDist = dist;
          closest = ep;
        }
      }

      if (closest) {
        const x = t.applyX(xScale(closest.embedding2d[0]));
        const y = t.applyY(yScale(closest.embedding2d[1]));
        setTooltip({ x, y, episode: closest });
        onEpisodeHover(closest.id);
        canvas.style.cursor = 'pointer';
      } else {
        setTooltip(null);
        onEpisodeHover(null);
        canvas.style.cursor = 'default';
      }
    },
    [episodes, getScale, onEpisodeHover]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (tooltip?.episode) {
        onEpisodeClick(tooltip.episode.id);
      } else {
        onClusterClick(null);
      }
    },
    [tooltip, onEpisodeClick, onClusterClick]
  );

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] md:min-h-[600px]">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: dimensions.width, height: dimensions.height }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setTooltip(null);
          onEpisodeHover(null);
        }}
        onClick={handleClick}
      />

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10 px-3 py-2 rounded-lg max-w-[280px]"
          style={{
            left: Math.min(tooltip.x + 12, dimensions.width - 290),
            top: tooltip.y - 60,
            backgroundColor: 'rgba(10, 10, 26, 0.95)',
            border: `1px solid ${getColor(tooltip.episode)}40`,
            backdropFilter: 'blur(8px)',
          }}
        >
          <p className="text-white text-body-sm font-medium leading-tight mb-1">
            {tooltip.episode.title}
          </p>
          <p className="text-caption" style={{ color: getColor(tooltip.episode) }}>
            {tooltip.episode.podcast}
          </p>
        </div>
      )}

      {/* Cluster filter pills */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => onClusterClick(null)}
          className={`px-3 py-1.5 rounded-full text-label font-space-grotesk transition-all ${
            activeCluster === null
              ? 'bg-white/20 text-white'
              : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70'
          }`}
        >
          All
        </button>
        {clusters.map((c) => (
          <button
            key={c.id}
            onClick={() => onClusterClick(activeCluster === c.id ? null : c.id)}
            className={`px-3 py-1.5 rounded-full text-label font-space-grotesk transition-all ${
              activeCluster === c.id
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
            style={{
              backgroundColor:
                activeCluster === c.id ? c.color + '40' : 'rgba(255,255,255,0.05)',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
