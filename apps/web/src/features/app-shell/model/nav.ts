import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  CalendarDays,
  CalendarRange,
  Trophy,
  Filter,
  Users,
  UsersRound,
  Mic,
  Sparkles,
  PenTool,
  Radio,
  ChevronDown,
  Shield,
  Settings,
  ScrollText,
  RefreshCcw,
  Wrench,
  Globe,
  ShoppingCart,
} from "lucide-react";

export type NavLeaf = {
  kind: "leaf";
  label: string; // texto (PT-BR)
  href: string; // rota (EN)
  icon: LucideIcon;
};

export type NavBranch = {
  kind: "branch";
  label: string;
  icon: LucideIcon;
  // prefixo pra marcar ativo (ex: /team)
  activePrefix: string;
  // children (sub rotas)
  children: Array<NavLeaf>;
};

export type NavItem = NavLeaf | NavBranch;

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "",
    items: [
      { kind: "leaf", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { kind: "leaf", label: "Análise Semanal", href: "/weekly-analysis", icon: CalendarDays },
      { kind: "leaf", label: "Análise Anual", href: "/yearly-analysis", icon: CalendarRange },
      { kind: "leaf", label: "Competições", href: "/competitions", icon: Trophy },
      { kind: "leaf", label: "Análise de Funis", href: "/funnel-analysis", icon: Filter },

      {
        kind: "branch",
        label: "Equipe",
        icon: Users,
        activePrefix: "/team",
        children: [
          { kind: "leaf", label: "Squad", href: "/team/squad", icon: UsersRound },
          { kind: "leaf", label: "Copy VSL", href: "/team/copy-vsl", icon: Mic },
          { kind: "leaf", label: "Copy Criativos", href: "/team/copy-creatives", icon: Sparkles },
          { kind: "leaf", label: "Editor Criativos", href: "/team/creative-editor", icon: PenTool },
          { kind: "leaf", label: "Gestor de Tráfego", href: "/team/traffic-manager", icon: Radio },
        ],
      },
    ],
  },
  {
    title: "Administração",
    items: [
      { kind: "leaf", label: "Administração", href: "/administration", icon: Shield },
      { kind: "leaf", label: "Configurações Gerais", href: "/general-settings", icon: Settings },
    ],
  },
  {
    title: "Área de Desenvolvedores",
    items: [
      { kind: "leaf", label: "Logs de Auditoria", href: "/audit-logs", icon: ScrollText },
      { kind: "leaf", label: "Sincronização RedTrack", href: "/redtrack-sync", icon: RefreshCcw },
      { kind: "leaf", label: "Configurações de Desenvolvimento", href: "/development-settings", icon: Wrench },
      { kind: "leaf", label: "Fontes de Tráfego", href: "/traffic-sources", icon: Globe },
      { kind: "leaf", label: "Fontes de Vendas", href: "/sales-sources", icon: ShoppingCart },
    ],
  },
];

// export opcional caso queira usar em UI
export const Icons = { ChevronDown };
