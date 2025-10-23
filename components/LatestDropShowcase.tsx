import React from 'react';
import { APP_CONFIG, LATEST_DROP_LINK } from '../constants';
import { GlowingLink } from './GlowingLink';
import { SectionTitle } from './SectionTitle';

export const LatestDropShowcase: React.FC = () => {
    const { WARM_PINK, LATEST_DROP_NAME, LATEST_DROP_DESCRIPTION } = APP_CONFIG;
    
    return (
        <section className="space-y-4 text-center">
            <SectionTitle color={WARM_PINK}>
                {'\\ latest drop //'}
            </SectionTitle>
            <div className="p-6 bg-black/70 rounded-xl border-2 border-dashed" style={{ borderColor: WARM_PINK }}>
                <h3 className="text-2xl font-bold font-mono mb-2" style={{ color: WARM_PINK, textShadow: `0 0 5px ${WARM_PINK}` }}>
                    {LATEST_DROP_NAME}
                </h3>
                <p className="text-gray-300 mb-6">{LATEST_DROP_DESCRIPTION}</p>
                <div className="flex justify-center">
                    <GlowingLink {...LATEST_DROP_LINK} />
                </div>
            </div>
        </section>
    );
};