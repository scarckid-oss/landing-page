import React, { useState } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Bot, Wand2 } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import { SectionTitle } from './SectionTitle';

const TshirtMockup = ({ designUrl, isLoading }: { designUrl: string | null, isLoading: boolean }) => {
    const { SUNRISE_ORANGE } = APP_CONFIG;
    
    return (
         <div className="relative w-64 h-72 md:w-80 md:h-96 mx-auto bg-gray-800 rounded-lg p-4 flex items-center justify-center"
             style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 100%, 0 100%, 0 25%)'
             }}>
            <div className="w-full h-full bg-gray-900" 
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 25%, 100% 100%, 0 100%, 0 25%)' }}>
                <div 
                    className="w-40 h-40 md:w-48 md:h-48 bg-cover bg-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                    style={{ 
                        backgroundImage: `url(${designUrl})`,
                        backgroundColor: !designUrl ? '#1f2937' : 'transparent',
                        boxShadow: designUrl ? `0 0 20px ${SUNRISE_ORANGE}`: 'none'
                     }}
                >
                    {!designUrl && !isLoading && <Wand2 size={48} className="text-gray-600" />}
                    {isLoading && (
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400"></div>
                    )}
                </div>
            </div>
        </div>
    )
}


export const MerchDesigner: React.FC = () => {
    const { SUNRISE_ORANGE } = APP_CONFIG;
    const [prompt, setPrompt] = useState('');
    const [designUrl, setDesignUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const generateDesign = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError('');
        setDesignUrl(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [{ text: prompt }] },
                config: {
                    systemInstruction: APP_CONFIG.AI_MERCH_DESIGNER_INSTRUCTION,
                    responseModalities: [Modality.IMAGE],
                },
            });

             for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                    setDesignUrl(imageUrl);
                    break;
                }
            }
        } catch (e) {
            console.error(e);
            setError('Could not generate design. The Oracle is resting.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <SectionTitle color={SUNRISE_ORANGE}>
                {'// Design Your Reality //'}
            </SectionTitle>
            <div className="p-6 bg-black/70 rounded-xl border-2 border-dashed" style={{ borderColor: SUNRISE_ORANGE }}>
                <p className="text-center text-gray-300 font-mono mb-6">
                    Describe a design and the Oracle will create it for a custom ScarceKID shirt.
                </p>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                         <TshirtMockup designUrl={designUrl} isLoading={isLoading} />
                    </div>
                    <form onSubmit={generateDesign} className="w-full">
                        <div className="relative flex-grow mb-4">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="e.g., 'A cybernetic lion with a neon mane...'"
                                required
                                disabled={isLoading}
                                rows={3}
                                className="w-full bg-gray-900 border-2 text-white p-3 rounded-lg focus:ring-2 focus:ring-offset-2 font-mono"
                                // Fix: Cast style object to React.CSSProperties to allow for custom properties.
                                style={{
                                    borderColor: SUNRISE_ORANGE,
                                    boxShadow: `0 0 5px ${SUNRISE_ORANGE}`,
                                    '--tw-ring-color': SUNRISE_ORANGE,
                                } as React.CSSProperties}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !prompt.trim()}
                            className="w-full py-3 px-6 text-lg font-bold uppercase rounded-lg transition-all duration-300 text-black bg-white hover:scale-[1.05] active:scale-[0.98] shadow-[0_0_15px_rgba(255,165,0,0.9)] hover:shadow-[0_0_25px_rgba(255,165,0,1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            style={{ backgroundColor: SUNRISE_ORANGE, color: '#111827' }}
                        >
                            <Bot size={24} className="mr-2" />
                            {isLoading ? 'CREATING...' : 'GENERATE DESIGN'}
                        </button>
                         {error && <p className="text-red-500 text-center font-mono mt-4">{error}</p>}
                    </form>
                </div>
            </div>
        </section>
    );
};
