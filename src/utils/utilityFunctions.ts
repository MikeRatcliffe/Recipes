import { parse } from "node-html-parser";

export const sortPosts = function (
  posts: GraphQL.allMarkdownRemark["edges"]
): GraphQL.allMarkdownRemark["edges"] {
  if (posts) {
    // Alphabetic order
    posts.sort((a, b) => {
      if (
        a.node.frontmatter != null &&
        b.node.frontmatter != null &&
        a.node.frontmatter.title != null &&
        b.node.frontmatter.title != null
      ) {
        if (
          a.node.frontmatter.title.toLowerCase() >
          b.node.frontmatter.title.toLowerCase()
        ) {
          return 1;
        }
        if (
          a.node.frontmatter.title.toLowerCase() <
          b.node.frontmatter.title.toLowerCase()
        ) {
          return -1;
        }
      }
      return 0;
    });

    // Move appendices to the end
    posts.sort((a, b) => {
      if (
        a.node.frontmatter != null &&
        b.node.frontmatter != null &&
        a.node.frontmatter.title != null &&
        b.node.frontmatter.title != null
      ) {
        if (
          a.node.frontmatter.layout === "appendix" &&
          !b.node.frontmatter.layout
        ) {
          return 1;
        }
        if (
          !a.node.frontmatter.layout &&
          b.node.frontmatter.layout === "appendix"
        ) {
          return -1;
        }
      }
      return 0;
    });
  }

  return posts;
};

export const extractRecipeData = function (htmlString: string): IRecipeData {
  const data: IRecipeData = {
    body: "",
    description: "",
    ingredientsHtml: "",
    ingredientsArray: [],
    steps: "",
    notes: "",
    notesPlain: "",
    basedOnLink: "",
    basedOnText: "",
  };

  for (let html of htmlString.split("<h2>")) {
    if (!html.startsWith("<")) {
      html = `<h2>${html}`;
    }

    const tempNode = parse(html);

    const currentNode = tempNode.querySelector("h1,h2");
    if (currentNode && currentNode.textContent) {
      switch (currentNode.textContent.toLowerCase()) {
        case "body":
          currentNode.remove();
          data.body = tempNode.innerHTML.trim();
          break;
        case "description":
          currentNode.remove();
          data.description = tempNode.textContent
            ? tempNode.textContent.trim()
            : "";
          break;
        case "ingredients":
          {
            currentNode.remove();
            [...tempNode.querySelectorAll("li")].map((li) => {
              let ingredient = li.textContent || "";
              const noteIndex = ingredient.indexOf("(");
              let note = null;

              if (noteIndex >= 0) {
                note = ingredient.substring(noteIndex);
                ingredient = ingredient.substring(0, noteIndex - 1);
                li.innerHTML = `${ingredient} <em>${note}</em>`;
              } else {
                li.textContent = ingredient;
              }
            });

            // Add ul styles
            [...tempNode.querySelectorAll("ul")].map((ul) => {
              ul.setAttribute(
                "class",
                "list-unstyled sidebar-list ingredients-list"
              );
            });
            data.ingredientsHtml = tempNode.innerHTML.trim();
            data.ingredientsArray = [...tempNode.querySelectorAll("li")].map(
              (node) => (node.textContent || "").trim()
            );
          }
          break;
        case "steps":
          currentNode.remove();
          data.steps = tempNode.innerHTML.trim();
          break;
        case "notes":
          currentNode.remove();
          data.notes = `<blockquote>${tempNode.innerHTML.trim()}</blockquote>`;
          data.notesPlain = tempNode.textContent
            ? tempNode.textContent.trim()
            : "";
          break;
        case "based on": {
          currentNode.remove();
          const link = tempNode.querySelector("a");
          if (link) {
            data.basedOnLink = link.getAttribute("href") || "";
          } else {
            data.basedOnText = (tempNode.textContent || "").trim();
          }
          break;
        }
        default:
          // Do nothing
          break;
      }
    }
  }

  return data;
};
