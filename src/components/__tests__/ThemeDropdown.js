import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ThemeDropdown from "../ThemeDropdown";

describe("ThemeDropdown component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: true,
          // addListener: function () {},
          // removeListener: function () {},
        };
      };
  });

  it("theme dropdown links are correct", async () => {
    const { findByTestId } = render(<ThemeDropdown />);
    const dropdown = await findByTestId("navdropdown-theme");
    const clickableDropdown = dropdown.querySelector("a");
    const htmlNode = dropdown.ownerDocument.documentElement;

    const initialTheme = htmlNode.getAttribute("data-bs-theme");
    expect(initialTheme).toEqual("light");

    fireEvent.click(clickableDropdown);
    const light = await findByTestId(`navdropdown-theme-option-light`);
    const dark = await findByTestId(`navdropdown-theme-option-dark`);
    const auto = await findByTestId(`navdropdown-theme-option-auto`);

    expect(light.textContent.trim()).toEqual("Light");
    expect(dark.textContent.trim()).toEqual("Dark");
    expect(auto.textContent.trim()).toEqual("Auto");

    fireEvent.click(dark);
    expect(htmlNode.getAttribute("data-bs-theme")).toEqual("dark");

    fireEvent.click(light);
    expect(htmlNode.getAttribute("data-bs-theme")).toEqual("light");

    fireEvent.click(auto);
    expect(htmlNode.getAttribute("data-bs-theme")).toEqual("dark");
  });
});
