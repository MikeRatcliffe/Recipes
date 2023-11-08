import React from "react";
import { render } from "@testing-library/react";
import { mockData, mockMegaMapTag } from "gatsby";
import "@testing-library/jest-dom/extend-expect";
import slug from "slug";
import { sortPosts } from "../../utils/utilityFunctions";
import { textContent } from "../../../testing/test-helpers";

import TagPageTemplate, { Head } from "../TagPage";

describe("TagPage component", () => {
  const pageContextTagPage = {
    tag: "mock tag",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("the correct recipe data is displayed", async () => {
    const { findByTestId } = render(
      <TagPageTemplate data={mockData} pageContext={pageContextTagPage} />
    );

    expect(await textContent({ testId: "tag-title" })).toEqual(
      pageContextTagPage.tag
    );

    const posts = sortPosts(mockData.allMarkdownRemark.edges);

    for (const post of posts) {
      const { node } = post;
      const recipeCard = await findByTestId(
        `tag-recipe-card-${slug(node.frontmatter.title)}`
      );
      const header = recipeCard.querySelector("h3");

      expect(header.textContent).toEqual(node.frontmatter.title);
    }
  });

  it("Check that the Head component renders correctly", async () => {
    const location = {
      pathName: "Mock path",
    };

    const { container: head } = render(
      <Head location={location} pageContext={pageContextTagPage} />
    );

    for (const [selector, value] of mockMegaMapTag.entries()) {
      const metaTag = head.querySelector(selector);
      expect(metaTag.getAttribute("content")).toEqual(value);
    }
  });
});
