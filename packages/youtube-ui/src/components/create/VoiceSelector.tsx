import React, { useState } from 'react';

interface Voice {
    id: string;
    name: string;
    lang: string;
    flag: string;
    gender: 'Male' | 'Female';
}

const voices: Voice[] = [
    { id: 'vivian', name: 'Vivian', lang: 'CN/EN', flag: '🇨🇳', gender: 'Female' },
    { id: 'ryan', name: 'Ryan', lang: 'EN', flag: '🇺🇸', gender: 'Male' },
    { id: 'zephyr', name: 'Zephyr', lang: 'EN', flag: '🇬🇧', gender: 'Male' },
    { id: 'puck', name: 'Puck', lang: 'EN', flag: '🇨🇦', gender: 'Female' },
    { id: 'antonio', name: 'Antonio', lang: 'PT-BR', flag: '🇧🇷', gender: 'Male' },
];

/**
 * VoiceSelector Component - Task 2.3
 * Seletor de voz com preview de áudio e link para Voice Studio.
 */
interface VoiceSelectorProps {
    value: { id: string; name: string };
    onChange: (val: { id: string; name: string }) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedVoice = voices.find(v => v.id === value.id) || voices[4];
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePreview = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
        // Simulação de áudio
        setTimeout(() => setIsPlaying(false), 2000);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
            >
                <span className="text-lg">🎤</span>
                <span className="font-medium text-sm text-gray-700 dark:text-gray-200">{selectedVoice.name}</span>
                <span className="text-xs text-gray-400">({selectedVoice.lang})</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-64 origin-top-left bg-white dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl z-50">
                    <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>Selecionar Voz</span>
                        <a href="/voice-studio" className="text-blue-500 hover:text-blue-600">Voice Studio →</a>
                    </div>
                    <div className="py-1 max-h-60 overflow-y-auto">
                        {voices.map((voice) => (
                            <button
                                key={voice.id}
                                onClick={() => {
                                    onChange({ id: voice.id, name: voice.name });
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#2d2d2d] group ${selectedVoice.id === voice.id ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                            >
                                <div className="flex items-center gap-2">
                                    <span>{voice.flag}</span>
                                    <div className="text-left">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{voice.name}</p>
                                        <p className="text-[10px] text-gray-400">{voice.gender} • {voice.lang}</p>
                                    </div>
                                </div>
                                <div
                                    onClick={togglePreview}
                                    className={`p-1.5 rounded-full ${isPlaying && selectedVoice.id === voice.id ? 'bg-cyan-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200'} transition-all`}
                                >
                                    {isPlaying && selectedVoice.id === voice.id ? (
                                        <div className="w-3 h-3 flex items-center gap-0.5">
                                            <div className="w-0.5 h-full bg-white animate-bounce"></div>
                                            <div className="w-0.5 h-full bg-white animate-bounce [animation-delay:-0.2s]"></div>
                                            <div className="w-0.5 h-full bg-white animate-bounce [animation-delay:-0.4s]"></div>
                                        </div>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceSelector;
