/**
 * CheckMyGit - Interactive Application Logic
 * Featuring @madeinlowcode Profile Demo
 */

const PROFILE_DATA = {
  login: "madeinlowcode",
  name: "MadeInLowCode",
  bio: "Especialista em Low-Code, automações inteligentes, Claude Code Skills, agentes de IA e integrações de alto impacto.",
  avatarUrl: "https://avatars.githubusercontent.com/u/197310556?v=4",
  company: "@madeinlowcode",
  websiteUrl: "https://madeinlowcode.app.br",
  email: "madeinlowcode@gmail.com",
  followers: 8,
  following: 1,
  totalContributions: 648,
  longestStreak: 24,
  currentStreak: 7,
  repositories: [
    {
      name: "skills-claude-code",
      description: "Repositório completo de Skills e ferramentas para agentes Claude Code.",
      language: "Python",
      langColor: "#3572A5",
      stars: 7,
      forks: 3,
      url: "https://github.com/madeinlowcode/skills-claude-code",
      tags: ["claude-code", "skills", "agent-framework"]
    },
    {
      name: "api-Playwright-IA",
      description: "API de automação com Playwright assistida por Inteligência Artificial e scraping headless.",
      language: "JavaScript",
      langColor: "#f1e05a",
      stars: 4,
      forks: 3,
      url: "https://github.com/madeinlowcode/api-Playwright-IA",
      tags: ["playwright", "ai", "automation"]
    },
    {
      name: "claude-code",
      description: "Configurações avançadas, prompts e regras de otimização para Claude Code.",
      language: "Markdown",
      langColor: "#083fa1",
      stars: 2,
      forks: 1,
      url: "https://github.com/madeinlowcode/claude-code",
      tags: ["aios", "rules", "developer-tools"]
    },
    {
      name: "TTS-Studio-Google",
      description: "API e estúdio web de geração de voz neural com Google Cloud TTS.",
      language: "HTML",
      langColor: "#e34c26",
      stars: 2,
      forks: 1,
      url: "https://github.com/madeinlowcode/TTS-Studio-Google",
      tags: ["tts", "google-cloud", "audio"]
    },
    {
      name: "openwork",
      description: "Openwork™ is the open source AI coworker that lives on your desktop.",
      language: "TypeScript",
      langColor: "#3178c6",
      stars: 1,
      forks: 0,
      url: "https://github.com/madeinlowcode/openwork",
      tags: ["desktop-agent", "typescript", "coworker"]
    },
    {
      name: "claude-octopus",
      description: "Multi-tentacled orchestrator for Claude Code - Coordinates Codex CLI and Gemini CLI for parallel execution.",
      language: "Shell",
      langColor: "#89e051",
      stars: 1,
      forks: 0,
      url: "https://github.com/madeinlowcode/claude-octopus",
      tags: ["orchestrator", "cli", "multi-agent"]
    },
    {
      name: "chatwoot-megaapi-bridge",
      description: "Bridge multi-tenant em Go conectando Chatwoot self-hosted à megaAPI (WhatsApp) com balanceamento de carga.",
      language: "Go",
      langColor: "#00ADD8",
      stars: 1,
      forks: 0,
      url: "https://github.com/madeinlowcode/chatwoot-megaapi-bridge",
      tags: ["go", "chatwoot", "whatsapp"]
    },
    {
      name: "everything-claude-code",
      description: "Coleção de agentes, skills, hooks, comandos e MCPs desenvolvidos para Claude Code.",
      language: "JavaScript",
      langColor: "#f1e05a",
      stars: 2,
      forks: 1,
      url: "https://github.com/madeinlowcode/everything-claude-code",
      tags: ["mcps", "agents", "skills"]
    }
  ],
  languages: [
    { name: "TypeScript", percent: 42.5, color: "#3178c6" },
    { name: "Python", percent: 28.3, color: "#3572A5" },
    { name: "JavaScript", percent: 14.8, color: "#f1e05a" },
    { name: "Go", percent: 8.2, color: "#00ADD8" },
    { name: "Shell", percent: 6.2, color: "#89e051" }
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
  const savedTheme = localStorage.getItem("cmg-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("cmg-theme", next);
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

      // Calculate approximate date going back in time
      const daysAgo = (weeks - 1 - w) * 7 + (6 - d);
      const cellDate = new Date(today);
      cellDate.setDate(cellDate.getDate() - daysAgo);

      // Generate activity level based on realistic clusters
      const rand = Math.random();
      let level = 0;
      let count = 0;

      if (rand > 0.45) {
        if (rand > 0.88) { level = 4; count = Math.floor(Math.random() * 8) + 10; }
        else if (rand > 0.72) { level = 3; count = Math.floor(Math.random() * 5) + 5; }
        else if (rand > 0.58) { level = 2; count = Math.floor(Math.random() * 3) + 2; }
        else { level = 1; count = 1; }
      }

      cell.setAttribute("data-level", level);
      cell.setAttribute("data-count", count);
      cell.setAttribute("data-date", cellDate.toLocaleDateString("pt-BR", { month: "short", day: "numeric", year: "numeric" }));

      // Tooltip handling
      cell.addEventListener("mouseenter", (e) => {
        const text = count === 0 
          ? `Nenhuma contribuição em ${cell.getAttribute("data-date")}`
          : `${count} contribuiç${count > 1 ? 'ões' : 'ão'} em ${cell.getAttribute("data-date")}`;
        
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
    // Progress segment
    const segment = document.createElement("div");
    segment.className = "cmg-progress-segment";
    segment.style.width = `${lang.percent}%`;
    segment.style.backgroundColor = lang.color;
    segment.title = `${lang.name}: ${lang.percent}%`;
    progressBar.appendChild(segment);

    // Legend item
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
        Nenhum repositório encontrado com esse filtro.
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
        <p class="cmg-repo-desc">${repo.description || "Sem descrição informada."}</p>
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
  // Search input
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

  // Language filter select
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

  // Style Switcher (GitHub Style vs Bento)
  const styleSelect = document.getElementById("style-select");
  if (styleSelect) {
    styleSelect.addEventListener("change", (e) => {
      const style = e.target.value;
      const main = document.getElementById("portfolio-container");
      if (style === "bento") {
        main.classList.add("view-bento");
        showToast("Estilo Bento Grid ativado");
      } else {
        main.classList.remove("view-bento");
        showToast("Estilo GitHub Classic ativado");
      }
    });
  }

  // Modal handlers
  setupModal("btn-share", "modal-share");
  setupModal("btn-qr", "modal-qr");
  setupModal("btn-export", "modal-export");

  // Copy Buttons
  const copyBtn = document.getElementById("copy-profile-link");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText("https://checkmygit.com/madeinlowcode");
      showToast("Link copiado para a área de transferência!");
    });
  }

  const exportJsonBtn = document.getElementById("download-json-btn");
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(PROFILE_DATA, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `checkmygit-${PROFILE_DATA.login}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Arquivo JSON exportado com sucesso!");
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
