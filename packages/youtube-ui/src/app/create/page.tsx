'use client';
'use client';
import React, { useState } from 'react';
import VoicePresets from '../../components/voice/VoicePresets';
import OneClickCreator from '../../components/create/OneClickCreator';

/**
 * YouTube Creation Page - Task 2.7
 * Página principal de criação rápida do ecossistema YouTube Cleudocode.
 */
const YouTubeCreatePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'video' | 'image'>('video');

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 transition-colors duration-500">
            {/* Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
            </div>

            <main className="relative z-10 pt-20 pb-24">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto px-6 text-center mb-12">
                    <h1 className="text-5xl font-black tracking-tight mb-4">
                        Crie qualquer coisa com IA, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">do seu jeito</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        A ferramenta definitiva para criadores do YouTube.
                    </p>
                </div>

                {/* Tab Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white/50 dark:bg-black/20 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex gap-1">
                        <button
                            onClick={() => setActiveTab('video')}
                            className={`px-8 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'video'
                                ? 'bg-white dark:bg-[#1e293b] text-blue-600 dark:text-white shadow-md scale-105'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            📹 Vídeo
                        </button>
                        <button
                            onClick={() => setActiveTab('image')}
                            className={`px-8 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'image'
                                ? 'bg-white dark:bg-[#1e293b] text-blue-600 dark:text-white shadow-md scale-105'
                                : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            🖼️ Imagem
                        </button>
                    </div>
                </div>

                {/* One Click Creator Section */}
                {activeTab === 'video' ? (
                    <OneClickCreator />
                ) : (
                    <div className="w-full max-w-4xl mx-auto p-12 text-center text-gray-500 italic">
                        Módulo de geração de imagens em desenvolvimento...
                    </div>
                )}

                {/* Suggestions / Cards */}
                <div className="max-w-6xl mx-auto px-6 mt-20">
                    <h3 className="text-lg font-bold mb-8 uppercase tracking-widest text-gray-400">
                        Pode ser que você queira experimentar
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <SuggestionCard
                            title="Novo vídeo"
                            desc="Criação do zero com IA"
                            icon="📹"
                        />
                        <SuggestionCard
                            title="Criador IA"
                            desc="Geração automática premium"
                            icon="🎬"
                            isNew
                        />
                        <SuggestionCard
                            title="Legendas de IA"
                            desc="Transcreva e otimize"
                            icon="📝"
                        />
                        <SuggestionCard
                            title="Brainstorm IA"
                            desc="Planejamento de conteúdo"
                            icon="💡"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

const SuggestionCard: React.FC<{ title: string; desc: string; icon: string; isNew?: boolean }> = ({ title, desc, icon, isNew }) => (
    <button className="group relative bg-white/50 dark:bg-[#1e293b]/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-100 dark:border-gray-800 text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:bg-white dark:hover:bg-[#1e293b]">
        <div className="text-4xl mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300">
            {icon}
        </div>
        <h4 className="text-lg font-bold mb-2 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
            {title}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
            {desc}
        </p>
        {isNew && (
            <span className="absolute top-4 right-4 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                Novo
            </span>
        )}
    </button>
);

export default YouTubeCreatePage;
