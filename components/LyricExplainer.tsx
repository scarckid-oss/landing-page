import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { HelpCircle, Send } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import { SectionTitle } from './SectionTitle';

const SkeletonLoader = () => (
    <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 animate-pulse" style={{ borderColor: APP_CONFIG.WARM_PINK }}>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mt-2"></div>
    </div>
);

export const LyricExplainer: React.FC = () => {
    const { WARM_PINK } = APP_CONFIG;
    const [explanation, setExplanation] = useState('');
    const [lyric, setLyric] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getExplanation = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!lyric.trim()) return;

        setIsLoading(true);
        setError('');
        setExplanation('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Explain the lyric: "${lyric}"`,
                config: {
                    systemInstruction: APP_CONFIG.AI_LYRIC_EXPLAINER_INSTRUCTION,
                }
            });
            setExplanation(response.text);
        } catch (e) {
            console.error(e);
            setError('The Oracle is currently silent on this matter. Please try another lyric.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <SectionTitle color={WARM_PINK}>
                {'// Decode The Message //'}
            </SectionTitle>
            <div className="p-6 bg-black/70 rounded-xl border-2 border-dashed" style={{ borderColor: WARM_PINK }}>
                 <p className="text-center text-gray-300 font-mono mb-6">
                    Enter a lyric from ScarceKID to receive its true meaning from the Oracle.
                </p>
                <form onSubmit={getExplanation} className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <HelpCircle size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={lyric}
                            onChange={(e) => setLyric(e.target.value)}
                            placeholder="e.g., 'The frequency awakens...'"
                            required
                            disabled={isLoading}
                            className="w-full bg-gray-900 border-2 text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-offset-2 font-mono"
                            // Fix: Cast style object to React.CSSProperties to allow for custom properties.
                            style={{
                                borderColor: WARM_PINK,
                                boxShadow: `0 0 5px ${WARM_PINK}`,
                                '--tw-ring-color': WARM_PINK,
                            } as React.CSSProperties}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || !lyric.trim()}
                        className="py-3 px-6 text-lg font-bold uppercase rounded-lg transition-all duration-300 text-black bg-white hover:scale-[1.05] active:scale-[0.98] shadow-[0_0_15px_rgba(255,77,109,0.9)] hover:shadow-[0_0_25px_rgba(255,77,109,1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        style={{ backgroundColor: WARM_PINK, color: '#111827' }}
                    >
                        <Send size={20} className="mr-2" />
                        Decode
                    </button>
                </form>

                {isLoading && <SkeletonLoader />}
                {error && <p className="text-red-500 text-center font-mono">{error}</p>}
                {explanation && (
                    <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 font-mono text-gray-300" style={{ borderColor: WARM_PINK }}>
                        <p className="italic">"{explanation}"</p>
                    </div>
                )}
            </div>
        </section>
    );
};
