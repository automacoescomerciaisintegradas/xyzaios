import React, { useState, useCallback } from 'react';

/**
 * VoiceCloneUploader Component - Task 3.2
 * Upload de áudio para clone de voz (Qwen3-TTS).
 */
const VoiceCloneUploader: React.FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('audio/')) {
            setFile(droppedFile);
        }
    }, []);

    return (
        <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold">Clonagem de Voz</h3>
                    <p className="text-sm text-gray-500">Faça o upload de um áudio para clonar sua voz.</p>
                </div>
            </div>

            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`flex-1 min-h-[250px] border-2 border-dashed rounded-[32px] transition-all flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-[#0f172a] group ${isDragging ? 'border-indigo-500 bg-indigo-500/5' : 'border-gray-200 dark:border-gray-700'
                    }`}
            >
                {!file ? (
                    <>
                        <div className={`p-6 rounded-full bg-white dark:bg-[#1e293b] shadow-xl mb-4 transition-transform duration-500 ${isDragging ? 'scale-110 -translate-y-2' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="17 8 12 3 7 8"></polyline>
                                <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                        </div>
                        <p className="font-bold text-gray-800 dark:text-gray-100 mb-1">Arraste seu áudio aqui</p>
                        <p className="text-sm text-gray-500">Fomatos aceitos: WAV, MP3, M4A (Máx. 30s)</p>
                        <button className="mt-6 px-6 py-2 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all">
                            Selecionar Arquivo
                        </button>
                    </>
                ) : (
                    <div className="w-full">
                        <div className="p-4 bg-white dark:bg-[#1e293b] rounded-2xl border border-indigo-100 dark:border-indigo-900 flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-500 text-white rounded-xl flex items-center justify-center text-xl">
                                🎵
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-bold text-sm truncate">{file.name}</p>
                                <p className="text-[10px] text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB • Pronto para processar</p>
                            </div>
                            <button onClick={() => setFile(null)} className="p-2 text-gray-400 hover:text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        <button
                            onClick={() => setIsProcessing(true)}
                            disabled={isProcessing}
                            className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${isProcessing
                                    ? 'bg-gray-400'
                                    : 'bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20'
                                }`}
                        >
                            {isProcessing ? 'Processando Clone...' : 'Iniciar Clonagem de Voz'}
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-2xl border border-yellow-100 dark:border-yellow-900/20">
                <span className="text-yellow-600">⚠️</span>
                <p className="text-[10px] text-yellow-800 dark:text-yellow-400">
                    Para melhores resultados, use áudios de 10-20 segundos com alta qualidade e sem ruído de fundo. Certifique-se de que o áudio não possui música ao fundo.
                </p>
            </div>
        </div>
    );
};

export default VoiceCloneUploader;
