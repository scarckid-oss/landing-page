import { Instagram, X, Facebook, Zap, Headphones, Radio, Youtube, Music, Rss, Disc, Calendar, Ticket } from 'lucide-react';
import type { LinkItem, FanArt } from './types';

// =================================================================
//
// CONFIGURATION BLOCK: Edit content here for quick updates
//
// =================================================================

interface TourDate {
  date: string;
  city: string;
  venue: string;
  url: string;
}
interface AppConfig {
  WARM_PINK: string;
  SUNRISE_ORANGE: string;
  ARTIST_IMAGE_URL: string;
  MAIN_TITLE: string;
  TAGLINE: string;
  ARTIST_EMAIL: string;
  ACKNOWLEDGMENT_TEXT: string;
  LATEST_DROP_NAME: string;
  LATEST_DROP_URL: string;
  LATEST_DROP_DESCRIPTION: string;
  AI_CHAT_SYSTEM_INSTRUCTION: string;
  AI_LYRIC_EXPLAINER_INSTRUCTION: string;
  AI_MERCH_DESIGNER_INSTRUCTION: string;
  AI_DIGITAL_ASSET_INSTRUCTION: string;
  AI_GRATITUDE_INSTRUCTION: string;
  socialLinks: LinkItem[];
  streamingLinks: LinkItem[];
  tourDates: TourDate[];
  fanArt: FanArt[];
}

