import React, { useState } from 'react';

interface DurationOption {
    value: number;
    label: string;
    icon: string;
    desc: string;
}

const durations: DurationOption[] = [
    { value: 15, label: '15s', icon: '⚡', desc: 'Ultra-short' },
    { value: 30, label: '30s', icon: '🎬', desc: 'Short' },
    { value: 60, label: '1 min', icon: '🕐', desc: 'Standard' },
    { value: 180, label: '3 min', icon: '🎥', desc: 'Extended' },
];

/**
 * DurationSelector Component - Task 2.4
 * Seletor de duração do vídeo em formato de pills horizontais.
 */
interface DurationSelectorProps {
    value: number;
    onChange: (val: number) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ value, onChange }) => {
    return (
        <div className="flex items-center p-1 bg-gray-100 dark:bg-[#2a2a2a] rounded-full border border-gray-200 dark:border-gray-700">
            {durations.map((duration) => (
                <button
                    key={duration.value}
                    onClick={() => onChange(duration.value)}
                    title={duration.desc}
                    className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${value === duration.value
                        ? 'bg-white dark:bg-[#444] text-blue-600 dark:text-cyan-400 shadow-sm scale-105'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                        }`}
                >
                    <span className="flex items-center gap-1.5">
                        <span className="text-xs opacity-80">{duration.icon}</span>
                        {duration.label}
                    </span>
                </button>
            ))}
        </div>
    );
};

export default DurationSelector;
