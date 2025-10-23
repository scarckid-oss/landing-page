import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import MarkdownIt from 'markdown-it';
import { Bot } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import { SectionTitle } from './SectionTitle';

const md = new MarkdownIt();

const SkeletonLoader = () => (
    <div className="space-y-3 animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
);


export const ArtistBio: React.FC = () => {
    const { WARM_PINK } = APP_CONFIG;
    const [bio, setBio] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateBio = async () => {
        setIsLoading(true);
        setError('');
        setBio('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: 'Generate a short, mystical, and futuristic artist bio for an Afro Trap artist named ScarceKID. The bio should be around 100 words, referencing themes of awakening, the future of music, and a movement. Use markdown for formatting.',
            });
            setBio(md.render(response.text));
        } catch (e) {
            console.error(e);
            setError('Failed to generate bio. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <SectionTitle color={WARM_PINK}>
                {'// the oracle //'}
            </SectionTitle>
            <div className="p-6 bg-black/70 rounded-xl border-2 border-dashed text-center" style={{ borderColor: WARM_PINK }}>
                {!bio && !isLoading && (
                     <p className="text-gray-300 font-mono mb-6">
                        Click the button below to generate an AI-powered bio for ScarceKID.
                    </p>
                )}
                {isLoading && <SkeletonLoader />}
                {error && <p className="text-red-500">{error}</p>}
                {bio && (
                    <div
                        className="prose prose-invert text-left text-gray-300 mx-auto"
                        dangerouslySetInnerHTML={{ __html: bio }}
                    />
                )}
                 <button
                    onClick={generateBio}
                    disabled={isLoading}
                    className="group relative overflow-hidden font-mono transition-all duration-300 rounded-lg border-2 
                        hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-offset-2
                        bg-black/70 text-white flex items-center justify-center
                        py-3 px-6 text-lg font-bold border-[var(--border-color)] ring-[var(--ring-color)] mt-6 mx-auto
                        shadow-[0_0_15px_var(--shadow-color)] hover:shadow-[0_0_25px_var(--hover-shadow-color)]
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    // Fix: Cast style object to React.CSSProperties to allow for custom properties.
                    style={{
                        '--border-color': WARM_PINK,
                        '--ring-color': WARM_PINK,
                        '--shadow-color': 'rgba(255,77,109,0.7)',
                        '--hover-shadow-color': 'rgba(255,77,109,1)',
                    } as React.CSSProperties}
                >
                     <div className="absolute inset-0 bg-pink-500 opacity-10 transition-opacity duration-300 group-hover:opacity-20"></div>
                     <Bot size={24} className="mr-2 z-10" />
                     <span className="z-10">{isLoading ? 'GENERATING...' : 'GENERATE BIO'}</span>
                </button>
            </div>
        </section>
    );
};
