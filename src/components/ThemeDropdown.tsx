import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavDropdown } from "react-bootstrap";
import Moon from "../../content/assets/color-theme-moon-icon.inline.svg";
import Sun from "../../content/assets/color-theme-sun-icon.inline.svg";
import Auto from "../../content/assets/color-theme-auto-icon.inline.svg";
import Tick from "../../content/assets/color-theme-tick-icon.inline.svg";

const IS_SERVER = typeof window === "undefined";

const arrayOfThemes = [
  { name: "Light", icon: <Sun /> },
  { name: "Dark", icon: <Moon /> },
  { name: "Auto", icon: <Auto /> },
];

function setThemeAttribute(theme: string) {
  if (IS_SERVER) {
    return;
  }

  const htmlNode = document.documentElement;

  if (
    theme === "auto" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    htmlNode.setAttribute("data-bs-theme", "dark");
  } else {
    htmlNode.setAttribute("data-bs-theme", theme);
  }
}

function getPreferredTheme() {
  // SSR? Return "light".
  if (IS_SERVER) {
    return "light";
  }

  // Stored in localStorage? Return that value.
  return localStorage.getItem("theme") || "light";
}

function getCurrentIcon(colorMode: string) {
  for (const theme of arrayOfThemes) {
    if (theme.name.toLowerCase() === colorMode) {
      return theme.icon;
    }
  }
  return "";
}

const ThemeDropdown = ({ className = "" }): JSX.Element | null => {
  const [hydrated, setHydrated] = useState(false);
  const [colorMode, setColorMode] = useState(getPreferredTheme());

  useEffect(() => {
    if (colorMode === "auto") {
      const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setPreferredTheme(osTheme);
    } else {
      setPreferredTheme(colorMode);
    }
    setHydrated(true);
  }, []);

  function setPreferredTheme(theme: string) {
    setThemeAttribute(theme);
    setColorMode(theme);
    localStorage.setItem("theme", theme);
  }

  return hydrated ? (
    <NavDropdown
      title={getCurrentIcon(colorMode)}
      className={className}
      data-testid="navdropdown-theme"
    >
      {arrayOfThemes.map((theme) => {
        const active = colorMode === theme.name.toLowerCase();
        return (
          <NavDropdown.Item
            key={theme.name}
            className={active ? "active" : ""}
            data-testid={`navdropdown-theme-option-${theme.name.toLowerCase()}`}
            onClick={() => {
              setPreferredTheme(theme.name.toLocaleLowerCase());
            }}
          >
            {" "}
            {theme.icon} {theme.name} {active ? <Tick /> : ""}
          </NavDropdown.Item>
        );
      })}
    </NavDropdown>
  ) : null;
};

ThemeDropdown.propTypes = {
  className: PropTypes.string,
};

export default ThemeDropdown;
