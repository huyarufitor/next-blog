"use client";

import { Moon, Sun, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { useHydrated } from "@/components/theme/use-hydrated";

type ThemeName = "light" | "dark";

export type ThemeToggleState = {
  currentTheme: ThemeName;
  nextTheme: ThemeName;
  label: string;
  icon: LucideIcon;
};

type ThemeToggleViewProps = {
  state: ThemeToggleState;
  onToggle: () => void;
};

export function getThemeToggleState(resolvedTheme?: string): ThemeToggleState {
  if (resolvedTheme === "dark") {
    return {
      currentTheme: "dark",
      nextTheme: "light",
      label: "切换到浅色模式",
      icon: Sun,
    };
  }

  return {
    currentTheme: "light",
    nextTheme: "dark",
    label: "切换到深色模式",
    icon: Moon,
  };
}

export function ThemeToggleView({
  state,
  onToggle,
}: ThemeToggleViewProps) {
  const Icon = state.icon;

  return (
    <button
      aria-label={state.label}
      className="theme-toggle-button size-10"
      data-current-theme={state.currentTheme}
      title={state.label}
      type="button"
      onClick={onToggle}
    >
      <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
    </button>
  );
}

export function ThemeTogglePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="theme-toggle-button theme-toggle-placeholder size-10"
    />
  );
}

export function ThemeToggle() {
  const hydrated = useHydrated();
  const { resolvedTheme, setTheme } = useTheme();

  if (!hydrated) {
    return <ThemeTogglePlaceholder />;
  }

  const state = getThemeToggleState(resolvedTheme);

  return (
    <ThemeToggleView
      state={state}
      onToggle={() => setTheme(state.nextTheme)}
    />
  );
}
