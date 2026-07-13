"use client";

import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { useHydrated } from "@/components/theme/use-hydrated";

type ThemeName = "light" | "dark" | "system";

type ThemeToggleViewProps = {
  theme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
};

const themeOptions: Array<{
  name: ThemeName;
  label: string;
  icon: LucideIcon;
}> = [
  { name: "light", label: "切换到浅色模式", icon: Sun },
  { name: "dark", label: "切换到深色模式", icon: Moon },
  { name: "system", label: "跟随系统主题", icon: Monitor },
];

export function ThemeToggleView({
  theme,
  onThemeChange,
}: ThemeToggleViewProps) {
  return (
    <div
      aria-label="主题模式"
      className="theme-toggle"
      role="group"
    >
      {themeOptions.map(({ name, label, icon: Icon }) => (
        <button
          key={name}
          aria-label={label}
          aria-pressed={theme === name}
          className="theme-toggle-button size-9"
          title={label}
          type="button"
          onClick={() => onThemeChange(name)}
        >
          <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
        </button>
      ))}
    </div>
  );
}

export function ThemeTogglePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="theme-toggle theme-toggle-placeholder"
    />
  );
}

export function ThemeToggle() {
  const hydrated = useHydrated();
  const { theme, setTheme } = useTheme();
  const selectedTheme: ThemeName =
    theme === "light" || theme === "dark" ? theme : "system";

  if (!hydrated) {
    return <ThemeTogglePlaceholder />;
  }

  return <ThemeToggleView theme={selectedTheme} onThemeChange={setTheme} />;
}
