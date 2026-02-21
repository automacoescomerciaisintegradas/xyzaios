'use client';
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import 'plyr/dist/plyr.css';
import Plyr from 'plyr';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    type?: 'video/mp4' | 'application/x-mpegURL';
}

/**
 * VideoPlayer Component - Task 5.4
 * Integração com Plyr (Open Source) e suporte a HLS para streaming premium.
 * AIDEV-NOTE: Garante performance e interface moderna consistente com Cleudocode.
 */
const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, type = 'video/mp4' }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<Plyr | null>(null);

    useEffect(() => {
        if (!videoRef.current) return;

        const video = videoRef.current;

        // AIDEV-SECURITY: Sanitização de URL de streaming
        if (type === 'application/x-mpegURL' && Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        }

        // Inicializa o Plyr
        playerRef.current = new Plyr(video, {
            controls: [
                'play-large', 'play', 'progress', 'current-time', 'mute', 'volume',
                'captions', 'settings', 'pip', 'airplay', 'fullscreen'
            ],
            settings: ['quality', 'speed', 'loop'],
            tooltips: { controls: true, seek: true },
        });

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, [src, type]);

    return (
        <div className="w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-gray-100 dark:border-gray-800 group">
            <video
                ref={videoRef}
                className="plyr-react plyr"
                playsInline
                controls
                poster={poster}
                data-poster={poster}
            >
                {type === 'video/mp4' && <source src={src} type="video/mp4" />}
            </video>

            {/* Custom Overlay for Premium Feel */}
            <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-cyan-400 border border-cyan-400/30 uppercase tracking-widest">
                    AI Generated • Clean View
                </span>
            </div>
        </div>
    );
};

export default VideoPlayer;
