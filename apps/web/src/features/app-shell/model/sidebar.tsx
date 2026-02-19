"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_GROUPS, Icons } from "../model/nav";

function cx(...v: Array<string | false | undefined>) {
  return v.filter(Boolean).join(" ");
}

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.02 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -6, filter: "blur(2px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.18 },
  },
};

export function Sidebar() {
  const pathname = usePathname();

  // abre automaticamente o "Equipe" se estiver em /team/*
  const shouldOpenTeam = useMemo(
    () => pathname.startsWith("/team"),
    [pathname],
  );

  // null = não forcei manualmente; segue a rota
  const [openTeam, setOpenTeam] = useState<boolean | null>(null);

  // se usuário não clicou, segue a rota; se clicou, respeita o clique
  const isTeamOpen = openTeam ?? shouldOpenTeam;

  function toggleTeam() {
    setOpenTeam((prev) => !(prev ?? shouldOpenTeam));
  }

  function isActiveLeaf(href: string) {
    return pathname === href;
  }

  function isActivePrefix(prefix: string) {
    return pathname === prefix || pathname.startsWith(prefix + "/");
  }

  return (
    <aside className="w-[260px] border-r bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
      <div className="h-16 px-5 flex items-center gap-3 border-b">
        <div className="h-9 w-9 rounded-lg bg-zinc-900 text-white grid place-items-center font-bold">
          MG
        </div>
        <div className="leading-tight">
          <div className="font-semibold">MG Company</div>
          <div className="text-xs text-zinc-500">BI Dashboard</div>
        </div>
      </div>

      <nav className="p-3 space-y-4">
        {NAV_GROUPS.map((group, idx) => (
          <div key={idx} className="space-y-2">
            {group.title ? (
              <div className="px-3 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">
                {group.title}
              </div>
            ) : null}

            {/* animação “aparecendo um por um” */}
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="space-y-1"
            >
              {group.items.map((item) => {
                // LEAF
                if (item.kind === "leaf") {
                  const active = isActiveLeaf(item.href);
                  const Icon = item.icon;

                  return (
                    <motion.li key={item.href} variants={itemVariants}>
                      <Link
                        href={item.href}
                        className={cx(
                          // AWS neon (só glow, sem pintar fundo)
                          "aws-neon",
                          active && "aws-neon--active",
                          "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                          // importante: NÃO usar bg “colorido” aqui
                          active
                            ? "bg-zinc-900 text-white"
                            : "text-zinc-700 hover:bg-zinc-50",
                        )}
                      >
                        <Icon
                          className={cx(
                            "h-4 w-4",
                            active
                              ? "text-white"
                              : "text-zinc-500 group-hover:text-zinc-900",
                          )}
                        />
                        <span>{item.label}</span>
                      </Link>
                    </motion.li>
                  );
                }

                // BRANCH (Equipe)
                const branchActive = isActivePrefix(item.activePrefix);
                const BranchIcon = item.icon;
                const Chevron = Icons.ChevronDown;

                return (
                  <motion.li
                    key={item.activePrefix}
                    variants={itemVariants}
                    className="space-y-1"
                  >
                    <button
                      type="button"
                      onClick={toggleTeam}
                      className={cx(
                        // AWS neon
                        "aws-neon",
                        branchActive && "aws-neon--active",
                        "w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                        branchActive
                          ? "bg-zinc-100 text-zinc-900"
                          : "text-zinc-700 hover:bg-zinc-50",
                      )}
                      aria-expanded={isTeamOpen}
                    >
                      <span className="flex items-center gap-2">
                        <BranchIcon
                          className={cx(
                            "h-4 w-4",
                            branchActive ? "text-zinc-900" : "text-zinc-500",
                          )}
                        />
                        <span>{item.label}</span>
                      </span>

                      <motion.span
                        animate={{ rotate: isTeamOpen ? 180 : 0 }}
                        transition={{ duration: 0.18 }}
                        className="text-zinc-400"
                      >
                        <Chevron className="h-4 w-4" />
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isTeamOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          {/* wrapper do submenu (fecha certinho e fica bonito) */}
                          <div className="ml-3 mt-1 rounded-xl bg-zinc-50/80 p-1">
                            <motion.ul
                              variants={listVariants}
                              initial="hidden"
                              animate="show"
                              className="space-y-1"
                            >
                              {item.children.map((child) => {
                                const active = isActiveLeaf(child.href);
                                const Icon = child.icon;

                                return (
                                  <motion.li
                                    key={child.href}
                                    variants={itemVariants}
                                  >
                                    <Link
                                      href={child.href}
                                      className={cx(
                                        // AWS neon
                                        "aws-neon",
                                        active && "aws-neon--active",
                                        "group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                                        active
                                          ? "bg-zinc-900 text-white"
                                          : "text-zinc-700 hover:bg-white/70",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/50 focus-visible:ring-offset-0",
                                      )}
                                    >
                                      <Icon
                                        className={cx(
                                          "h-4 w-4",
                                          active
                                            ? "text-white"
                                            : "text-zinc-500 group-hover:text-zinc-900",
                                        )}
                                      />
                                      <span>{child.label}</span>
                                    </Link>
                                  </motion.li>
                                );
                              })}
                            </motion.ul>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
