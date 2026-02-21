# Decisões Técnicas de Arquitetura

Este documento sumariza as principais escolhas técnicas extraídas/analisadas do repositório, servindo como base imutável de design.

## 1. Stack Base
A escolha do projeto foi manter todo o orquestrador em formato TypeScript/JavaScript compatível com a engine v8 (Node.js).
**Justificativa:** É a plataforma mais flexível hoje para ferramentas de CLI multiplataforma cross-OS e fornece enorme disponibilidade de bibliotecas prontas como `chalk`, `execa`, `commander`, e `@clack/prompts`.

## 2. Paradigma Arquitetural
A CLI foi definida com a filosofia **CLI First, Observability Second, UI Third**.
**Justificativa:** Essa hierarquia garante que todo o intelecto processado pelos metadados agênticos opere nativamente no terminal. Soluções web/UI e dashboards são tratadas estritamente com visualizações sem estado mestre (Read-only operations).

## 3. Fluxo de Vida de QA
O QA/Validação foi divido em 3 esferas (Defense in Depth):
1. **Locais e Sintáticos:** Husky com prettier e eslint (`npm run lint`).
2. **Contratuais:** Checks contextuais da infraestrutura AIOS (`npm run validate:parity`, `sync:ide:check`).
3. **Automáticos (CI/CD):** Jest Test Suites acionado via Actions no Github (`npm run test:coverage`).

## 4. Gestão de Agrupamento
Através da pasta raíz `.aios-core/`, a ferramenta guarda de maneira segregada hooks, infraestrutura, desenvolvimento e lógicas de squads. Toda dependência que interage com APIs (Gemini, Claude, Codex) possui camadas de adaptação transparentes.
