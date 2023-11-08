import "@testing-library/jest-dom/extend-expect";
import { extractRecipeData } from "../../utils/utilityFunctions";

describe("Utility functions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("extractRecipeData() returns the correct information", async () => {
    const html =
      "<h2>ingredients</h2><ul><li>1 kg steak (pan fried)</li></ul><h2>body</h2>\nmock body<h2>notes</h2>\nmock notes<h2>based on</h2>\n<ul><li>Mocked based on text</ul><h2>Dummy</h2>";
    const {
      description,
      body,
      ingredientsHtml,
      ingredientsArray,
      steps,
      notes,
      notesPlain,
      basedOnLink,
      basedOnText,
    } = extractRecipeData(html);

    expect(body).toEqual("mock body");
    expect(description).toEqual("");
    expect(ingredientsHtml).toEqual(
      `<ul class="list-unstyled sidebar-list ingredients-list"><li>1 kg steak <em>(pan fried)</em></li></ul>`
    );
    expect(ingredientsArray.length).toEqual(1);
    expect(ingredientsArray[0]).toEqual("1 kg steak (pan fried)");
    expect(steps).toEqual("");
    expect(notes).toEqual("<blockquote>mock notes</blockquote>");
    expect(notesPlain).toEqual("mock notes");
    expect(basedOnLink).toEqual("");
    expect(basedOnText).toEqual("Mocked based on text");
  });
});
