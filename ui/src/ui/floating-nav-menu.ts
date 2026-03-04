import { iconForTab, titleForTab, type Tab } from "./navigation.js";

export interface FloatingNavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  tab: Tab;
}

// Flat menu structure - all items in one horizontal layout (excluding chat)
export const FLOATING_NAV_ITEMS: FloatingNavItem[] = [
  {
    id: "overview",
    label: titleForTab("overview" as Tab),
    icon: iconForTab("overview" as Tab),
    path: "/overview",
    tab: "overview" as Tab,
  },
  {
    id: "channels",
    label: titleForTab("channels" as Tab),
    icon: iconForTab("channels" as Tab),
    path: "/channels",
    tab: "channels" as Tab,
  },
  {
    id: "instances",
    label: titleForTab("instances" as Tab),
    icon: iconForTab("instances" as Tab),
    path: "/instances",
    tab: "instances" as Tab,
  },
  {
    id: "sessions",
    label: titleForTab("sessions" as Tab),
    icon: iconForTab("sessions" as Tab),
    path: "/sessions",
    tab: "sessions" as Tab,
  },
  {
    id: "usage",
    label: titleForTab("usage" as Tab),
    icon: iconForTab("usage" as Tab),
    path: "/usage",
    tab: "usage" as Tab,
  },
  {
    id: "cron",
    label: titleForTab("cron" as Tab),
    icon: iconForTab("cron" as Tab),
    path: "/cron",
    tab: "cron" as Tab,
  },
  {
    id: "agents",
    label: titleForTab("agents" as Tab),
    icon: iconForTab("agents" as Tab),
    path: "/agents",
    tab: "agents" as Tab,
  },
  {
    id: "skills",
    label: titleForTab("skills" as Tab),
    icon: iconForTab("skills" as Tab),
    path: "/skills",
    tab: "skills" as Tab,
  },
  {
    id: "nodes",
    label: titleForTab("nodes" as Tab),
    icon: iconForTab("nodes" as Tab),
    path: "/nodes",
    tab: "nodes" as Tab,
  },
  {
    id: "config",
    label: titleForTab("config" as Tab),
    icon: iconForTab("config" as Tab),
    path: "/config",
    tab: "config" as Tab,
  },
  {
    id: "debug",
    label: titleForTab("debug" as Tab),
    icon: iconForTab("debug" as Tab),
    path: "/debug",
    tab: "debug" as Tab,
  },
  {
    id: "logs",
    label: titleForTab("logs" as Tab),
    icon: iconForTab("logs" as Tab),
    path: "/logs",
    tab: "logs" as Tab,
  },
] as const;

// Get current tab from path
function getCurrentTab(): Tab | null {
  if (typeof window === "undefined") return null;
  const path = window.location.pathname.toLowerCase();
  const tabMap: Record<string, Tab> = {
    "/chat": "chat",
    "/overview": "overview",
    "/channels": "channels",
    "/instances": "instances",
    "/sessions": "sessions",
    "/usage": "usage",
    "/cron": "cron",
    "/agents": "agents",
    "/skills": "skills",
    "/nodes": "nodes",
    "/config": "config",
    "/debug": "debug",
    "/logs": "logs",
  };
  return tabMap[path] || "chat";
}

// Create SVG icon element
function createIcon(iconName: string): string {
  return `<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="${getIconPath(iconName)}"/>
  </svg>`;
}

function getIconPath(iconName: string): string {
  const paths: Record<string, string> = {
    messageSquare: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
    barChart: "M18 20V10M12 20V4M6 20v-6",
    link: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
    fileText: "M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",
    folder: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
    zap: "M13 2L3 14h9l-2 9-9-11h9l2-9z",
    monitor: "M3 3v18h18V3H3zm16 16H5V5h14v14z",
    loader: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
    settings: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-1.45-.84a2 2 0 0 0-2.72.73l-.22.38a2 2 0 0 0 .73 2.72l1.45.84a2 2 0 0 1 1 1.73v.51a2 2 0 0 0 1 1.73l1.45.84a2 2 0 0 0 2.72-.73l.22-.38a2 2 0 0 0-.73-2.72l-1.45-.84a2 2 0 0 1-1-1.73v-.51a2 2 0 0 0-1-1.73l-1.45-.84a2 2 0 0 1-2.72.73l-.22.38a2 2 0 0 0 .73 2.72l1.45.84a2 2 0 0 1 1 1.73v.51a2 2 0 0 0 1 1.73l1.45.84a2 2 0 0 1 2.72-.73l.22-.38a2 2 0 0 0-.73-2.72l-1.45-.84a2 2 0 0 1-1-1.73V3.72A2 2 0 0 0 12.22 2z",
    bug: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    scrollText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
  };
  return paths[iconName] || paths.folder;
}

