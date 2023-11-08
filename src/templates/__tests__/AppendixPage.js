import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { navigate, mockData, mockMegaMapAppendix } from "gatsby";
import "@testing-library/jest-dom/extend-expect";
import { extractRecipeData } from "../../utils/utilityFunctions";
import { checkImage, textContent, href } from "../../../testing/test-helpers";
import slug from "slug";

import AppendixPageTemplate, { Head } from "../AppendixPage";

describe("AppendixPage component", () => {
  const { pageContext } = mockData;
  const { markdownRemark: post } = mockData;
  const { previous, next } = pageContext;
  const recipeData = extractRecipeData(post.html);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("the correct recipe data is displayed", async () => {
    const { findByTestId, findAllByTestId } = render(
      <AppendixPageTemplate data={mockData} pageContext={pageContext} />
    );

    const container = await findByTestId("appendix-container");

    fireEvent.keyDown(container, {
      key: "ArrowLeft",
      code: 37,
    });
    expect(navigate.mock.calls).toHaveLength(1);
    expect(navigate.mock.calls[0]).toEqual(["prev-slug"]);

    fireEvent.keyDown(container, {
      key: "ArrowRight",
      code: 39,
    });
    expect(navigate.mock.calls).toHaveLength(2);
    expect(navigate.mock.calls[1]).toEqual(["next-slug"]);

    expect(await textContent({ testId: "appendix-title" })).toEqual(
      post.frontmatter.title
    );
    expect(await textContent({ testId: "appendix-description" })).toEqual(
      recipeData.description
    );
    expect(await textContent({ testId: "appendix-body" })).toEqual(
      recipeData.body
    );

    const tagElements = await findAllByTestId("appendix-tag");
    const tags = post.frontmatter.tags;
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];

      const tagElement = tagElements[i];
      expect(tagElement).toHaveTextContent(tag);

      const expectedUrl = `${document.location}tags/${slug(tag)}`;
      expect(tagElement.href).toEqual(expectedUrl);
    }

    const { title, recipe_img } = post.frontmatter;
    const testId = "appendix-image";
    await checkImage({ testId, image: recipe_img, title });

    expect(await textContent({ testId: "appendix-based-on-link" })).toEqual(
      recipeData.basedOnLink
    );
    expect(await href({ testId: "appendix-based-on-link" })).toEqual(
      recipeData.basedOnLink
    );

    let expectedUrl = `${document.location}${previous.fields.slug}`;
    expect(await href({ testId: "appendix-prev" })).toEqual(expectedUrl);
    expect(await textContent({ testId: "appendix-prev" })).toEqual(
      `← ${previous.frontmatter.title}`
    );

    expectedUrl = `${document.location}${next.fields.slug}`;
    expect(await href({ testId: "appendix-next" })).toEqual(expectedUrl);
    expect(await textContent({ testId: "appendix-next" })).toEqual(
      `${next.frontmatter.title} →`
    );
  });

  it("Check that the Head component renders correctly", async () => {
    const location = {
      pathName: "Mock path",
    };

    const { container: head } = render(
      <Head location={location} data={mockData} />
    );

    for (const [selector, value] of mockMegaMapAppendix.entries()) {
      const metaTag = head.querySelector(selector);
      expect(metaTag.getAttribute("content")).toEqual(value);
    }
  });
});
