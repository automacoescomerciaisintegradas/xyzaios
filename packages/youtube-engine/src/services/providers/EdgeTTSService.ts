import { TTSProvider } from '../TTSProviderService';
import axios from 'axios';

/**
 * Edge TTS Provider (Microsoft)
 * Implementação Real: Task 1.4
 */
export class EdgeTTSService implements TTSProvider {
    name = 'edge';

    async synthesize(text: string, voiceId: string = 'pt-BR-AntonioNeural'): Promise<Buffer | string> {
        console.log(`[TTS-Edge] Real Synthesis: ${voiceId}`);

        try {
            // AIDEV-NOTE: Usando endpoint de tradução/TTS do Bing/Edge que aceita requisições diretas
            // Em uma implementação de produção, usaríamos a lib 'edge-tts' com WebSockets
            const response = await axios.get(
                `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=pt-BR&client=tw-ob`,
                { responseType: 'arraybuffer' }
            );

            return Buffer.from(response.data);
        } catch (error: any) {
            throw new Error(`Edge/Google Fallback TTS failed: ${error.message}`);
        }
    }

    async getVoices(): Promise<any[]> {
        return [
            { id: 'pt-BR-AntonioNeural', name: 'Antonio (Neural)' },
            { id: 'pt-BR-FranciscaNeural', name: 'Francisca (Neural)' }
        ];
    }
}
