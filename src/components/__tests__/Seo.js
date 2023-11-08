import React from "react";
import { render } from "@testing-library/react";
import { mockData, mockMegaMap } from "gatsby";
import "@testing-library/jest-dom/extend-expect";
import { extractRecipeData } from "../../utils/utilityFunctions";

import Seo from "../Seo";

describe("Seo component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Seo links are correct", async () => {
    const post = mockData.markdownRemark;
    const recipeData = extractRecipeData(post.html);
    const renderer = document.createElement("template");

    renderer.innerHTML = recipeData.steps;

    const { content } = renderer;
    const steps = [...content.querySelectorAll("li")]
      .map((node) => {
        return node.textContent ? node.textContent.trim() : "";
      })
      .join("\n")
      .split("\n");

    render(
      <Seo
        title={post.frontmatter.title}
        description={recipeData.description || post.excerpt}
        ingredients={recipeData.ingredientsArray}
        isRecipe={true}
        image={
          (post.frontmatter.recipe_img || mockData.imageNotFound).publicURL
        }
        steps={steps}
        notes={recipeData.notesPlain}
        pathname={location.pathname}
        basedOn={recipeData.basedOnLink || recipeData.basedOnText}
      />,
      { container: document.head }
    );

    const { head } = document;
    const title = head.querySelector("title");
    expect(title.textContent).toEqual(post.frontmatter.title);

    for (const [selector, value] of mockMegaMap.entries()) {
      const metaTag = head.querySelector(selector);
      expect(metaTag.getAttribute("content")).toEqual(value);
    }
  });

  it("Seo schemaOrgJSONLD data is correct when missing optional parameters", async () => {
    const post = mockData.markdownRemark;
    const recipeData = extractRecipeData(post.html);
    const renderer = document.createElement("template");

    renderer.innerHTML = recipeData.steps;

    render(
      <Seo
        title={post.frontmatter.title}
        ingredients={recipeData.ingredientsArray}
        isRecipe={true}
        image={
          (post.frontmatter.recipe_img || mockData.imageNotFound).publicURL
        }
        notes={recipeData.notesPlain}
        pathname={location.pathname}
        basedOn={recipeData.basedOnLink || recipeData.basedOnText}
      />,
      { container: document.head }
    );

    const { head } = document;
    const script = head.querySelector("script");
    const [block1, block2] = JSON.parse(script.innerHTML);
    const { mock1, mock2 } = schemaOrgJSONLDMock;

    for (const key of Object.keys(mock1)) {
      expect(mock1[key]).toEqual(block1[key]);
    }

    for (const key of Object.keys(mock2)) {
      switch (key) {
        case "recipeInstructions":
          expect(block2.recipeInstructions.length).toEqual(0);
          break;
        case "recipeIngredient":
          for (let i = 0; i < mock2.recipeIngredient.length; i++) {
            const mock2ingredient = mock2.recipeIngredient[i];
            const block2ingredient = block2.recipeIngredient[i];

            expect(block2ingredient).toEqual(mock2ingredient);
          }
          break;
        default: {
          let expected = mock2[key];

          // we expect no description if none was passed
          if (key === "description") {
            expected = "";
          }
          expect(block2[key]).toEqual(expected);
        }
      }
    }
  });

  it("Seo schemaOrgJSONLD data is correct", async () => {
    const post = mockData.markdownRemark;
    const recipeData = extractRecipeData(post.html);
    const renderer = document.createElement("template");

    renderer.innerHTML = recipeData.steps;

    const { content } = renderer;
    const steps = [...content.querySelectorAll("li")]
      .map((node) => {
        return node.textContent ? node.textContent.trim() : "";
      })
      .join("\n")
      .split("\n");

    render(
      <Seo
        title={post.frontmatter.title}
        description={recipeData.description || post.excerpt}
        ingredients={recipeData.ingredientsArray}
        isRecipe={true}
        image={
          (post.frontmatter.recipe_img || mockData.imageNotFound).publicURL
        }
        steps={steps}
        notes={recipeData.notesPlain}
        pathname={location.pathname}
        basedOn={recipeData.basedOnLink || recipeData.basedOnText}
      />,
      { container: document.head }
    );

    const { head } = document;
    const script = head.querySelector("script");
    const [block1, block2] = JSON.parse(script.innerHTML);
    const { mock1, mock2 } = schemaOrgJSONLDMock;

    for (const key of Object.keys(mock1)) {
      expect(mock1[key]).toEqual(block1[key]);
    }

    for (const key of Object.keys(mock2)) {
      switch (key) {
        case "recipeInstructions":
          for (let i = 0; i < mock2.recipeInstructions.length; i++) {
            const mock2Instruction = mock2.recipeInstructions[i];
            const block2Instruction = block2.recipeInstructions[i];

            expect(block2Instruction["@type"]).toEqual(
              mock2Instruction["@type"]
            );
            expect(block2Instruction["text"]).toEqual(mock2Instruction["text"]);
          }
          break;
        case "recipeIngredient":
          for (let i = 0; i < mock2.recipeIngredient.length; i++) {
            const mock2ingredient = mock2.recipeIngredient[i];
            const block2ingredient = block2.recipeIngredient[i];

            expect(block2ingredient).toEqual(mock2ingredient);
          }
          break;
        default:
          expect(mock2[key]).toEqual(block2[key]);
      }
    }
  });
});

const schemaOrgJSONLDMock = {
  mock1: {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "name": "recipe-title",
    "alternateName": "Ratcliffe Family Recipes",
  },
  mock2: {
    "@context": "http://schema.org",
    "@type": "Recipe",
    "author": {
      "@type": "Organization",
      "name": "Ratcliffe Family Recipes",
    },
    "name": "recipe-title",
    "description":
      "This a great way to make a fluffy low-carb bread in just a few minutes!",
    "recipeCategory": "Dinner",
    "image": "http://localhost:8000/recipe-public-url",
    "recipeInstructions": [
      {
        "@type": "HowToStep",
        "text":
          "Add all bread ingredients to a 4x4” (10x10cm) microwave safe bowl.",
      },
      {
        "@type": "HowToStep",
        "text": "Mix until well combined.",
      },
      {
        "@type": "HowToStep",
        "text": "Add egg and oil then mix well.",
      },
    ],
    "recipeIngredient": [
      "3 tbsp almond flour",
      "1 tsp psyllium powder",
      "1/2 tsp baking powder",
      "Tiny pinch of salt",
      "1 large egg",
      "1 tbsp olive oil",
    ],
    "notes": "recipe-notes",
    "basedOn": "https://ketodietapp.com/Blog/lchf/90-second-keto-bread",
  },
};
