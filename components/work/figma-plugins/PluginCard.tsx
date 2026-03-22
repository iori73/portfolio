'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { PluginData } from './pluginData';
import { MoveUpRight } from 'lucide-react';

function formatUsers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

interface PluginCardProps {
  plugin: PluginData;
}

function PluginIcon({ plugin }: { plugin: PluginData }) {
  if (plugin.iconImage) {
    return (
      <div
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 overflow-hidden bg-white"
        style={{ '--tw-ring-color': plugin.accentColor } as React.CSSProperties}
      >
        <Image
          src={plugin.iconImage}
          alt={`${plugin.name} icon`}
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
    );
  }

  const initial = plugin.name.charAt(0);
  return (
    <div
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2 bg-white text-sm font-semibold"
      style={{
        '--tw-ring-color': plugin.accentColor,
        color: plugin.accentColor,
      } as React.CSSProperties}
    >
      {initial}
    </div>
  );
}

export default function PluginCard({ plugin }: PluginCardProps) {
  const t = useTranslations('figmaPlugins');
  const accent = plugin.accentColor;
  const Wrapper = plugin.link ? 'a' : 'div';
  const wrapperProps = plugin.link
    ? { href: plugin.link, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper {...wrapperProps} className={`group ${plugin.link ? 'block cursor-pointer' : 'block'}`}>
      {plugin.thumbnail && (
        <div className="relative w-full aspect-[16/9] rounded-xl bg-surface-muted overflow-hidden">
          <Image
            src={plugin.thumbnail}
            alt={`${plugin.name} preview`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <div className="pt-4">
        <div className="flex items-start gap-3">
          <PluginIcon plugin={plugin} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-title font-semibold text-ink truncate">{plugin.name}</h3>
              {plugin.link && (
                <MoveUpRight className="h-4 w-4 shrink-0 text-ink-tertiary opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 font-space-grotesk text-caption text-ink-tertiary">
              <span>{plugin.type}</span>
              {plugin.users != null && (
                <>
                  <span>·</span>
                  <span>{formatUsers(plugin.users)} users</span>
                </>
              )}
              {plugin.likes != null && (
                <>
                  <span>·</span>
                  <span>♡ {plugin.likes}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <p className="mt-3 text-body-sm text-ink-secondary leading-relaxed">
          {plugin.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {plugin.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 font-space-grotesk text-caption"
              style={{
                backgroundColor: `${accent}10`,
                color: accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {plugin.category === 'client-ds' && (
          <div className="mt-3 flex items-center gap-1.5">
            <div className="h-px flex-1" style={{ backgroundColor: `${accent}30` }} />
            <span className="font-space-grotesk text-caption text-ink-tertiary">
              {t('enterpriseDS')}
            </span>
            <div className="h-px flex-1" style={{ backgroundColor: `${accent}30` }} />
          </div>
        )}
      </div>
    </Wrapper>
  );
}
