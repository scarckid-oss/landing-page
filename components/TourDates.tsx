import React from 'react';
import { Calendar, Ticket } from 'lucide-react';
import { APP_CONFIG } from '../constants';
import { SectionTitle } from './SectionTitle';

export const TourDates: React.FC = () => {
    const { SUNRISE_ORANGE, tourDates } = APP_CONFIG;

    if (tourDates.length === 0) {
        return null;
    }

    return (
        <section>
            <SectionTitle color={SUNRISE_ORANGE}>
                {'// on tour //'}
            </SectionTitle>
            <div className="p-6 bg-black/70 rounded-xl border-2 border-dashed" style={{ borderColor: SUNRISE_ORANGE }}>
                <ul className="space-y-4">
                    {tourDates.map((tourDate, index) => (
                        <li key={index} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-900/50 rounded-lg border-l-4" style={{ borderColor: SUNRISE_ORANGE }}>
                            <div className="flex items-center mb-4 sm:mb-0">
                                <div className="text-center mr-4 bg-gray-800 p-2 rounded">
                                    <div className="text-sm font-bold text-white uppercase">{tourDate.date.split(' ')[0]}</div>
                                    <div className="text-lg font-extrabold text-white">{tourDate.date.split(' ')[1]}</div>
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-white">{tourDate.city}</p>
                                    <p className="text-sm text-gray-400">{tourDate.venue}</p>
                                </div>
                            </div>
                            <a
                                href={tourDate.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center py-2 px-4 text-sm font-bold rounded-lg transition-all duration-300 text-black bg-white hover:scale-[1.05] active:scale-[0.98] shadow-[0_0_10px_rgba(255,165,0,0.8)] hover:shadow-[0_0_15px_rgba(255,165,0,1)]"
                                style={{ backgroundColor: SUNRISE_ORANGE, color: '#111827' }}
                            >
                                <Ticket size={16} className="mr-2" />
                                Tickets
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}