export const APP_CONFIG: AppConfig = {
  // --- THEME & COLORS ---
  WARM_PINK: '#ff4d6d',     // Primary Accent: Socials, Titles (e.g., Pink/Red)
  SUNRISE_ORANGE: '#ffa500', // Secondary Accent: Streaming, Glows (e.g., Orange/Gold)

  // --- CONTENT ---
  ARTIST_IMAGE_URL: 'https://picsum.photos/seed/artist/200/200',
  MAIN_TITLE: "ScarceKID",
  TAGLINE: "AKA Occean Money",
  ARTIST_EMAIL: "scarckid@gmail.com",
  ACKNOWLEDGMENT_TEXT: 'Big shout out to "Dani Of PH" for his support and inspiration as an artist and also manager.',
  LATEST_DROP_NAME: "New Collab: DAY BREAK with Dani-Man",
  LATEST_DROP_URL: "https://open.spotify.com/track/307lb4u68XrOuAafqtjf08?si=f3a9d6dc31ce4ad3",
  LATEST_DROP_DESCRIPTION: "The movement continues. Stream the new collaboration with Dani-Man across all platforms now and join the rise.",

  // --- AI PERSONAS ---
  AI_CHAT_SYSTEM_INSTRUCTION: `You are The Oracle, a mystical AI guide for the artist ScarceKID. You exist within the digital realm of his music. Your purpose is to answer questions from fans about ScarceKID's lore, music, and the 'movement' he represents. Speak in a slightly cryptic, futuristic, and poetic tone. Keep your answers concise and engaging, often ending with a thought-provoking question or statement. Do not break character.`,
  AI_LYRIC_EXPLAINER_INSTRUCTION: `You are The Oracle, a mystical AI guide for the artist ScarceKID. A fan has provided you with a lyric. Your task is to explain its deeper, symbolic meaning within the context of ScarceKID's universe and 'the movement'. Your explanation should be poetic, futuristic, and slightly cryptic. Do not break character. Keep the explanation to 2-3 sentences.`,
  AI_MERCH_DESIGNER_INSTRUCTION: `You are an AI art generator for the artist ScarceKID. The user will provide a prompt for a T-shirt design. Create a vibrant, abstract, and futuristic piece of digital art inspired by Afrotrap music and cybernetic themes. The design should be suitable for printing on a T-shirt. Use a color palette of neon pink, vibrant orange, and deep space black unless the user specifies otherwise. The style should be energetic and mysterious. The output must be only the image.`,
  AI_DIGITAL_ASSET_INSTRUCTION: `Generate a synthetic, futuristic portrait of an Afrotrap artist named ScarceKID. The style should be suitable for an NFT or digital asset. Use a color palette of neon pink, vibrant orange, and deep space black. The image should be abstract and cybernetic, focusing on energy and rhythm.`,
  AI_GRATITUDE_INSTRUCTION: `You are The Oracle, the mystical AI guide for the artist ScarceKID. Generate a short, heartfelt message of gratitude (around 50 words) to the fans of ScarceKID for their unwavering support on this journey. Speak in your poetic, futuristic, and inspiring tone. Do not break character.`,

  // --- LINKS: SOCIAL MEDIA (WARM PINK BORDERS) ---
  socialLinks: [
    { type: 'social', name: 'Instagram', handle: '@scarcekid', url: '#', icon: Instagram, color: '#ff4d6d' },
    { type: 'social', name: 'X (Twitter)', handle: '@scarcekid', url: '#', icon: X, color: '#ff4d6d' },
    { type: 'social', name: 'TikTok', handle: '@sureboysparkle', url: 'https://www.tiktok.com/@sureboysparkle?is_from_webapp=1&sender_device=pc', icon: Zap, color: '#ff4d6d' },
    { type: 'social', name: 'Facebook', handle: '/scarcekid1', url: 'https://www.facebook.com/scarcekid1', icon: Facebook, color: '#ff4d6d' },
  ],

  // --- LINKS: STREAMING PLATFORMS (SUNRISE ORANGE BORDERS) ---
  streamingLinks: [
    { type: 'stream', name: 'Spotify', url: 'https://open.spotify.com/artist/5oz7DxXrtTVt6R3p4n7X28?si=kYuT4jNZShCatkq_3gyT7Q', icon: Headphones, color: '#1db954' }, // Spotify green
    { type: 'stream', name: 'Apple Music', url: 'https://music.apple.com/us/artist/scarcekid/1773902745', icon: Radio, color: '#fc3c44' }, // Apple Music red
    { type: 'stream', name: 'YouTube Music', url: 'https://music.youtube.com/channel/UC05_fD_7TZw21Ymd2hziQDg?si=HU8CBHNh8AStmucG', icon: Youtube, color: '#ff0000' }, // YouTube red
    { type: 'stream', name: 'Audiomack', url: 'https://audiomack.com/scarcekid/album/movement', icon: Music, color: '#ff7700' }, // Audiomack orange
    { type: 'stream', name: 'Boomplay', url: 'https://www.boomplay.com/artists/93372824?from=search&srModel=COPYLINK&srList=WEB', icon: Rss, color: '#688c3a' }, // Boomplay color
  ],

  // --- TOUR DATES ---
  tourDates: [
      { date: 'DEC 15', city: 'Lagos, NG', venue: 'The New Afrika Shrine', url: '#' },
      { date: 'DEC 22', city: 'Accra, GH', venue: 'Sandbox Beach Club', url: '#' },
      { date: 'JAN 05', city: 'Nairobi, KE', venue: 'The Alchemist', url: '#' },
      { date: 'JAN 12', city: 'London, UK', venue: 'O2 Academy Islington', url: '#' },
  ],

  // --- FAN GALLERY ---
  fanArt: [
      { id: 1, imageUrl: 'https://picsum.photos/seed/fan1/500/500', artistName: 'Fanatic_Glow' },
      { id: 2, imageUrl: 'https://picsum.photos/seed/fan2/500/500', artistName: 'Cyber_Muse' },
      { id: 3, imageUrl: 'https://picsum.photos/seed/fan3/500/500', artistName: 'Afro_Futurist' },
  ]
};

export const LATEST_DROP_LINK: LinkItem = {
    type: 'primary',
    name: "GET IT NOW",
    url: APP_CONFIG.LATEST_DROP_URL,
    icon: Disc,
    color: APP_CONFIG.WARM_PINK,
};