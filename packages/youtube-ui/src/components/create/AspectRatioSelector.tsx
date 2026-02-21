import React, { useState } from 'react';

interface Ratio {
    id: string;
    label: string;
    icon: React.ReactNode;
}

const ratios: Ratio[] = [
    {
        id: '9:16',
        label: '9:16',
        icon: (
            <div className="w-3 h-5 border-2 border-current rounded-[2px] relative">
                <div className="absolute inset-x-0.5 bottom-0.5 h-1 bg-current opacity-20"></div>
            </div>
        )
    },
    {
        id: '16:9',
        label: '16:9',
        icon: (
            <div className="w-5 h-3 border-2 border-current rounded-[2px] relative">
                <div className="absolute inset-x-0.5 bottom-0.5 h-0.5 bg-current opacity-20"></div>
            </div>
        )
    },
    {
        id: '1:1',
        label: '1:1',
        icon: (
            <div className="w-4 h-4 border-2 border-current rounded-[2px] relative">
                <div className="absolute inset-x-0.5 bottom-0.5 h-1 bg-current opacity-20"></div>
            </div>
        )
    },
];

/**
 * AspectRatioSelector Component - Task 2.5
 * Seletor de proporção de vídeo com ícones representativos.
 */
interface AspectRatioSelectorProps {
    value: string;
    onChange: (val: string) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ value, onChange }) => {
    return (
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl border border-gray-200 dark:border-gray-700">
            {ratios.map((ratio) => (
                <button
                    key={ratio.id}
                    onClick={() => onChange(ratio.id)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${value === ratio.id
                        ? 'bg-white dark:bg-[#444] text-blue-600 dark:text-cyan-400 shadow-sm'
                        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'
                        }`}
                >
                    {ratio.icon}
                    <span className="text-[10px] font-bold">{ratio.label}</span>
                </button>
            ))}
        </div>
    );
};

export default AspectRatioSelector;
