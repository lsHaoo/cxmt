import { TAB_GROUPS, TAB_PATHS, PATH_TO_TAB, type Tab, iconForTab, titleForTab } from "./navigation.js";

// Enhanced navigation structure for iframe embedding
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  submenu?: NavItem[];
  tab?: Tab;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
  collapsible?: boolean;
}

// Two-level navigation structure for iframe mode
export const IFRAME_NAV_GROUPS: NavGroup[] = [
  {
    id: "main",
    label: "Main",
    items: [
      {
        id: "chat",
        label: "Chat",
        icon: "messageSquare",
        path: "/chat",
        tab: "chat" as Tab,
      },
    ],
  },
  {
    id: "control",
    label: "Control",
    items: [
      {
        id: "overview",
        label: "Overview",
        icon: "barChart",
        path: "/overview",
        tab: "overview" as Tab,
      },
      {
        id: "channels",
        label: "Channels",
        icon: "link",
        path: "/channels",
        tab: "channels" as Tab,
      },
      {
        id: "instances",
        label: "Instances",
        icon: "radio",
        path: "/instances",
        tab: "instances" as Tab,
      },
      {
        id: "sessions",
        label: "Sessions",
        icon: "fileText",
        path: "/sessions",
        tab: "sessions" as Tab,
      },
      {
        id: "usage",
        label: "Usage",
        icon: "barChart",
        path: "/usage",
        tab: "usage" as Tab,
      },
      {
        id: "cron",
        label: "Cron",
        icon: "loader",
        path: "/cron",
        tab: "cron" as Tab,
      },
    ],
  },
  {
    id: "agent",
    label: "Agent",
    items: [
      {
        id: "agents",
        label: "Agents",
        icon: "folder",
        path: "/agents",
        tab: "agents" as Tab,
      },
      {
        id: "skills",
        label: "Skills",
        icon: "zap",
        path: "/skills",
        tab: "skills" as Tab,
      },
      {
        id: "nodes",
        label: "Nodes",
        icon: "monitor",
        path: "/nodes",
        tab: "nodes" as Tab,
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    items: [
      {
        id: "config",
        label: "Config",
        icon: "settings",
        path: "/config",
        tab: "config" as Tab,
      },
      {
        id: "debug",
        label: "Debug",
        icon: "bug",
        path: "/debug",
        tab: "debug" as Tab,
      },
      {
        id: "logs",
        label: "Logs",
        icon: "scrollText",
        path: "/logs",
        tab: "logs" as Tab,
      },
    ],
  },
] as const;

// Flatten nav items for rendering
export function flattenNavItems(groups: NavGroup[]): NavItem[] {
  const items: NavItem[] = [];
  for (const group of groups) {
    for (const item of group.items) {
      items.push(item);
      if (item.submenu) {
        items.push(...item.submenu);
      }
    }
  }
  return items;
}

// Check if URL has embed parameter
export function isIframeMode(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("embed") === "true";
}

// Get nav item by path
export function getNavItemByPath(path: string, groups: NavGroup[]): NavItem | null {
  const normalizedPath = path.toLowerCase();
  for (const group of groups) {
    for (const item of group.items) {
      if (item.path.toLowerCase() === normalizedPath) {
        return item;
      }
      if (item.submenu) {
        for (const subItem of item.submenu) {
          if (subItem.path.toLowerCase() === normalizedPath) {
            return subItem;
          }
        }
      }
    }
  }
  return null;
}

// Get active state for nav item
export function isNavItemActive(item: NavItem, currentTab: Tab | null): boolean {
  if (item.tab && currentTab) {
    return item.tab === currentTab;
  }
  return false;
}
