
import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  color: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, color }) => (
  <h2
    className="text-3xl font-bold mb-6 text-center uppercase tracking-wider font-mono text-white"
    style={{ color: color, textShadow: `0 0 8px ${color}` }}
  >
    {children}
  </h2>
);
