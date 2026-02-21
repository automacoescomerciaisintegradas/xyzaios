import React, { useState } from 'react';

interface VideoStyle {
    id: string;
    name: string;
    description: string;
    icon: string;
    isNew?: boolean;
}

const styles: VideoStyle[] = [
    { id: 'free-creation', name: 'Novo vídeo', description: 'Criação livre', icon: '📹' },
    { id: 'ai-gen', name: 'Criador de vídeos de IA', description: 'Geração automática', icon: '🎬', isNew: true },
    { id: 'ai-captions', name: 'Legendas de IA', description: 'Foco em legendas', icon: '📝' },
    { id: 'ai-brainstorm', name: 'Brainstorm com IA', description: 'Ideias + vídeo', icon: '💡' },
];

/**
 * StyleSelector Component - Task 2.2
 * Seletor de estilo de vídeo (dropdown estilo Vidnoz).
 */
interface StyleSelectorProps {
    value: string;
    onChange: (val: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedStyle = styles.find(s => s.id === value) || styles[1];

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#2a2a2a] rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-[#333] transition-colors"
            >
                <span className="text-xl">{selectedStyle.icon}</span>
                <span className="font-medium text-sm text-gray-700 dark:text-gray-200">{selectedStyle.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 mt-2 w-72 origin-top-left bg-white dark:bg-[#222] border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden">
                    <div className="py-2">
                        {styles.map((style) => (
                            <button
                                key={style.id}
                                onClick={() => {
                                    onChange(style.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#2d2d2d] transition-colors ${selectedStyle.id === style.id ? 'bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{style.icon}</span>
                                    <div className="text-left">
                                        <p className="font-semibold text-sm text-gray-800 dark:text-gray-100">{style.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{style.description}</p>
                                    </div>
                                </div>
                                {style.isNew && (
                                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                        Novo
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StyleSelector;
