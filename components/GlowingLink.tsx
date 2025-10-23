
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import type { LinkItem } from '../types';

type GlowingLinkProps = LinkItem;

export const GlowingLink: React.FC<GlowingLinkProps> = ({ name, url, icon: Icon, color, handle, type }) => {
  const { WARM_PINK, SUNRISE_ORANGE } = APP_CONFIG;
  const isStreaming = type === 'stream';
  const isPrimary = type === 'primary';

  let borderColor, ringColor, shadowColor, hoverShadowColor;

  if (isPrimary) {
    borderColor = WARM_PINK;
    ringColor = SUNRISE_ORANGE;
    shadowColor = 'rgba(255,165,0,0.7), 0 0 15px rgba(255,77,109,0.7)';
    hoverShadowColor = 'rgba(255,165,0,1), 0 0 25px rgba(255,77,109,1)';
  } else {
    borderColor = isStreaming ? SUNRISE_ORANGE : WARM_PINK;
    ringColor = isStreaming ? SUNRISE_ORANGE : WARM_PINK;
    shadowColor = isStreaming ? 'rgba(255,165,0,0.7)' : 'rgba(255,77,109,0.7)';
    hoverShadowColor = isStreaming ? 'rgba(255,165,0,1)' : 'rgba(255,77,109,1)';
  }
  
  const iconSize = isStreaming ? 24 : (isPrimary ? 36 : 32);

  // Fix: Cast style object to React.CSSProperties to allow for custom properties.
  const styles = {
    '--border-color': borderColor,
    '--ring-color': ringColor,
    '--shadow-color': shadowColor,
    '--hover-shadow-color': hoverShadowColor,
    '--bg-color': isStreaming ? SUNRISE_ORANGE : WARM_PINK,
  } as React.CSSProperties;
  
  const baseClasses = `
    group relative overflow-hidden font-mono transition-all duration-300 rounded-lg border-2 
    hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-offset-2
    bg-black/70 text-white
  `;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={styles}
      className={`${baseClasses} 
        ${isStreaming ? 'flex items-center' : 'flex flex-col items-center justify-center'}
        ${isPrimary ? 'py-5 px-8 text-xl font-extrabold border-4' : 'p-4'}
        border-[var(--border-color)] ring-[var(--ring-color)] 
        shadow-[0_0_15px_var(--shadow-color)] hover:shadow-[0_0_25px_var(--hover-shadow-color)]`}
    >
      <div className="absolute inset-0 bg-[var(--bg-color)] opacity-10 transition-opacity duration-300 group-hover:opacity-20"></div>
      <Icon size={iconSize} style={{ color: color }} className={`z-10 ${isStreaming ? 'mr-4' : 'mb-1'} transition-transform group-hover:scale-110`} />
      <span className={`${isStreaming ? 'text-lg' : 'text-base'} font-semibold z-10`}>{name}</span>
      {handle && <span className="text-xs text-gray-400 z-10">{handle}</span>}
      {isStreaming && <ArrowRight size={20} className="ml-auto z-10 opacity-70 group-hover:opacity-100 transition-opacity" />}
    </a>
  );
};
