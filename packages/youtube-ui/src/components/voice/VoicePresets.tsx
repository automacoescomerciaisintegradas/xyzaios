import React, { useState } from 'react';

interface VoicePreset {
    id: string;
    name: string;
    gender: 'Male' | 'Female';
    style: string;
    lang: string[];
    icon: string;
    category: string;
}

const presets: VoicePreset[] = [
    { id: 'vivian', name: 'Vivian', gender: 'Female', style: 'Warm, Professional', lang: ['CN', 'EN'], icon: '👩‍💼', category: 'Comercial' },
    { id: 'ryan', name: 'Ryan', gender: 'Male', style: 'Clear, Confident', lang: ['EN'], icon: '👨‍🏫', category: 'Comercial' },
    { id: 'sakura', name: 'Sakura', gender: 'Female', style: 'Cute, Expressive', lang: ['JP'], icon: '👧', category: 'Character' },
    { id: 'hans', name: 'Hans', gender: 'Male', style: 'Deep, Authoritative', lang: ['DE'], icon: '🤵', category: 'Storytelling' },
    { id: 'lucas', name: 'Lucas', gender: 'Male', style: 'Casual, Friendly', lang: ['PT-BR'], icon: '👨', category: 'Casual' },
    { id: 'isabella', name: 'Isabela', gender: 'Female', style: 'Energetic, Fast', lang: ['PT-BR'], icon: '👩', category: 'Storytelling' },
];

const categories = ['Todas', 'Comercial', 'Storytelling', 'Casual', 'Character'];

/**
 * VoicePresets Component - Task 3.3
 * Galeria de vozes pré-configuradas com filtros por categoria.
 */
const VoicePresets: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('Todas');
    const [playingId, setPlayingId] = useState<string | null>(null);

    const filteredPresets = activeCategory === 'Todas'
        ? presets
        : presets.filter(p => p.category === activeCategory);

    const togglePlay = (id: string) => {
        if (playingId === id) setPlayingId(null);
        else {
            setPlayingId(id);
            setTimeout(() => setPlayingId(null), 3000);
        }
    };

    return (
        <div className="w-full">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/20'
                                : 'bg-white dark:bg-[#1e293b] text-gray-500 hover:text-gray-900 dark:hover:text-white border border-gray-100 dark:border-gray-800'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPresets.map((preset) => (
                    <div
                        key={preset.id}
                        className="group relative bg-white dark:bg-[#1e293b] p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl group-hover:scale-110 transition-transform">{preset.icon}</div>
                            <div className="flex-1">
                                <h4 className="font-black text-lg">{preset.name}</h4>
                                <div className="flex gap-1 mt-1">
                                    {preset.lang.map(l => (
                                        <span key={l} className="text-[8px] bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded font-bold">{l}</span>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => togglePlay(preset.id)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${playingId === preset.id
                                        ? 'bg-blue-600 text-white animate-pulse'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-blue-500 hover:text-white'
                                    }`}
                            >
                                {playingId === preset.id ? (
                                    <div className="flex gap-0.5 items-center">
                                        <div className="w-1 h-3 bg-white animate-bounce"></div>
                                        <div className="w-1 h-4 bg-white animate-bounce [animation-delay:-0.2s]"></div>
                                        <div className="w-1 h-3 bg-white animate-bounce [animation-delay:-0.4s]"></div>
                                    </div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                    </svg>
                                )}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4">
                            {preset.style}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-800">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{preset.category}</span>
                            <button className="text-[10px] font-black text-blue-500 hover:underline">USAR VOZ</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VoicePresets;
