# RFC-001: Implementação Módulo por Módulo do Synkra AIOS-Core

## Status
*Draft / Proposta*

## Resumo
Este RFC propõe e descreve como iremos evoluir e/ou reimplementar sistematicamente cada módulo do Synkra AIOS Core original através de um ecossistema controlado de reestruturação. Nosso objetivo final é garantir domínio total sobre a infraestrutura e permitir extensibilidade segura.

## Motivação (Por que estamos fazendo isto?)
O orquestrador CLI já se provou em diversos escopos como ferramentas e Squads (Agile, Devops, Planning). Contudo, entender os fluxos subjacentes entre as camadas de ADE, de Validation e os pipelines Agênticos exige uma refatoração progressiva (ou recriação) peça a peça. Se não mapearmos individualmente, as regras do usuário podem ser rompidas no momento de alteração. Múltiplos frameworks integrados dificultam troubleshooting.

## Proposta
Proponho segregar o desenvolvimento modular num cronograma de 4 fases de reescrita / estudo:

### Fase 1: Fundação Node CLI e Utilitários (`/bin` e Core Config)
A criação da interface principal (entrypoint) será estabilizada. Migração total baseando os pacotes cruciais (`commander`, `execa`, `@clack/prompts`).

### Fase 2: O Orquestrador (Agentes e Handlers)
Desenvolver ou adaptar o loader de `AI.md`, `.claude/CLAUDE.md`, conectividade de ferramentas, bem como os fluxos de `@pm`, `@architect`, `@qa`, garantindo que os LLMs obedeçam a matriz de compatibilidade e *memory layers*.

### Fase 3: ADE (Autonomous Development Engine)
Reimplementar inteiramente e dominar o `Worktree Manager` e as engrenagens de "Spec Pipeline -> Execution Engine -> Recovery -> QA". Esse módulo será o epicentro na capacidade agêntica do projeto de corrigir o próprio erro e gerenciar isolamento de branch git.

### Fase 4: Integrações e Squads (Ecossistema de Domínios)
Sistematizar gerador de manifestos e acoplamento com AI de front-end, backend e outros ecossistemas não dev (ex. Business).

## Impacto na Infraestrutura
* Sem quebra retrocompatível em `.aios-core/`.
* Melhor isolamento das lógicas no Node.js.

## Próximos Passos
- Refatorar ou clonar a lógica inicial de `npm run install`.
- Escrever os ADRs individuais de cada pacote abordado pela Fase 1.
- Aguardar aprovação do usuário para dar start à Fase 1.
