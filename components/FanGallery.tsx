import React, { useState } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Bot, ImageIcon } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import type { FanArt } from '../types';
import { SectionTitle } from './SectionTitle';
import { Modal } from './Modal';

export const FanGallery: React.FC = () => {
    const { SUNRISE_ORANGE, WARM_PINK } = APP_CONFIG;
    const [gallery, setGallery] = useState<FanArt[]>(APP_CONFIG.fanArt);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedArt, setSelectedArt] = useState<FanArt | null>(null);

    const generateAiArt = async () => {
        setIsLoading(true);
        setError('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: {
                  parts: [
                    { text: APP_CONFIG.AI_DIGITAL_ASSET_INSTRUCTION },
                  ],
                },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });

            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                    const newArt: FanArt = {
                        id: Date.now(),
                        imageUrl,
                        artistName: 'The Oracle (AI)',
                        isAiGenerated: true,
                    };
                    setGallery(prev => [newArt, ...prev]);
                    break;
                }
            }
        } catch (e) {
            console.error(e);
            setError('The visual frequency is unstable. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <section>
            <SectionTitle color={SUNRISE_ORANGE}>
                {'// digital assets //'}
            </SectionTitle>
            <div className="p-6 bg-black/70 rounded-xl border-2 border-dashed" style={{ borderColor: SUNRISE_ORANGE }}>
                <div className="text-center mb-6">
                    <button
                        onClick={generateAiArt}
                        disabled={isLoading}
                        className="group relative overflow-hidden font-mono transition-all duration-300 rounded-lg border-2 
                            hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-offset-2
                            bg-black/70 text-white flex items-center justify-center
                            py-3 px-6 text-lg font-bold border-[var(--border-color)] ring-[var(--ring-color)] mx-auto
                            shadow-[0_0_15px_var(--shadow-color)] hover:shadow-[0_0_25px_var(--hover-shadow-color)]
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        // Fix: Cast style object to React.CSSProperties to allow for custom properties.
                        style={{
                           '--border-color': SUNRISE_ORANGE,
                           '--ring-color': SUNRISE_ORANGE,
                           '--shadow-color': 'rgba(255,165,0,0.7)',
                           '--hover-shadow-color': 'rgba(255,165,0,1)',
                        } as React.CSSProperties}
                    >
                        <div className="absolute inset-0 bg-amber-500 opacity-10 transition-opacity duration-300 group-hover:opacity-20"></div>
                        <Bot size={24} className="mr-2 z-10" />
                        <span className="z-10">{isLoading ? 'GENERATING...' : 'GENERATE ASSET'}</span>
                    </button>
                    {isLoading && <p className="text-amber-400 mt-2 font-mono text-sm">The Oracle is painting with light...</p>}
                    {error && <p className="text-red-500 mt-2 font-mono text-sm">{error}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map(art => (
                        // Fix: Cast style object to React.CSSProperties to allow for custom properties.
                        <button key={art.id} onClick={() => setSelectedArt(art)} className="group relative overflow-hidden rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black" style={{borderColor: art.isAiGenerated ? WARM_PINK : 'transparent', '--tw-ring-color': art.isAiGenerated ? WARM_PINK: SUNRISE_ORANGE} as React.CSSProperties}>
                            <img src={art.imageUrl} alt={`Fan art by ${art.artistName}`} className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 p-2 text-white font-mono">
                                <p className="text-sm font-bold flex items-center">
                                    {art.isAiGenerated ? <Bot size={14} className="mr-1 text-pink-400" /> : <ImageIcon size={14} className="mr-1 text-gray-400" />}
                                    {art.artistName}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
             {selectedArt && (
                <Modal isOpen={!!selectedArt} onClose={() => setSelectedArt(null)}>
                    <img src={selectedArt.imageUrl} alt={`Fan art by ${selectedArt.artistName}`} className="max-w-full max-h-[80vh] rounded-lg" />
                    <p className="text-center text-white font-mono mt-4 text-lg flex items-center justify-center">
                         {selectedArt.isAiGenerated ? <Bot size={18} className="mr-2 text-pink-400" /> : <ImageIcon size={18} className="mr-2 text-gray-400" />}
                        {selectedArt.artistName}
                    </p>
                </Modal>
            )}
        </section>
    );
};