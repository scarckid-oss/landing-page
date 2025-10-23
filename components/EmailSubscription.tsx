
import React from 'react';
import { Mail } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import { SectionTitle } from './SectionTitle';

export const EmailSubscription: React.FC = () => {
    const { SUNRISE_ORANGE } = APP_CONFIG;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Thank you for joining the movement!");
    };

    return (
        <section className="p-6 bg-black/70 rounded-xl border-2 border-dashed" style={{ borderColor: SUNRISE_ORANGE }}>
            <SectionTitle color={SUNRISE_ORANGE}>
                {'// join the movement //'}
            </SectionTitle>
            <p className="text-center text-gray-300 font-mono mb-6">
                Get early access, exclusive tracks, and be the first to know about new drops.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        required
                        className="w-full bg-gray-900 border-2 text-white p-3 pl-10 rounded-lg focus:ring-2 focus:ring-offset-2"
                        // Fix: Cast style object to React.CSSProperties to allow for custom properties.
                        style={{
                            borderColor: SUNRISE_ORANGE,
                            boxShadow: `0 0 5px ${SUNRISE_ORANGE}`,
                            '--tw-ring-color': SUNRISE_ORANGE
                        } as React.CSSProperties}
                    />
                </div>
                <button
                    type="submit"
                    className="
                        py-3 px-6 text-lg font-bold uppercase rounded-lg transition-all duration-300
                        text-black bg-white hover:scale-[1.05] active:scale-[0.98]
                        shadow-[0_0_15px_rgba(255,165,0,0.9)] hover:shadow-[0_0_25px_rgba(255,165,0,1)]
                    "
                    style={{ backgroundColor: SUNRISE_ORANGE, color: '#111827' }}
                >
                    Subscribe
                </button>
            </form>
        </section>
    );
}
