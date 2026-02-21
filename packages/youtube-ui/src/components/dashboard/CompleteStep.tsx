import React, { useState } from 'react';
import VideoPlayer from '../player/VideoPlayer';

interface CompleteStepProps {
    videoId: string;
    videoUrl: string;
    initialVoice: string;
}

/**
 * CompleteStep Component - Task 5.2
 * Tela final de geração com o novo Player Open Source (Plyr).
 */
const CompleteStep: React.FC<CompleteStepProps> = ({ videoId, videoUrl, initialVoice }) => {
    const [selectedVoice, setSelectedVoice] = useState(initialVoice);
    const [isRegenerating, setIsRegenerating] = useState(false);

    const handleRegenerateAudio = () => {
        setIsRegenerating(true);
        // Simulação de re-geração do áudio com nova voz
        setTimeout(() => {
            setIsRegenerating(false);
            alert('Áudio re-gerado com sucesso!');
        }, 2000);
    };

    return (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Video Preview - Now using Plyr */}
                <div className="flex-1">
                    <div className="rounded-2xl overflow-hidden shadow-2xl relative">
                        <VideoPlayer
                            src={videoUrl}
                            poster="https://via.placeholder.com/1280x720.png?text=Vídeo+Gerado+com+Sucesso"
                        />
                    </div>
                </div>

                {/* Refinement Sidebar */}
                <div className="w-full lg:w-80 space-y-6">
                    <div className="p-6 bg-gray-50 dark:bg-[#252525] rounded-3xl border border-gray-100 dark:border-gray-800">
                        <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Refinar Áudio</h4>

                        <label className="block text-xs font-bold text-gray-500 mb-2">Voz do Narrador</label>
                        <select
                            value={selectedVoice}
                            onChange={(e) => setSelectedVoice(e.target.value)}
                            className="w-full bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 p-3 rounded-xl text-sm outline-none mb-4"
                        >
                            <option value="antonio">Antonio (PT-BR)</option>
                            <option value="francisca">Francisca (PT-BR)</option>
                            <option value="vivian">Vivian (EN)</option>
                            <option value="ryan">Ryan (EN)</option>
                        </select>

                        <button
                            onClick={handleRegenerateAudio}
                            disabled={isRegenerating}
                            className="w-full py-3 bg-gray-800 dark:bg-gray-100 dark:text-gray-900 text-white rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {isRegenerating ? 'Aplicando nova voz...' : '🔄 Alterar Voz'}
                        </button>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-black shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                            📥 Baixar Vídeo Final
                        </button>
                        <button className="w-full py-4 bg-white dark:bg-[#252525] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold hover:bg-gray-50 transition-all text-sm">
                            🎵 Baixar apenas Áudio
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteStep;
