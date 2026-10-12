# CheckMyGit Design System (CMG-DS)

Design system completo e modular extraído e refinado a partir do layout, paleta e componentes do **CheckMyGit** ([checkmygit.com/madeinlowcode](https://checkmygit.com/madeinlowcode)).

---

## 🎨 Princípios de Design

1. **Carbon / Obsidian Foundation**: Fundo primário ultra-escuro (`#030303`), com elevações graduais (`#0d1117`, `#161b22`, `#21262d`).
2. **GitHub Emerald & Accent Pulses**: Cores de destaque inspiradas no ecossistema de desenvolvedores (`#2ea043`, `#39d353`, `#58a6ff`).
3. **5-Level Contribution Matrix**: Escala clássica de 5 tons para mapas de calor e visualização de atividade.
4. **Bento & Classic Switching**: Suporte a layouts intercambiáveis (Visualização Clássica estilo perfil do GitHub ou Bento Grid moderna com cards com gradientes).
5. **Tema Claro & Escuro**: Troca instantânea com tokens semânticos e persistência via `localStorage`.

---

## 📦 Estrutura de Arquivos

```
design-system-checkmygit/
├── tokens.css       # Design Tokens (Cores, Tipografia, Espaçamentos, Heatmap scale)
├── components.css   # Biblioteca de Componentes CSS (Navbar, Cards, Heatmap, Modals)
├── style.css        # Modos Bento/Clássico, animações, estados hover e responsividade
├── app.js           # Lógica interativa, gerador do Heatmap 52-semanas e filtros
├── index.html       # Demonstração executável com os dados de @madeinlowcode
└── README.md        # Documentação técnica do Design System
```

---

## 📐 Tokens Principais (`tokens.css`)

### Paleta de Cores & Superfícies

| Variável | Dark (Padrão) | Light | Descrição |
|---|---|---|---|
| `--bg-primary` | `#030303` | `#ffffff` | Fundo principal da página |
| `--bg-secondary` | `#0d1117` | `#f6f8fa` | Fundo de cards, containers e asides |
| `--bg-tertiary` | `#161b22` | `#eaeef2` | Fundo de badges, chips e segmentos |
| `--border-default` | `#30363d` | `#d0d7de` | Bordas de cards e divisores |
| `--text-primary` | `#f0f6fc` | `#1f2328` | Títulos e texto principal |
| `--text-secondary` | `#8b949e` | `#656d76` | Metadados, labels e subtítulos |
| `--accent-primary` | `#2ea043` | `#1f883d` | Ações principais e botões de destaque |
| `--accent-blue` | `#58a6ff` | `#0969da` | Links e títulos de repositórios |

### Escala do Heatmap (Contribuições)

| Nível | Dark Mode | Light Mode |
|---|---|---|
| `data-level="0"` | `#161b22` | `#ebedf0` |
| `data-level="1"` | `#0e4429` | `#9be9a8` |
| `data-level="2"` | `#006d32` | `#40c463` |
| `data-level="3"` | `#26a641` | `#30a14e` |
| `data-level="4"` | `#39d353` | `#216e39` |

---

## 🧩 Componentes Disponíveis (`components.css`)

### 1. Navbar & Header
- `.cmg-navbar`: Barra fixa no topo com efeito blur e borda inferior sutil.
- `.cmg-brand`: Logotipo com gradiente esmeralda e tipografia limpa.
- `.cmg-select-pill`: Seletor de estilo (GitHub Style / Bento Grid).
- `.cmg-star-badge`: Badge interativo com contador de estrelas.

### 2. Perfil & Sidebar
- `.cmg-avatar-wrapper`: Avatar circular com glow e `.cmg-status-indicator` pulsante ("Ativo no AIOS").
- `.cmg-profile-names`: Título, handle em fonte mono (`@madeinlowcode`), bio e botões de ação.
- `.cmg-pill`: Tags de habilidades (ex.: `⚡ Low-Code Specialist`, `🤖 AI Agents`, `🛠 Claude Code`).

### 3. Cards de Métricas (`.cmg-stats-grid`)
- Grid de 4 colunas responsivo com cards elevados, ícone SVG, valor numérico destacado e rótulo.

### 4. Matriz de Atividade 52 Semanas (`.cmg-heatmap-section`)
- Grid responsivo gerado em JavaScript contendo 52 colunas × 7 linhas.
- Header com meses (Jan a Dez) e dias da semana (Dom, Ter, Qui, Sáb).
- Tooltip dinâmico com contagem de commits e data formatada.
- Legenda `Menos -> Mais` com as 5 escalas de cor.

### 5. Cards de Repositórios (`.cmg-repo-card`)
- Repositórios com links para o GitHub, indicador de linguagem com dot colorido (`Python`, `TypeScript`, `JavaScript`, `Go`), contadores de Stars e Forks, e badges `#tags`.

### 6. Distribuição de Linguagens (`.cmg-languages-grid`)
- Barra de progresso multi-colorida (`.cmg-progress-multi`) com segmentos proporcionais e legenda interativa.

---

## 🚀 Como Executar Localmente

Você pode abrir o arquivo `index.html` diretamente no navegador ou servir localmente:

```bash
# Via Python
python -m http.server 3000 --directory design-system-checkmygit

# Ou via npx serve
npx serve design-system-checkmygit
```

Abra no navegador: `http://localhost:3000`
