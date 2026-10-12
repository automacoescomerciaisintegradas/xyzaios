# XYZAIOS Design System (XYZ-DS)

Design system modular e moderno criado para o **XYZAIOS: AI-Orchestrated System for Full Stack Development - Core Framework v4.0** ([automacoescomerciaisintegradas/xyzaios](https://github.com/automacoescomerciaisintegradas/xyzaios)).

---

## 🏛 Princípios de Design do XYZAIOS

1. **Obsidian / Carbon Core**: Superfície de fundo profunda (`#030303`), com níveis progressivos de elevação (`#0d1117`, `#161b22`, `#21262d`).
2. **AI Engine Emerald & Cyber Accents**: Destaques de ação e atividade com acentos verde esmeralda (`#2ea043`, `#39d353`) e azul cibernético (`#58a6ff`).
3. **Activity Matrix de 5 Níveis**: Matriz de calor anual de 52 semanas para visualização de commits e sprints de agentes de IA.
4. **Bento Grid & Clássico**: Suporte nativo para layout clássico de documentação/portfólio e modo Bento Grid com cards translucentes.
5. **Zero Dependências Pesadas**: CSS puro com tokens semânticos, micro-animações nativas e suporte completo a Dark/Light mode com persistência.

---

## 📦 Estrutura de Arquivos

```
design-system-checkmygit/
├── tokens.css       # Tokens de Design (Cores, Tipografia, Espaçamento, Escala de Atividade)
├── components.css   # Biblioteca de Componentes (Navbar, Profile, Stat Cards, Heatmap, Repos)
├── style.css        # Variações de Layout (Bento Grid vs Clássico, Glassmorphism, Filtros)
├── app.js           # Lógica interativa, gerador da matriz de 52 semanas e filtros
├── index.html       # Showcase executável com a identidade e módulos do XYZAIOS v4.0
└── README.md        # Documentação técnica oficial do Design System
```

---

## 📐 Tokens Principais (`tokens.css`)

### Superfícies e Cores

| Variável | Dark (Padrão) | Light | Finalidade |
|---|---|---|---|
| `--bg-primary` | `#030303` | `#ffffff` | Fundo principal da aplicação |
| `--bg-secondary` | `#0d1117` | `#f6f8fa` | Fundo de cards, containers e painéis laterais |
| `--bg-tertiary` | `#161b22` | `#eaeef2` | Fundo de chips, badges e separadores |
| `--border-default` | `#30363d` | `#d0d7de` | Bordas padrão |
| `--text-primary` | `#f0f6fc` | `#1f2328` | Títulos e texto com ênfase |
| `--text-secondary` | `#8b949e` | `#656d76` | Metadados, descrições e legendas |
| `--accent-primary` | `#2ea043` | `#1f883d` | Botões e indicadores de status ativos |
| `--accent-blue` | `#58a6ff` | `#0969da` | Links de navegação e módulos |

### Escala de Atividade dos Agentes (Heatmap)

| Nível | Cor Dark | Cor Light |
|---|---|---|
| `data-level="0"` | `#161b22` | `#ebedf0` |
| `data-level="1"` | `#0e4429` | `#9be9a8` |
| `data-level="2"` | `#006d32` | `#40c463` |
| `data-level="3"` | `#26a641` | `#30a14e` |
| `data-level="4"` | `#39d353` | `#216e39` |

---

## 🧩 Componentes do XYZAIOS

### 1. Top Navbar (`.cmg-navbar`)
- Logotipo com gradiente esmeralda.
- Alternador de visualização instantâneo (Modo Clássico / Bento Grid).
- Ações rápidas: Exportar dados em JSON, compartilhar link oficial e código QR.
- Alternador de tema Dark / Light.

### 2. Painel de Identidade do Framework (`.cmg-sidebar`)
- Avatar com pulso luminoso de status ativo (`Core v4.0 Active`).
- Título institucional, bio do framework e tags dos pilares de arquitetura.
- Links e estatísticas oficiais do repositório.

### 3. Cards de Métricas (`.cmg-stats-grid`)
- Total de Commits & Atividade (`1.420`).
- Versão do Core (`v4.0`).
- Squad de Agentes Autônomos (`12 Agentes`).
- Stars no GitHub.

### 4. Matriz de Atividade de 52 Semanas (`.cmg-heatmap-section`)
- Matriz completa de 52 semanas × 7 dias com meses e dias rotulados.
- Hover tooltip com contagem detalhada e data em português.
- Legenda de intensidade.

### 5. Repositórios e Módulos (`.cmg-repos-grid`)
- Cards para cada módulo do ecossistema: `xyzaios`, `aios-core`, `aios-pro-cli`, `skills-workflows`, `synapse-engine` e `sdk-python`.
- Filtros interativos por termo de busca e linguagem de programação.

---

## 🚀 Execução Local

Para testar localmente em uma porta livre (ex.: `8080` ou `5500`):

```powershell
python -m http.server 8080 --directory e:\xyzaios\design-system-checkmygit
```

Acesse: `http://localhost:8080`
