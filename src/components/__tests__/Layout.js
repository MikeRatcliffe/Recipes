import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { hasClass, textContent } from "../../../testing/test-helpers";

import Layout from "../Layout";

describe("Layout component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("layout attributes are correct", async () => {
    const text = "test-layout-children";
    const className = "test-layout-classname";

    render(<Layout className={className}>{text}</Layout>);

    expect(
      await hasClass({ testId: "layout-container", className: className })
    ).toBeTruthy();

    expect(await textContent({ role: "main" })).toEqual(text);
  });
});
