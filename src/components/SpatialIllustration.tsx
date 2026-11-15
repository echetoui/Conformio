import React, { useState } from 'react';
import { Activity, BrainCircuit, ChartNoAxesCombined, FileCheck2, Globe2, Layers3, PlugZap, Radar, ShieldCheck, Timer, Waypoints, Zap } from 'lucide-react';

export type SpatialIllustrationVariant =
  | 'shield'
  | 'automation'
  | 'time'
  | 'analytics'
  | 'connect'
  | 'intelligence'
  | 'roadmap'
  | 'monitoring';

const variantIcons = {
  shield: ShieldCheck,
  automation: Zap,
  time: Timer,
  analytics: ChartNoAxesCombined,
  connect: PlugZap,
  intelligence: BrainCircuit,
  roadmap: Waypoints,
  monitoring: Activity,
};

interface SpatialIllustrationProps {
  variant: SpatialIllustrationVariant;
  label?: string;
  compact?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

export function SpatialIllustration({ variant, label, compact = false, imageSrc, imageAlt = '' }: SpatialIllustrationProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = variantIcons[variant];

  return (
    <div className={`spatial-illustration spatial-illustration-${variant}${compact ? ' spatial-illustration-compact' : ''}${imageLoaded ? ' spatial-illustration-has-image' : ''}`} aria-hidden={imageAlt ? undefined : true}>
      {imageSrc && !imageFailed && (
        <img
          src={imageSrc}
          srcSet={`${imageSrc.replace(/\.webp$/, '-360.webp')} 360w, ${imageSrc} 720w`}
          sizes="(max-width: 640px) 100vw, 50vw"
          alt={imageAlt}
          className={`spatial-illustration-image${imageLoaded ? ' spatial-illustration-image-loaded' : ''}`}
          loading="lazy"
          decoding="async"
          width={720}
          height={420}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="spatial-illustration-grid" aria-hidden="true" />
      <div className="spatial-illustration-glow" aria-hidden="true" />
      <div className="spatial-illustration-orbit spatial-illustration-orbit-one" aria-hidden="true" />
      <div className="spatial-illustration-orbit spatial-illustration-orbit-two" aria-hidden="true" />
      <div className="spatial-illustration-core" aria-hidden="true">
        <Icon className="h-8 w-8" strokeWidth={1.4} aria-hidden="true" />
      </div>
      <span className="spatial-illustration-node spatial-illustration-node-one" aria-hidden="true" />
      <span className="spatial-illustration-node spatial-illustration-node-two" aria-hidden="true" />
      {label && <span className="spatial-illustration-label" aria-hidden="true">{label}</span>}
    </div>
  );
}

interface SpatialInterfacePreviewProps {
  variant: SpatialIllustrationVariant;
  imageSrc?: string;
  imageAlt?: string;
}

export function SpatialInterfacePreview({ variant, imageSrc, imageAlt = '' }: SpatialInterfacePreviewProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = variantIcons[variant];

  return (
    <div
      className={`spatial-interface-preview spatial-interface-preview-${variant}${imageLoaded ? ' spatial-interface-preview-has-image' : ''}`}
    >
      {imageSrc && !imageFailed && (
        <img
          src={imageSrc}
          srcSet={`${imageSrc.replace(/\.webp$/, '-360.webp')} 360w, ${imageSrc} 720w`}
          sizes="(max-width: 640px) 100vw, 25vw"
          alt={imageAlt}
          className={`spatial-interface-preview-image${imageLoaded ? ' spatial-interface-preview-image-loaded' : ''}`}
          loading="lazy"
          decoding="async"
          width={720}
          height={420}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
      )}
      <div className="spatial-interface-fallback" aria-hidden="true">
        <div className="spatial-interface-toolbar">
          <span className="spatial-interface-dot" />
          <span className="spatial-interface-dot" />
          <span className="spatial-interface-dot" />
          <span className="ml-auto h-2 w-16 rounded-full bg-white/10" />
        </div>
        <div className="spatial-interface-body">
          <div className="spatial-interface-sidebar">
            <span className="h-7 w-7 rounded-lg bg-cyan-300/20" />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="spatial-interface-content">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200">
                <Icon className="h-4 w-4" strokeWidth={1.6} />
              </div>
              <div className="space-y-1.5">
                <span className="block h-2 w-28 rounded-full bg-white/35" />
                <span className="block h-1.5 w-20 rounded-full bg-white/10" />
              </div>
            </div>
            <div className="spatial-interface-chart">
              <span className="chart-line chart-line-one" />
              <span className="chart-line chart-line-two" />
              <span className="chart-line chart-line-three" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <span className="h-8 rounded-lg bg-white/[0.06]" />
              <span className="h-8 rounded-lg bg-cyan-300/10" />
              <span className="h-8 rounded-lg bg-violet-300/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpatialStandardIcon({ variant }: { variant: 'soc2' | 'iso' | 'privacy' | 'tgv' | 'other' }) {
  const Icon = variant === 'soc2'
    ? ShieldCheck
    : variant === 'iso'
      ? FileCheck2
      : variant === 'privacy'
        ? Radar
        : variant === 'tgv'
          ? Globe2
          : Layers3;

  return (
    <div className={`spatial-standard-icon spatial-standard-icon-${variant}`} aria-hidden="true">
      <span className="spatial-standard-icon-ring" />
      <Icon className="h-6 w-6" strokeWidth={1.5} />
    </div>
  );
}
