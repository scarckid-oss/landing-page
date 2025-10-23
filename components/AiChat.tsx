import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Send, Bot, User } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import type { ChatMessage } from '../types';
import { SectionTitle } from './SectionTitle';

export const AiChat: React.FC = () => {
    const { SUNRISE_ORANGE } = APP_CONFIG;
    const [chat, setChat] = useState<Chat | null>(null);
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
                const chatInstance = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                      systemInstruction: APP_CONFIG.AI_CHAT_SYSTEM_INSTRUCTION,
                    },
                });
                setChat(chatInstance);
            } catch (e) {
                console.error("Failed to initialize chat:", e);
                setError("Could not connect to the Oracle. Please refresh.");
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userInput.trim() || !chat || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', text: userInput };
        setIsLoading(true);
        setError('');
        setUserInput('');
        setHistory(prev => [...prev, userMessage]);

        try {
            const response = await chat.sendMessageStream({ message: userInput });

            let modelResponseText = '';
            setHistory(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of response) {
                modelResponseText += chunk.text;
                setHistory(prev => {
                    const newHistory = [...prev];
                    newHistory[newHistory.length - 1].text = modelResponseText;
                    return newHistory;
                });
            }
        } catch (e) {
            console.error(e);
            setError('The Oracle is silent. Please try again later.');
            setHistory(prev => prev.slice(0, -1)); // Remove user message if send fails
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section>
            <SectionTitle color={SUNRISE_ORANGE}>
                {'// commune with the oracle //'}
            </SectionTitle>
            <div className="p-6 bg-black/70 rounded-xl border-2 border-dashed flex flex-col h-96" style={{ borderColor: SUNRISE_ORANGE }}>
                <div ref={chatContainerRef} className="flex-grow overflow-y-auto pr-2 space-y-4 mb-4">
                    {history.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-800" style={{ borderColor: SUNRISE_ORANGE, borderWidth: '1px' }}>
                                    <Bot size={18} color={SUNRISE_ORANGE} />
                                </div>
                            )}
                            <div className={`max-w-xs md:max-w-md p-3 rounded-lg font-mono text-sm ${msg.role === 'user' ? 'bg-gray-700 text-white' : 'bg-gray-900 text-gray-300'}`}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text || '...'}</p>
                            </div>
                            {msg.role === 'user' && (
                                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-700">
                                    <User size={18} className="text-white" />
                                </div>
                            )}
                        </div>
                    ))}
                     {isLoading && history[history.length - 1]?.role === 'user' && (
                        <div className="flex items-start gap-3">
                             <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-800" style={{ borderColor: SUNRISE_ORANGE, borderWidth: '1px' }}>
                                <Bot size={18} color={SUNRISE_ORANGE} />
                            </div>
                            <div className="max-w-xs md:max-w-md p-3 rounded-lg font-mono text-sm bg-gray-900 text-gray-300">
                                <div className="flex items-center space-x-1">
                                  <span className="h-2 w-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                  <span className="h-2 w-2 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                  <span className="h-2 w-2 bg-amber-500 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                 {error && <p className="text-red-500 text-center text-sm font-mono mb-2">{error}</p>}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask the Oracle..."
                        disabled={isLoading || !chat}
                        className="w-full bg-gray-900 border-2 text-white p-3 rounded-lg focus:ring-2 focus:ring-offset-2 font-mono"
                        // Fix: Cast style object to React.CSSProperties to allow for custom properties.
                        style={{
                            borderColor: SUNRISE_ORANGE,
                            boxShadow: `0 0 5px ${SUNRISE_ORANGE}`,
                            '--tw-ring-color': SUNRISE_ORANGE
                        } as React.CSSProperties}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !userInput.trim() || !chat}
                        className="p-3 rounded-lg transition-all duration-300 text-black bg-white hover:scale-[1.05] active:scale-[0.98] shadow-[0_0_15px_rgba(255,165,0,0.9)] hover:shadow-[0_0_25px_rgba(255,165,0,1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        style={{ backgroundColor: SUNRISE_ORANGE, color: '#111827' }}
                    >
                        <Send size={24} />
                    </button>
                </form>
            </div>
        </section>
    );
};
