# ADR-001: Mapeamento da Arquitetura e Decisão de Clonagem para Instalação Base

## 1. Status
**Aprovado**

## 2. Contexto
Precisamos trazer para nosso ecosistema Cleudocode / xyzaios a mais recente tecnologia provida pelo Synkra AIOS Core. Esse núcleo servirá como motor de desenvolvimento agêntico (Agents-driven development). A complexidade dos sistemas que interligam Agentes Planejadores, Desenvolvedores e Validadores exige que entendamos a estrutura sem "reinventar a roda" cegamente.

## 3. Decisão
Foi decidido:
1. Clonar o escopo direto do repositório remoto Synkra AIOS (GitHub) em vez de baixar tarballs do NPM. Apenas com o código-fonte podemos ler infraestrutura (Scripts, pacotes `.aios-core/infrastructure`) e debugar ou migrar módulo a módulo de forma estruturada.
2. Manter a fundação na branch atual, usar TypeScript/Nodejs (ESLint + Prettier), e instalar bibliotecas idênticas através de `npm install`/`npm ci` (assim que a infra CLI não impactar autoruns locais no ambiente).
3. Criar uma camada forte de documentação que blinda o ambiente do dev de modificações bruscas no banco ou arquivos globais, aderente às nossas *CORE DIRECTIVES*.

## 4. Consequências

### Pontos Positivos
* O repositório integral nos dá acesso a todo o pipeline ADE e os 7 Epics subjacentes para Autonomous Development.
* Ferramentas nativas do repositório de infra, deploy semântico e pipelines CIs estão visíveis.

### Pontos de Risco (Mitigações)
* Sobrescrita imprevista de módulos que possam entrar em conflito. *Mitigação: Usaremos worktrees ou branches estritas do git, e validaremos cada passo.*
* Dependência alta de pacotes `npm` não avaliados previamente. *Mitigação: Executores isolados e logs contínuos das instalações.*