// Initialize floating nav menu
export function initFloatingNavMenu(host: { tab: Tab }) {
  // Remove existing menu if any
  const existing = document.querySelector('.floating-nav-container');
  if (existing) {
    existing.remove();
  }

  const container = document.createElement('div');
  container.className = 'floating-nav-container';
  container.innerHTML = `
    <button class="floating-nav-toggle" id="navToggle" aria-label="Toggle navigation">
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"></rect>
        <rect x="14" y="3" width="7" height="7" rx="1"></rect>
        <rect x="14" y="14" width="7" height="7" rx="1"></rect>
        <rect x="3" y="14" width="7" height="7" rx="1"></rect>
      </svg>
    </button>
    <div class="floating-nav-panel" id="navPanel">
      <div class="floating-nav-header">
        <div class="floating-nav-tabs" id="navTabs">
          ${FLOATING_NAV_ITEMS.map((item: FloatingNavItem, index: number) => `
            <button class="floating-nav-item ${index === 0 ? 'active' : ''}" data-tab="${item.tab}" onclick="return false;">
              <div class="floating-nav-item__icon">${createIcon(item.icon)}</div>
              <span class="floating-nav-item__text">${item.label}</span>
            </button>
          `).join('')}
        </div>
        <button class="floating-nav-close" id="navClose" aria-label="Close menu">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="floating-nav-content" id="navContent">
        <!-- Tab content will be rendered here -->
      </div>
    </div>
    <div class="floating-nav-overlay" id="navOverlay"></div>
  `;

  document.body.appendChild(container);

  // Setup event listeners
  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('navPanel');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('navClose');

  if (toggle && panel && overlay) {
    // Toggle menu
    toggle.addEventListener('click', () => {
      toggleNavMenu();
    });

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeNavMenu();
      });
    }

    // Close on overlay click
    overlay.addEventListener('click', () => {
      closeNavMenu();
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeNavMenu();
      }
    });

    // Update active state
    updateActiveState();

    // Setup tab click handlers
    const navItems = document.querySelectorAll('.floating-nav-item');
    navItems.forEach((item: Element) => {
      item.addEventListener('click', (e: Event) => {
        const tab = item.getAttribute('data-tab');
        handleTabClick(tab, e, host);
      });
    });

    // Store original tab (should always be 'chat')
    (window as any).__originalTab = host.tab;

    // Hide toggle button after page load to avoid accidental clicks
    setTimeout(() => {
      if (toggle) {
        toggle.style.opacity = '0';
        toggle.style.pointerEvents = 'none';
      }
    }, 1000);

    // Setup scroll detection
    setupScrollDetection();

    // Load first tab content on menu open (no preload to avoid flicker)
    loadTabContent(FLOATING_NAV_ITEMS[0].tab, host);
  }
}

// Show toggle button when needed (e.g., on scroll to top)
export function showFloatingNavToggle() {
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.style.opacity = '1';
    toggle.style.pointerEvents = 'auto';
  }
}

// Hide toggle button programmatically
export function hideFloatingNavToggle() {
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.style.opacity = '0';
    toggle.style.pointerEvents = 'none';
  }
}

// Setup scroll detection to show toggle when user scrolls to top
function setupScrollDetection() {
  const toggle = document.getElementById('navToggle');
  if (!toggle) return;

  let lastScrollTop = window.scrollY;
  let scrollTimeout: number | null = null;

  window.addEventListener('scroll', () => {
    const currentScrollTop = window.scrollY;

    // Clear existing timeout
    if (scrollTimeout !== null) {
      clearTimeout(scrollTimeout);
    }

    // Check if scrolled to top (within 100px)
    if (currentScrollTop < 100) {
      // Show toggle button when at top of page
      toggle.style.opacity = '1';
      toggle.style.pointerEvents = 'auto';
    } else if (currentScrollTop > 200) {
      // Hide toggle button when scrolled down
      toggle.style.opacity = '0';
      toggle.style.pointerEvents = 'none';
    }

    scrollTimeout = window.setTimeout(() => {
      lastScrollTop = currentScrollTop;
    }, 150);
  });
}

function handleTabClick(tab: string | null, event: Event, host: { tab: Tab }) {
  // Prevent default navigation
  event.preventDefault();
  event.stopPropagation();

  // Navigate to the tab only if tab is valid
  if (!tab) return;

  // Load content for this tab
  loadTabContent(tab, host);
}

function loadTabContent(tab: string, host: { tab: Tab }) {
  const content = document.getElementById('navContent');
  if (!content) return;

  // Show loading state
  content.innerHTML = '<div class="floating-nav-loading">Loading...</div>';

  // Load from cache
  setTimeout(() => {
    const cachedHTML = tabContentCache.get(tab);
    if (cachedHTML) {
      content.innerHTML = cachedHTML;
    } else {
      // No cached content, show placeholder
      content.innerHTML = `
        <div class="floating-nav-placeholder">
          <h2 class="floating-nav-placeholder__title">${getTabTitle(tab)}</h2>
          <p class="floating-nav-placeholder__text">Content not available</p>
          <p class="floating-nav-placeholder__hint">Please close and reopen the menu</p>
        </div>
      `;
    }
  }, 100);
}

function getTabTitle(tab: string): string {
  const item = FLOATING_NAV_ITEMS.find(item => item.tab === tab);
  return item ? item.label : tab;
}

function toggleNavMenu() {
  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('navPanel');
  const overlay = document.getElementById('navOverlay');

  if (!toggle || !panel || !overlay) return;

  const isOpen = toggle.classList.contains('active');

  if (isOpen) {
    closeNavMenu();
  } else {
    toggle.classList.add('active');
    panel.classList.add('open');
    overlay.classList.add('open');
    document.body.classList.add('floating-nav-open');
  }
}

function closeNavMenu() {
  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('navPanel');
  const overlay = document.getElementById('navOverlay');

  if (toggle) toggle.classList.remove('active');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.classList.remove('floating-nav-open');
}

function updateActiveState() {
  const currentTab = getCurrentTab();
  const items = document.querySelectorAll('.floating-nav-item');

  items.forEach(item => {
    const itemTab = item.getAttribute('data-tab');
    if (itemTab === currentTab) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}
