import type React from 'react';
import type { LucideProps } from 'lucide-react';

export interface LinkItem {
  type: 'social' | 'stream' | 'primary';
  name: string;
  url: string;
  icon: React.ComponentType<LucideProps>;
  color: string;
  handle?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface FanArt {
  id: number;
  imageUrl: string;
  artistName: string;
  isAiGenerated?: boolean;
}