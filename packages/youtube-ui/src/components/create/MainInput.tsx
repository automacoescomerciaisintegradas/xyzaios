import React, { useState, useRef, useEffect } from 'react';

/**
 * MainInput Component - Task 2.1
 * Estilo inspirado no Vidnoz para entrada de ideias ou roteiros.
 * AIDEV-NOTE: Implementa gradiente cyan/teal e comportamento de auto-expansão.
 */
interface MainInputProps {
    value: string;
    onChange: (val: string) => void;
}

const MainInput: React.FC<MainInputProps> = ({ value, onChange }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-expand textarea as text grows
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <div className="w-full max-w-4xl mx-auto p-1 rounded-2xl bg-gradient-to-r from-[#00f2fe] to-[#4facfe] shadow-lg transition-all duration-300 hover:shadow-cyan-500/20">
            <div className="relative flex items-start bg-white dark:bg-[#1a1a1a] rounded-[calc(1rem-2px)] overflow-hidden">
                <div className="pl-4 pt-4 text-[#4facfe]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Insira sua ideia ou cole um roteiro para o seu vídeo..."
                    className="w-full min-h-[120px] p-4 bg-transparent border-none focus:ring-0 text-lg text-gray-800 dark:text-gray-100 placeholder-gray-400 resize-none outline-none"
                />
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                    {value.length} caracteres
                </div>
            </div>
        </div>
    );
};

export default MainInput;
