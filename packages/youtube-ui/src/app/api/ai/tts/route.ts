import { NextRequest, NextResponse } from 'next/server';
import { TTSProviderService } from '@youtube-engine/services/TTSProviderService';

const ttsService = new TTSProviderService();

/**
 * API TTS Multi-Provider - Real Data Generation
 */
export async function POST(req: NextRequest) {
    try {
        const { text, voice, provider, language } = await req.json();

        if (!text) return NextResponse.json({ success: false, error: 'Texto é obrigatório' }, { status: 400 });

        const result = await ttsService.synthesize(text, {
            voiceId: voice,
            providerHint: provider,
            language
        });

        // Retornar o áudio como binário (Blob)
        return new NextResponse(result.data as Buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'X-Provider': result.provider
            }
        });

    } catch (error: any) {
        console.error('[API-TTS-Error]:', error.message);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
