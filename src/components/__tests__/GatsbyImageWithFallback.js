import React from "react";
import { render } from "@testing-library/react";
import { mockData } from "gatsby";
import { checkImage } from "../../../testing/test-helpers";
import "@testing-library/jest-dom/extend-expect";

import GatsbyImageWithFallback from "../GatsbyImageWithFallback";

describe("GatsbyImageWithFallback component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error");
    console.error.mockImplementation(() => null);

    jest.clearAllMocks();
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  it("no image passed", async () => {
    const { container } = render(<GatsbyImageWithFallback />);

    expect(container.outerHTML).toEqual("<div></div>");
  });

  it("image attributes are correct", async () => {
    const { markdownRemark: recipe } = mockData;
    const { recipe_img, title } = recipe.frontmatter;
    const role = "img";

    render(
      <GatsbyImageWithFallback
        image={recipe_img}
        alt={title}
        className={role}
      />
    );

    await checkImage({ role, image: recipe_img, title });
  });
});
