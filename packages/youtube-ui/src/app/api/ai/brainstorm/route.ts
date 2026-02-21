import { NextRequest, NextResponse } from 'next/server';

/**
 * API Brainstorm Ideas - Task 4.4
 * Endpoint para geração de ideias criativas e roteiros virais para o YouTube.
 */
export async function POST(req: NextRequest) {
    try {
        const { topic, niche, style, count = 5 } = await req.json();

        console.log(`[API-Brainstorm] Generating ${count} ideas for topic: ${topic || 'trending'}`);

        // AIDEV-NOTE: Aqui seria integrada uma chamada ao Gemini Pro para geração de texto criativo.
        // Simulando o retorno esperado pela Task 4.4 do Plano.

        const mockIdeas = [
            {
                title: "5 Segredos de IA que ninguém te conta",
                hook: "A maioria das pessoas usa o ChatGPT errado. Deixe-me mostrar como o Cleudocode muda o jogo.",
                script: "Imagine automatizar todo o seu canal com apenas um comando...",
                tags: ["IA", "Cleudocode", "Automação", "YouTube"],
                viralPotential: 0.95
            },
            {
                title: "Como criar 30 Shorts em 10 minutos",
                hook: "A consistência é o segredo do algoritmo, mas quem tem tempo para editar o dia todo?",
                script: "Neste vídeo, vou mostrar o pipeline de 1 clique no meu dashboard...",
                tags: ["Shorts", "Produtividade", "Tutorial", "VideoEditing"],
                viralPotential: 0.88
            }
        ].slice(0, count);

        return NextResponse.json({
            success: true,
            ideas: mockIdeas,
            metadata: {
                niche: niche || 'General Technology',
                style: style || 'Storytelling'
            }
        });

    } catch (error: any) {
        console.error('[API-Brainstorm-Error]:', error.message);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
