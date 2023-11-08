import React from "react";
import { render } from "@testing-library/react";
import { mockData } from "gatsby";
import slug from "slug";
import "@testing-library/jest-dom/extend-expect";
import { textContent, href } from "../../../testing/test-helpers";

import BlogIndex from "../index";

describe("BlogIndex component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("tags and tag links are correct", async () => {
    const tags = mockData.tags.group;

    render(<BlogIndex data={mockData} location={window.location} />);

    for (const { tag, totalCount } of tags) {
      const testId = `tag-${tag}`;
      expect(await textContent({ testId })).toEqual(`${tag} (${totalCount})`);

      const expectedUrl = `${document.location}tags/${slug(tag)}`;
      expect(await href({ testId })).toEqual(expectedUrl);
    }
  });
});
