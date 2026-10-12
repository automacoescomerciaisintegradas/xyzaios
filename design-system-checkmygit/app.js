/**
 * XYZAIOS Design System - Interactive Application Logic
 * Showcase oficial do ecossistema: automacoescomerciaisintegradas
 * XYZAIOS Core Framework v4.0 + Cleudocode Core v2.0 + REA Agents MCP
 */

const PROFILE_DATA = {
  login: "automacoescomerciaisintegradas",
  repoName: "xyzaios",
  name: "XYZAIOS & Cleudocode",
  title: "AI-Orchestrated System for Full Stack Development",
  version: "Core Framework v4.0 • Cleudocode v2.0",
  bio: "Super máquina de criar códigos baseada em AIOS + AIOX-Core. Framework unificado de orquestração com enxame semântico de agentes de IA, paridade multi-IDE e 116 ferramentas REA via MCP.",
  avatarUrl: "https://github.com/automacoescomerciaisintegradas.png",
  company: "Automações Comerciais Integradas",
  repoUrl: "https://github.com/automacoescomerciaisintegradas/xyzaios",
  websiteUrl: "https://github.com/automacoescomerciaisintegradas/xyzaios",
  email: "automacoescomerciais@gmail.com",
  followers: 48,
  following: 5,
  totalContributions: 1680,
  longestStreak: 54,
  currentStreak: 16,
  totalStars: 124,
  repositories: [
    {
      name: "xyzaios",
      description: "XYZAIOS: AI-Orchestrated System for Full Stack Development - Core Framework v4.0.",
      language: "TypeScript",
      langColor: "#3178c6",
      stars: 48,
      forks: 12,
      url: "https://github.com/automacoescomerciaisintegradas/xyzaios",
      tags: ["aios", "framework-v4", "ai-orchestration", "multi-ide"]
    },
    {
      name: "cleudocode-core",
      description: "Cleudocode Core - Super Máquina de Criar Códigos baseada em AIOS + AIOX-Core com swarm semântico de agentes.",
      language: "JavaScript",
      langColor: "#f1e05a",
      stars: 36,
      forks: 8,
      url: "https://github.com/automacoescomerciaisintegradas/cleudocode-core",
      tags: ["cleudocode", "swarm", "semantic-agents", "ollama"]
    },
    {
      name: "rea-agents",
      description: "Suite avançada com 116 ferramentas de engenharia reversa e análise estática/dinâmica integrada via protocolo MCP.",
      language: "TypeScript",
      langColor: "#3178c6",
      stars: 24,
      forks: 5,
      url: "https://github.com/automacoescomerciaisintegradas",
      tags: ["mcp-server", "reverse-engineering", "binary-analysis"]
    },
    {
      name: "aios-core",
      description: "Núcleo executivo do framework, constitution rules e barramento de autoridade dos 12 agentes.",
      language: "JavaScript",
      langColor: "#f1e05a",
      stars: 18,
      forks: 6,
      url: "https://github.com/automacoescomerciaisintegradas/xyzaios/tree/main/.aios-core",
      tags: ["core-engine", "constitution", "agents"]
    },
    {
      name: "aios-pro-cli",
      description: "CLI inteligente com ferramentas de linha de comando para automação de tarefas e quality gates.",
      language: "JavaScript",
      langColor: "#f1e05a",
      stars: 14,
      forks: 4,
      url: "https://github.com/automacoescomerciaisintegradas/xyzaios/tree/main/packages/aios-pro-cli",
      tags: ["cli", "automation", "quality-gates"]
    },
    {
      name: "skills-workflows",
      description: "Workflows executáveis para sincronização, backup, testes de tipo e deploy seguro.",
      language: "Shell",
      langColor: "#89e051",
      stars: 9,
      forks: 2,
      url: "https://github.com/automacoescomerciaisintegradas/xyzaios/tree/main/skills/workflows",
      tags: ["lobster", "workflows", "devops"]
    }
  ],
  languages: [
    { name: "JavaScript", percent: 42.1, color: "#f1e05a" },
    { name: "TypeScript", percent: 36.8, color: "#3178c6" },
    { name: "Python", percent: 11.5, color: "#3572A5" },
    { name: "Shell", percent: 7.2, color: "#89e051" },
    { name: "Markdown / Docs", percent: 2.4, color: "#083fa1" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderHeatmap();
  renderLanguages();
  renderRepositories(PROFILE_DATA.repositories);
  initEventListeners();
});

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem("xyz-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("xyz-theme", next);
      showToast(`Tema alterado para ${next === 'dark' ? 'Modo Escuro' : 'Modo Claro'}`);
    });
  }
}

/* ==========================================================================
   Contribution Heatmap Generator (52 Weeks x 7 Days)
   ========================================================================== */
