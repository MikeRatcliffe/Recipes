import React from "react";
import { render } from "@testing-library/react";
import { mockData } from "gatsby";
import "@testing-library/jest-dom/extend-expect";
import { checkImage, href, textContent } from "../../../testing/test-helpers";
import slug from "slug";

import RecipeCard from "../RecipeCard";

describe("RecipeCard component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("recipe cards have the correct links", async () => {
    const recipe = mockData.allMarkdownRemark.edges[0].node;

    render(<RecipeCard recipe={recipe} />);

    const testId = `recipe-card-link-${slug(recipe.frontmatter.title)}`;
    expect(await href({ testId })).toEqual(recipe.fields.slug);
  });

  it("recipe cards have the correct titles", async () => {
    const recipe = mockData.allMarkdownRemark.edges[0].node;

    render(<RecipeCard recipe={recipe} />);

    const testId = `recipe-card-title-${slug(recipe.frontmatter.title)}`;
    expect(await textContent({ testId })).toEqual(recipe.frontmatter.title);
  });

  it("recipe cards images have the correct attributes", async () => {
    const recipe = mockData.allMarkdownRemark.edges[0].node;

    render(<RecipeCard recipe={recipe} />);

    const { title, recipe_img } = recipe.frontmatter;
    const testId = `recipe-card-image-${slug(title)}`;
    await checkImage({ testId, image: recipe_img, title });
  });
});
