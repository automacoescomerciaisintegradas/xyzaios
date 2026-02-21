# AI.md - AIOS-Core Project Context

## 🎯 CONTEXTO DO PROJETO
O **Synkra AIOS (AI-Orchestrated System)** é um framework de desenvolvimento auto-modificável alimentado por inteligência artificial. O projeto foca no **Desenvolvimento Ágil Dirigido por Agentes**, servindo como base estrutural (Core Framework) para que agentes hiper-focados colaborem (ex: `@analyst`, `@architect`, `@pm`, `@sm`, `@dev`, `@qa`) para o desenvolvimento e manutenção autônoma do código de projetos.

A arquitetura segue a hierarquia: **CLI First → Observability Second → UI Third**.

## 🏗️ ARQUITETURA E DECISÕES
- **CLI First**: Entrada via `bin/aios.js` (Mapeado ✅)
- **Engine ADE**: Isolamento via Git Worktrees e Rollbacks em `.aios-core/development/scripts/` (Mapeado ✅)
- **Orquestração**: IDE Sync (`.aios-core/infrastructure/scripts/ide-sync/`) para Claude, Cursor e AntiGravity (Mapeado ✅)
- **Squads**: Gestão modular em `./squads` e carregamento em `.aios-core/development/scripts/squad/` (Mapeado ✅)
    - *Squads Customizados:* `monitoring-squad` (Ativo ✅), `youtube-creator-squad` (Ativo ✅)
- **Produtos & Motores:**
    - `packages/youtube-engine`: Motor TTS (Qwen3/Gemini/Edge) e Geração de Vídeo (Concluído ✅).
    - `packages/youtube-ui`: Interface 1-Click e Voice Studio Avançado (Concluído ✅).
- **Manifestos**: Sistema de Integridade Brownfield em `scripts/generate-install-manifest.js` (Mapeado ✅)
- **Governança**: Implementado Sistema de SOP com `AIDEV-*` Anchor Comments em todos os núcleos.

## 🛠️ CONVENÇÕES DE CÓDIGO
- **Anchors Obrigatórios**: `AIDEV-NOTE`, `AIDEV-SECURITY` em todos os boundaries de orquestração e modificação de arquivos.
- **Paradigma**: Node.js/TypeScript com execução via Shell Wrapper WSL.
- **Commits**: Padrão Semantic Release com flag `[AI]` para alterações automáticas.
- **QA**: Validação em 7 Epics de autonomia (Isolamento, Execução, Verificação, Recuperação, etc).

## 🚀 STATUS DO PROJETO
- **Fase 1-4 (Mapeamento)**: CONCLUÍDO.
- **Próximo Passo**: Implementação de novos Workers e refinamento do Ciclo de Vida ADE.

## 📚 GLOSSÁRIO
- **ADE (Autonomous Development Engine)**: Módulo que permite transformações autônomas com self-critique.
- **Squad**: Conjunto de agentes para domínios específicos.
- **Story**: Documento markdown que guia a execução do agente.

## 🔒 SEGURANÇA (SECURITY STANDARDS)
- **Boundary Checks**: Todas as funções que escrevem na Workspace ou manipulam o Git possuem âncoras de Auditoria.
- **Secrets**: Nenhuma credencial ou chave de API deve ser versionada. Uso estrito de `.env`.
