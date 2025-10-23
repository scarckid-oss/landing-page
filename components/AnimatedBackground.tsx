import React from 'react';

export const AnimatedBackground: React.FC = () => {
    return (
        <>
            <style>
                {`
                    @keyframes move-stars {
                        from { transform: translateY(0); }
                        to   { transform: translateY(-2000px); }
                    }
                     @keyframes twinkling {
                        0% { opacity: 0; }
                        50% { opacity: 1; }
                        100% { opacity: 0; }
                    }
                    @keyframes move-nebula {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    .stars, .stars2, .stars3 {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        display: block;
                        z-index: 0;
                    }
                    .nebula {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        width: 100%;
                        height: 100%;
                        z-index: 0;
                        background: radial-gradient(ellipse at center, rgba(255, 77, 109, 0.1) 0%, rgba(255, 165, 0, 0.1) 30%, rgba(10, 10, 10, 0) 70%);
                        background-size: 200% 200%;
                        opacity: 0.5;
                        animation: move-nebula 120s ease infinite;
                    }
                    
                    .stars .star, .stars2 .star, .stars3 .star {
                        position: absolute;
                        left: var(--star-left);
                        top: var(--star-top);
                        height: var(--star-size);
                        width: var(--star-size);
                        background-color: #fff;
                        border-radius: 50%;
                        animation-name: move-stars;
                        animation-timing-function: linear;
                        animation-iteration-count: infinite;
                        animation-duration: var(--animation-duration);
                        animation-delay: var(--animation-delay);
                    }

                    .stars .star {
                        --star-size: 1px;
                        --animation-duration: 150s;
                        animation-name: move-stars, twinkling;
                        animation-duration: 150s, 5s;
                    }
                     .stars2 .star {
                        --star-size: 2px;
                        --animation-duration: 100s;
                    }
                     .stars3 .star {
                        --star-size: 3px;
                        --animation-duration: 75s;
                    }
                `}
            </style>
            <div className="nebula"></div>
            <div className="stars">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={`s1-${i}`}
                        className="star"
                        style={{
                            '--star-left': `${Math.random() * 100}%`,
                            '--star-top': `${Math.random() * 2000}px`,
                            '--animation-delay': `${Math.random() * -150}s`,
                            animationDelay: `${Math.random() * -150}s, ${Math.random() * 5}s`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
             <div className="stars2">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={`s2-${i}`}
                        className="star"
                        style={{
                            '--star-left': `${Math.random() * 100}%`,
                            '--star-top': `${Math.random() * 2000}px`,
                             '--animation-delay': `${Math.random() * -100}s`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
             <div className="stars3">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={`s3-${i}`}
                        className="star"
                        style={{
                            '--star-left': `${Math.random() * 100}%`,
                            '--star-top': `${Math.random() * 2000}px`,
                            '--animation-delay': `${Math.random() * -75}s`,
                        } as React.CSSProperties}
                    />
                ))}
            </div>
        </>
    );
};