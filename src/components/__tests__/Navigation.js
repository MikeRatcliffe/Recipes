import React from "react";
import { render } from "@testing-library/react";
import { useStaticQuery } from "gatsby";
import "@testing-library/jest-dom/extend-expect";
import { href, textContent } from "../../../testing/test-helpers";

import Navigation from "../Navigation";

describe("Navigation component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigation links are correct", async () => {
    const { findByTestId } = render(<Navigation />);
    const nav = await findByTestId("nav");
    const data = useStaticQuery();

    const brandLink = await findByTestId("navbar-brand-link");
    expect(brandLink).toBeTruthy();
    expect(await href({ node: brandLink })).toEqual(document.location.href);
    expect(await textContent({ node: brandLink })).toEqual(
      data.site.siteMetadata.title
    );

    const selectors = new Map([
      [`a[href="/"]`, "Home"],
      [`a[href="/recipes"]`, "Recipes"],
      [`a[href="/tags"]`, "Tags"],
      [`a[href="/about"]`, "About Us"],
      [`a[href="/search"]`, "Search"],
    ]);
    for (const [selector, title] of selectors.entries()) {
      const node = nav.querySelector(selector);

      expect(node).toBeTruthy();
      expect(await textContent({ node })).toEqual(title);
    }
  });
});
