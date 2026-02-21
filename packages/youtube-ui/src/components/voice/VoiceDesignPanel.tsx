import React, { useState } from 'react';

/**
 * VoiceDesignPanel Component - Task 3.1
 * Painel para design de voz por descrição natural (Qwen3-TTS).
 */
const VoiceDesignPanel: React.FC = () => {
    const [description, setDescription] = useState('');
    const [testText, setTestText] = useState('Olá, bem-vindo ao futuro da criação de conteúdo com o Cleudocode!');
    const [isGenerating, setIsGenerating] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/ai/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: testText,
                    provider: 'qwen3', // Design de voz é especialidade do Qwen
                    description: description
                })
            });

            if (!response.ok) throw new Error('Falha na geração');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);
        } catch (error: any) {
            alert('Erro: ' + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-500/10 text-cyan-500 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Design de Voz por IA</h3>
                    <p className="text-sm text-gray-500">Descreva a voz que você imagina e a IA a criará.</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Input de Descrição */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descrição da Voz</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Ex: "Voz feminina jovem, tom alegre, acolhedor e energético..."'
                        className="w-full p-4 bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all resize-none h-24"
                    />
                </div>

                {/* Input de Texto de Teste */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Texto de Teste</label>
                    <input
                        type="text"
                        value={testText}
                        onChange={(e) => setTestText(e.target.value)}
                        className="w-full p-4 bg-gray-50 dark:bg-[#0f172a] border border-gray-100 dark:border-gray-700 rounded-2xl text-sm focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                    />
                </div>

                {/* Botão de Ação */}
                <button
                    onClick={handleGenerate}
                    disabled={!description || isGenerating}
                    className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${isGenerating || !description
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-lg hover:scale-[1.01] active:scale-95'
                        }`}
                >
                    {isGenerating ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Desenhando voz...</span>
                        </div>
                    ) : (
                        'Gerar Amostra de Voz'
                    )}
                </button>

                {/* Preview Section */}
                {previewUrl && (
                    <div className="mt-8 p-6 bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900 rounded-2xl flex items-center justify-between animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-4">
                            <button className="p-4 bg-cyan-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                            </button>
                            <div>
                                <p className="font-bold text-cyan-900 dark:text-cyan-100">Resultado do Design</p>
                                <p className="text-xs text-cyan-600 dark:text-cyan-400">Voz gerada por IA com sucesso</p>
                            </div>
                        </div>
                        <button className="px-6 py-2 bg-white dark:bg-[#1e293b] text-cyan-600 dark:text-cyan-400 font-bold rounded-xl border border-cyan-100 dark:border-cyan-900 hover:bg-cyan-100 transition-all">
                            Salvar Voz
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VoiceDesignPanel;
