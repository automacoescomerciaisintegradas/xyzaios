import React, { useState } from 'react';
import MainInput from './MainInput';
import StyleSelector from './StyleSelector';
import VoiceSelector from './VoiceSelector';
import DurationSelector from './DurationSelector';
import AspectRatioSelector from './AspectRatioSelector';

/**
 * OneClickCreator Component - Task 2.6
 * Componente principal que integra todos os seletores com layout Vidnoz.
 */
const OneClickCreator: React.FC = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [idea, setIdea] = useState('');
    const [style, setStyle] = useState('ai-gen');
    const [voice, setVoice] = useState({ id: 'antonio', name: 'Antonio' });
    const [duration, setDuration] = useState(60);
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [progress, setProgress] = useState(0);

    const handleCreate = async () => {
        if (!idea) {
            alert('Por favor, insira uma ideia ou roteiro primeiro.');
            return;
        }

        setIsGenerating(true);
        setProgress(10);

        try {
            const response = await fetch('/api/ai/generate-video-oneclick', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idea, style, voice, duration, aspectRatio })
            });

            const data = await response.json();

            if (data.success) {
                setProgress(100);
                setTimeout(() => {
                    alert(`Sucesso! Vídeo gerado: ${data.videoId}`);
                    setIsGenerating(false);
                }, 500);
            } else {
                throw new Error(data.error || 'Erro na geração');
            }
        } catch (error: any) {
            alert(`Erro: ${error.message}`);
            setIsGenerating(false);
        }
    };

    return (
        <section className="w-full max-w-5xl mx-auto py-12 px-6">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400 mb-4">
                    Crie vídeos envolventes com IA com apenas 1 clique
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                    Combine ideias, vozes e estilos em uma experiência de criação única.
                </p>
            </div>

            <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-800">
                {/* Main Input Area */}
                <div className="mb-8">
                    <MainInput value={idea} onChange={setIdea} />
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex flex-wrap items-center gap-4">
                        <StyleSelector value={style} onChange={setStyle} />
                        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
                        <VoiceSelector value={voice} onChange={setVoice} />
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <DurationSelector value={duration} onChange={setDuration} />
                        <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />

                        <button
                            onClick={handleCreate}
                            disabled={isGenerating}
                            className={`relative px-8 py-3 rounded-full font-bold text-white transition-all overflow-hidden ${isGenerating
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#00f2fe] to-[#4facfe] hover:scale-105 hover:shadow-lg active:scale-95'
                                }`}
                        >
                            {isGenerating ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Gerando...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>✨</span>
                                    <span>Criar Vídeo</span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>

                {/* Progress Bar (Visible during generation) - Task 6.2 */}
                {isGenerating && (
                    <div className="mt-8 p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20 animate-in fade-in duration-500">
                        <div className="flex flex-col sm:flex-row justify-between text-xs text-blue-500 font-black uppercase tracking-widest mb-3 gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                {/* Task 6.2 Status Granular */}
                                <span>{
                                    progress < 30 ? "📝 Gerando roteiro..." :
                                        progress < 70 ? "🎤 Sintetizando voz e sincronizando áudio..." :
                                            "🎬 Finalizando edição do vídeo..."
                                }</span>
                            </div>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden p-0.5">
                            <div
                                className="h-full bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#00f2fe] bg-[length:200%_auto] animate-[gradient_2s_linear_infinite] rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OneClickCreator;
