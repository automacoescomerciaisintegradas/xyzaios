/**
 * TTS Provider Interface
 * AIDEV-SECURITY: Boundary de IA - Interface comum para serviços de síntese de voz
 */
export interface TTSProvider {
    name: string;
    synthesize(text: string, voiceId?: string, options?: any): Promise<Buffer | string>;
    getVoices(): Promise<any[]>;
}

import { QwenTTSService } from './providers/QwenTTSService';
import { GeminiTTSService } from './providers/GeminiTTSService';
import { EdgeTTSService } from './providers/EdgeTTSService';

/**
 * TTS Provider Service
 * Módulo central da Fase 1 do Motor de YouTube Cleudocode.
 * Gerencia o ciclo de vida e fallback entre Qwen, Gemini e Edge.
 */
export class TTSProviderService {
    private providers: TTSProvider[] = [];

    constructor() {
        // AIDEV-NOTE: Ordem de prioridade dinâmica via .env (Task 4.3)
        const order = process.env.TTS_PROVIDER_ORDER || 'qwen3,gemini,edge';
        const providerNames = order.split(',').map(n => n.trim().toLowerCase());

        providerNames.forEach(name => {
            if (name === 'qwen3') this.registerProvider(new QwenTTSService());
            if (name === 'gemini') this.registerProvider(new GeminiTTSService());
            if (name === 'edge') this.registerProvider(new EdgeTTSService());
        });

        // Garantir que pelo menos o Edge (fallback gratuito) esteja registrado se a lista for vazia
        if (this.providers.length === 0) {
            this.registerProvider(new EdgeTTSService());
        }
    }

    /**
     * Registra um provedor no sistema
     */
    registerProvider(provider: TTSProvider) {
        this.providers.push(provider);
        console.log(`[TTS] Provider registered: ${provider.name}`);
    }

    /**
     * Sintetiza texto com Fallback Automático
     * AIDEV-SECURITY: Auditoria de saída - Monitorar tráfego para APIs de TTS externas
     */
    async synthesize(text: string, options: any = {}): Promise<{ data: Buffer | string; provider: string }> {
        console.log(`[TTS] Synthesizing: "${text.substring(0, 30)}..."`);

        // AIDEV-NOTE: Reordenar provedores se houver um hint específico
        const activeProviders = [...this.providers];
        if (options.providerHint) {
            const hintIndex = activeProviders.findIndex(p => p.name === options.providerHint);
            if (hintIndex > -1) {
                const [hinted] = activeProviders.splice(hintIndex, 1);
                activeProviders.unshift(hinted);
            }
        }

        let lastError = null;

        for (const provider of activeProviders) {
            try {
                const data = await provider.synthesize(text, options.voiceId, options);
                return { data, provider: provider.name };
            } catch (error: any) {
                console.warn(`[TTS] Provider ${provider.name} failed: ${error.message}`);
                lastError = error;
                continue; // Tenta o próximo provedor (Fallback)
            }
        }

        throw new Error(`[TTS] All providers failed. Last error: ${lastError?.message}`);
    }
}
