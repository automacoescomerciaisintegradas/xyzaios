# Documentação de Requisitos e Produto

## Produto: Synkra AIOS
**Visão Geral:** Um orquestrador agêntico CLI First, desenvolvido em Node.js e focado em habilitar o Desenvolvimento Ágil Dirigido por Agentes, garantindo que etapas de Planejamento (Architecture & PRD) e de Execução (Subdivisão de Histórias e Código) fluam via IA.

### 1. Funcionalidades Principais (Core Features)
1. **Interface CLI Avançada (CLI First):** O produto principal é uma linha de comando universal cruzada com ferramentas de desenvolvimento já estabelecidas (Node.js).
2. **Equipe de Agentes Embarcada:** Subdivisão estrutural nos seguintes perfis agênticos:
   - **Planejamento:** `@pm`, `@analyst`, `@architect`, `@ux-expert`.
   - **Execução:** `@sm`, `@dev`, `@qa`.
3. **Autonomous Development Engine (ADE):** Suporte avançado via 7 "Epics" de infraestrutura: Isolamento (worktrees), Pipelines de especificação, Self-critique e fix, Memória e Recuperação de Erro.
4. **Customização Dinâmica (Squads):** Possibilidade de programar "squads" com propósitos específicos através do CLI (ex: Squad de Marketing, Squad Jurídico).

### 2. Requisitos Técnicos
- Runtime: Node.js >= 18.0.0 (Recomendado 20.x).
- Gerenciador de Pacotes: npm >= 9.x.
- Sistemas Operacionais Compatíveis: Linux, macOS, Windows (WSL / Native CLI).

### 3. Requisitos Não Funcionais
- **Alta Extensibilidade:** A arquitetura base suporta a plugar e hot-swapping de "IDE Rules" (ex. arquivos `.cursor/global-rules.md`, ou `.claude/CLAUDE.md`).
- **Segurança (Defense in Depth):** Processos de commit passam por tripla checagem: ESLint pre-commit + QA pre-push (validação de histórias) + CI Pipeline.

### 4. Entregáveis Esperados (Roadmap Módulo por Módulo)
- Implementação e Refactoring do Parser da engine de Workflows.
- Revisão e Otimização do pipeline do "Execution Engine".
- Implementação e extensão de novos Squads conforme a demanda do sistema.
