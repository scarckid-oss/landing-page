import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Heart, Bot } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import { SectionTitle } from './SectionTitle';

const SkeletonLoader = () => (
    <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 animate-pulse" style={{ borderColor: APP_CONFIG.WARM_PINK }}>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-2/3 mt-2"></div>
    </div>
);

export const Acknowledgement: React.FC = () => {
    const { WARM_PINK, ACKNOWLEDGMENT_TEXT } = APP_CONFIG;
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateMessage = async () => {
        setIsLoading(true);
        setError('');
        setMessage('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: APP_CONFIG.AI_GRATITUDE_INSTRUCTION,
            });
            setMessage(response.text);
        } catch (e) {
            console.error(e);
            setError('The Oracle is gathering its thoughts. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <SectionTitle color={WARM_PINK}>
                {'// Gratitude //'}
            </SectionTitle>
            <div className="p-6 bg-black/70 rounded-xl border-2 border-dashed text-center" style={{ borderColor: WARM_PINK }}>
                <p className="text-gray-300 font-mono mb-6 italic">
                   "{ACKNOWLEDGMENT_TEXT}"
                </p>
                <div className="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent w-3/4 mx-auto my-6 opacity-50"></div>
                
                {isLoading && <SkeletonLoader />}
                {error && <p className="text-red-500 text-center font-mono">{error}</p>}
                {message && (
                    <div className="p-4 bg-gray-900/50 rounded-lg border-l-4 font-mono text-gray-300" style={{ borderColor: WARM_PINK }}>
                        <p className="italic">"{message}"</p>
                    </div>
                )}
                
                {!isLoading && !message && (
                     <p className="text-gray-400 font-mono mb-6">
                        A message from the Oracle to the fans...
                    </p>
                )}

                <button
                    onClick={generateMessage}
                    disabled={isLoading}
                    className="group relative overflow-hidden font-mono transition-all duration-300 rounded-lg border-2 
                        hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-offset-2
                        bg-black/70 text-white flex items-center justify-center
                        py-3 px-6 text-lg font-bold border-[var(--border-color)] ring-[var(--ring-color)] mt-6 mx-auto
                        shadow-[0_0_15px_var(--shadow-color)] hover:shadow-[0_0_25px_var(--hover-shadow-color)]
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                        '--border-color': WARM_PINK,
                        '--ring-color': WARM_PINK,
                        '--shadow-color': 'rgba(255,77,109,0.7)',
                        '--hover-shadow-color': 'rgba(255,77,109,1)',
                    } as React.CSSProperties}
                >
                     <div className="absolute inset-0 bg-pink-500 opacity-10 transition-opacity duration-300 group-hover:opacity-20"></div>
                     <Bot size={24} className="mr-2 z-10" />
                     <span className="z-10">{isLoading ? 'GENERATING...' : 'GENERATE MESSAGE'}</span>
                </button>
            </div>
        </section>
    );
};