function renderHeatmap() {
  const container = document.getElementById("heatmap-weeks");
  if (!container) return;

  container.innerHTML = "";
  const tooltip = document.getElementById("cmg-tooltip");

  const today = new Date();
  const weeks = 52;

  for (let w = 0; w < weeks; w++) {
    const col = document.createElement("div");
    col.className = "cmg-heatmap-col";

    for (let d = 0; d < 7; d++) {
      const cell = document.createElement("div");
      cell.className = "cmg-heatmap-cell";

      const daysAgo = (weeks - 1 - w) * 7 + (6 - d);
      const cellDate = new Date(today);
      cellDate.setDate(cellDate.getDate() - daysAgo);

      const rand = Math.random();
      let level = 0;
      let count = 0;

      if (rand > 0.38) {
        if (rand > 0.82) { level = 4; count = Math.floor(Math.random() * 12) + 14; }
        else if (rand > 0.65) { level = 3; count = Math.floor(Math.random() * 7) + 7; }
        else if (rand > 0.48) { level = 2; count = Math.floor(Math.random() * 5) + 3; }
        else { level = 1; count = 1; }
      }

      cell.setAttribute("data-level", level);
      cell.setAttribute("data-count", count);
      cell.setAttribute("data-date", cellDate.toLocaleDateString("pt-BR", { month: "short", day: "numeric", year: "numeric" }));

      cell.addEventListener("mouseenter", (e) => {
        const text = count === 0 
          ? `Nenhuma atividade em ${cell.getAttribute("data-date")}`
          : `${count} contribuiç${count > 1 ? 'ões' : 'ão'} no ecossistema em ${cell.getAttribute("data-date")}`;
        
        tooltip.textContent = text;
        tooltip.classList.add("visible");
        
        const rect = cell.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX - 40}px`;
        tooltip.style.top = `${rect.top + window.scrollY - 32}px`;
      });

      cell.addEventListener("mouseleave", () => {
        tooltip.classList.remove("visible");
      });

      col.appendChild(cell);
    }

    container.appendChild(col);
  }
}

/* ==========================================================================
   Languages Breakdown Render
   ========================================================================== */
function renderLanguages() {
  const progressBar = document.getElementById("lang-progress-bar");
  const legendList = document.getElementById("lang-legend-list");
  if (!progressBar || !legendList) return;

  progressBar.innerHTML = "";
  legendList.innerHTML = "";

  PROFILE_DATA.languages.forEach(lang => {
    const segment = document.createElement("div");
    segment.className = "cmg-progress-segment";
    segment.style.width = `${lang.percent}%`;
    segment.style.backgroundColor = lang.color;
    segment.title = `${lang.name}: ${lang.percent}%`;
    progressBar.appendChild(segment);

    const item = document.createElement("div");
    item.className = "cmg-lang-legend-item";
    item.innerHTML = `
      <span class="cmg-lang-dot" style="background-color: ${lang.color}"></span>
      <span class="cmg-lang-name">${lang.name}</span>
      <span class="text-text-secondary">${lang.percent}%</span>
    `;
    legendList.appendChild(item);
  });
}

/* ==========================================================================
   Repositories Render & Search Filter
   ========================================================================== */
function renderRepositories(repos) {
  const grid = document.getElementById("repos-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (repos.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: var(--text-secondary);">
        Nenhum repositório ou módulo encontrado com esse filtro.
      </div>
    `;
    return;
  }

  repos.forEach(repo => {
    const card = document.createElement("div");
    card.className = "cmg-repo-card";

    card.innerHTML = `
      <div>
        <div class="cmg-repo-header">
          <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="cmg-repo-title-link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h6.5a.25.25 0 0 1 .25.25v2.5a.25.25 0 0 1-.25.25h-6.5a.25.25 0 0 1-.25-.25Z"></path>
            </svg>
            ${repo.name}
          </a>
          <span class="cmg-badge-public">Public</span>
        </div>
        <p class="cmg-repo-desc">${repo.description}</p>
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px;">
          ${repo.tags.map(t => `<span class="cmg-pill" style="font-size: 10px; padding: 2px 6px;">#${t}</span>`).join("")}
        </div>
      </div>
      <div class="cmg-repo-footer">
        <div style="display: flex; align-items: center; gap: 6px;">
          <span class="cmg-lang-dot" style="background-color: ${repo.langColor}"></span>
          <span>${repo.language}</span>
        </div>
        <div class="cmg-repo-stats">
          <div class="cmg-repo-stat-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
            </svg>
            ${repo.stars}
          </div>
          <div class="cmg-repo-stat-item">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
            </svg>
            ${repo.forks}
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ==========================================================================
   Event Listeners (Search, Filter, Style Switch, Modals)
   ========================================================================== */
function initEventListeners() {
  const searchInput = document.getElementById("repo-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = PROFILE_DATA.repositories.filter(r => 
        r.name.toLowerCase().includes(q) || 
        (r.description && r.description.toLowerCase().includes(q))
      );
      renderRepositories(filtered);
    });
  }

  const langSelect = document.getElementById("repo-lang-filter");
  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      const lang = e.target.value;
      if (!lang || lang === "all") {
        renderRepositories(PROFILE_DATA.repositories);
      } else {
        const filtered = PROFILE_DATA.repositories.filter(r => r.language === lang);
        renderRepositories(filtered);
      }
    });
  }

  const styleSelect = document.getElementById("style-select");
  if (styleSelect) {
    styleSelect.addEventListener("change", (e) => {
      const style = e.target.value;
      const main = document.getElementById("portfolio-container");
      if (style === "bento") {
        main.classList.add("view-bento");
        showToast("Modo Bento Grid ativado");
      } else {
        main.classList.remove("view-bento");
        showToast("Modo GitHub Classic ativado");
      }
    });
  }

  setupModal("btn-share", "modal-share");
  setupModal("btn-qr", "modal-qr");
  setupModal("btn-export", "modal-export");

  const copyBtn = document.getElementById("copy-profile-link");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("https://github.com/automacoescomerciaisintegradas/xyzaios");
      showToast("Link do XYZAIOS copiado!");
    });
  }

  const exportJsonBtn = document.getElementById("download-json-btn");
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(PROFILE_DATA, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `xyzaios-metadata.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Dados do XYZAIOS exportados em JSON!");
    });
  }
}

function setupModal(btnId, modalId) {
  const btn = document.getElementById(btnId);
  const modal = document.getElementById(modalId);
  if (!btn || !modal) return;

  btn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  const closeBtn = modal.querySelector(".cmg-modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

function showToast(message) {
  let toast = document.getElementById("cmg-toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("active");

  setTimeout(() => {
    toast.classList.remove("active");
  }, 2800);
}
