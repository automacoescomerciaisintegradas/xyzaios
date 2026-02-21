'use client';
import React, { useState } from 'react';
import VoicePresets from '../../components/voice/VoicePresets';
import VoiceDesignPanel from '../../components/voice/VoiceDesignPanel';
import VoiceCloneUploader from '../../components/voice/VoiceCloneUploader';

/**
 * Voice Studio Page - Task 3.4
 * Página principal do estúdio de vozes avançado do ecossistema Cleudocode.
 */
const VoiceStudioPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'presets' | 'design' | 'clone' | 'my-voices'>('presets');

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 transition-colors duration-500 pt-20 pb-24">
            {/* Dynamic Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-5%] w-[35%] h-[35%] bg-indigo-500/10 blur-[130px] rounded-full"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-[35%] h-[35%] bg-blue-600/10 blur-[130px] rounded-full"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black tracking-tight mb-4">
                        Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Studio</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        Dê personalidade aos seus vídeos com vozes exclusivas e clonagem de alta fidelidade.
                    </p>
                </div>

                {/* Studio Tabs */}
                <div className="flex items-center gap-8 mb-12 border-b border-gray-200 dark:border-gray-800">
                    <TabButton
                        active={activeTab === 'presets'}
                        onClick={() => setActiveTab('presets')}
                        label="Vozes Pré-definidas"
                        icon="🎭"
                    />
                    <TabButton
                        active={activeTab === 'design'}
                        onClick={() => setActiveTab('design')}
                        label="Design de Voz (IA)"
                        icon="✨"
                    />
                    <TabButton
                        active={activeTab === 'clone'}
                        onClick={() => setActiveTab('clone')}
                        label="Clonagem de Voz"
                        icon="🧬"
                    />
                    <TabButton
                        active={activeTab === 'my-voices'}
                        onClick={() => setActiveTab('my-voices')}
                        label="Minhas Vozes"
                        icon="💾"
                    />
                </div>

                {/* Content Render */}
                <div className="animate-in fade-in duration-700">
                    {activeTab === 'presets' && <VoicePresets />}

                    {activeTab === 'design' && (
                        <div className="max-w-3xl mx-auto">
                            <VoiceDesignPanel />
                        </div>
                    )}

                    {activeTab === 'clone' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                            <VoiceCloneUploader />
                            <div className="p-8 bg-blue-600 rounded-[32px] text-white shadow-2xl shadow-blue-500/20">
                                <h3 className="text-2xl font-black mb-4">Como funciona a clonagem?</h3>
                                <ul className="space-y-4 text-blue-100">
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs">1</span>
                                        <p>Carregue um arquivo de áudio limpo entre 10 e 30 segundos.</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                                        <p>Nossa IA Qwen3 extrai as características acústicas e o timbre da voz.</p>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center font-bold text-xs">3</span>
                                        <p>Em segundos, sua voz clonada estará disponível para qualquer roteiro.</p>
                                    </li>
                                </ul>
                                <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/10">
                                    <p className="text-sm font-medium">🛡️ Sua privacidade é prioridade. Clones de voz são processados localmente e nunca compartilhados.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'my-voices' && (
                        <div className="py-20 text-center">
                            <div className="text-6xl mb-6">📂</div>
                            <h3 className="text-xl font-bold mb-2">Sua biblioteca está vazia</h3>
                            <p className="text-gray-500">Comece desenhando ou clonando uma nova voz.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: string }> = ({ active, onClick, label, icon }) => (
    <button
        onClick={onClick}
        className={`pb-4 px-2 flex items-center gap-2 font-bold transition-all relative ${active
            ? 'text-blue-600 dark:text-cyan-400'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
            }`}
    >
        <span>{icon}</span>
        {label}
        {active && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"></div>
        )}
    </button>
);

export default VoiceStudioPage;
