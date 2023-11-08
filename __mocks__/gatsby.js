/* eslint-disable @typescript-eslint/no-var-requires,@typescript-eslint/no-unused-vars*/
const React = require("react");
const gatsby = jest.requireActual("gatsby");

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  navigate: jest.fn(),
  Link: jest.fn().mockImplementation(
    // these props are invalid for an `a` tag
    ({
      activeClassName,
      activeStyle,
      getProps,
      innerRef,
      partiallyActive,
      ref,
      replace,
      to,
      ...rest
    }) =>
      React.createElement("a", {
        ...rest,
        href: to,
      })
  ),
  Slice: jest.fn().mockImplementation(({ alias, ...rest }) =>
    React.createElement("div", {
      ...rest,
      "data-test-slice-alias": alias,
    })
  ),
  useStaticQuery: jest.fn().mockImplementation(() => {
    return {
      site: {
        siteMetadata: {
          title: `Ratcliffe Family Recipes`,
          author: `Mike Ratcliffe`,
          description: `Recipes just the way we like 'em!`,
          siteUrl: `http://localhost:8000/`,
          twitterUsername: `@ratcliffe_mike`,
        },
      },
      imageNotFound: {
        childImageSharp: {
          gatsbyImageData: {},
        },
      },
    };
  }),
  mockData: {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "excerpt": "excerpt 0",
            "fields": {
              "slug": "http://localhost:8000/slug%200/",
            },
            "frontmatter": {
              "title": "title 0",
              "layout": null,
              "recipe_img": {
                "publicURL": "publicURL 0",
                "childImageSharp": {
                  "gatsbyImageData": {
                    "layout": "layout 0",
                    "backgroundColor": "backgroundColor 0",
                    "images": {
                      "fallback": {
                        "src": "fallback src 0",
                        "srcSet": "fallback srcSet 0",
                        "sizes": "fallback sizes 0",
                      },
                      "sources": [
                        {
                          "srcSet": "sources srcSet 0",
                          "type": "sources type 0",
                          "sizes": "sources sizes 0",
                        },
                      ],
                    },
                    "width": 0,
                    "height": 0,
                  },
                },
              },
            },
          },
        },
        {
          "node": {
            "excerpt": "excerpt 1",
            "fields": {
              "slug": "http://localhost:8000/slug%201/",
            },
            "frontmatter": {
              "title": "title 1",
              "layout": null,
              "recipe_img": {
                "publicURL": "publicURL 1",
                "childImageSharp": {
                  "gatsbyImageData": {
                    "layout": "layout 1",
                    "backgroundColor": "backgroundColor 1",
                    "images": {
                      "fallback": {
                        "src": "fallback src 1",
                        "srcSet": "fallback srcSet 1",
                        "sizes": "fallback sizes 1",
                      },
                      "sources": [
                        {
                          "srcSet": "sources srcSet 1",
                          "type": "sources type 1",
                          "sizes": "sources sizes 1",
                        },
                      ],
                    },
                    "width": 1,
                    "height": 1,
                  },
                },
              },
            },
          },
        },
      ],
    },
    "tags": {
      "group": [
        {
          "tag": "tag 0",
          "totalCount": 0,
        },
        {
          "tag": "tag 1",
          "totalCount": 1,
        },
        {
          "tag": "tag 2",
          "totalCount": 2,
        },
      ],
    },
    site: {
      siteMetadata: {
        title: `Ratcliffe Family Recipes`,
        author: `Mike Ratcliffe`,
        description: `Recipes just the way we like 'em!`,
        siteUrl: `http://localhost:8000/`,
        twitterUsername: `@ratcliffe_mike`,
      },
    },
    "markdownRemark": {
      "id": "recipe-id",
      "excerpt": "recipe-description",
      "html":
        '<h2>description</h2>\n<p>This a great way to make a fluffy low-carb bread in just a few minutes!</p>\n<h2>ingredients</h2>\n<ul>\n<li>3 tbsp almond flour</li>\n<li>1 tsp psyllium powder</li>\n<li>1/2 tsp baking powder</li>\n<li>Tiny pinch of salt</li>\n<li>1 large egg</li>\n<li>1 tbsp olive oil</li>\n</ul>\n<h2>steps</h2>\n<ol>\n<li>Add all bread ingredients to a 4x4” (10x10cm) microwave safe bowl.</li>\n<li>Mix until well combined.</li>\n<li>Add egg and oil then mix well.</li>\n<li>Tap on the counter a few times to remove air bubbles.</li>\n<li>Microwave for 90 seconds.</li>\n<li>When cool, cut in half widthwise.</li>\n<li>Place in a toaster.</li>\n<li>Serve just like bread with any toppings.</li>\n</ol>\n<h2>notes</h2>\n<p>recipe-notes</p>\n<h2>based on</h2>\n<ul>\n<li><a href="https://ketodietapp.com/Blog/lchf/90-second-keto-bread">https://ketodietapp.com/Blog/lchf/90-second-keto-bread</a></li>\n</ul><h2>body</h2>mock body',
      "frontmatter": {
        "title": "recipe-title",
        "tags": ["tag-0", "tag-1", "tag-2", "tag-3", "tag-4", "tag-5", "tag-6"],
        "recipe_img": {
          "publicURL": "recipe-public-url",
          "childImageSharp": {
            "gatsbyImageData": {
              "layout": "recipe-layout",
              "backgroundColor": "recipe-backgroundColor",
              "images": {
                "fallback": {
                  "src": "recipe-img-fallback-src",
                  "srcSet": "recipe-img-fallback-srcSet",
                  "sizes": "recipe-img-fallback-sizes",
                },
                "sources": [
                  {
                    "srcSet": "recipe-img-sources-srcSet",
                    "type": "recipe-img-sources-type",
                    "sizes": "recipe-img-sources-sizes",
                  },
                ],
              },
              "width": 123,
              "height": 456,
            },
          },
        },
      },
    },
    "imageNotFound": {
      "publicURL": "image-not-found.jpg",
      "childImageSharp": {
        "gatsbyImageData": {
          "layout": "img-not-found-layout",
          "backgroundColor": "img-not-found-backgroundColor",
          "images": {
            "fallback": {
              "src": "img-not-found-fallback-src",
              "srcSet": "img-not-found-fallback-srcSet",
              "sizes": "img-not-found-fallback-sizes",
            },
            "sources": [
              {
                "srcSet": "img-not-found-sources-srcSet",
                "type": "img-not-found-sources-type",
                "sizes": "img-not-found-sources-sizes",
              },
            ],
          },
          "width": 789,
          "height": 567,
        },
      },
    },
    "pageContext": {
      "slug": "page-slug",
      "previous": {
        "fields": {
          "slug": "prev-slug",
        },
        "frontmatter": {
          "title": "prev-title",
          "layout": null,
        },
      },
      "next": {
        "fields": {
          "slug": "next-slug",
        },
        "frontmatter": {
          "title": "next-title",
          "layout": "appendix",
        },
      },
      "tag": {
        "tag": "Bacon",
        "totalCount": 4,
      },
    },
  },
  mockMegaMap: new Map([
    [`meta[name="og:title"]`, `recipe-title`],
    [`meta[name="og:image"]`, `http://localhost:8000/recipe-public-url`],
    [
      `meta[name="og:description"]`,
      `This a great way to make a fluffy low-carb bread in just a few minutes!`,
    ],
    [`meta[name="og:type"]`, `website`],
    [
      `meta[name="description"]`,
      `This a great way to make a fluffy low-carb bread in just a few minutes!`,
    ],
    [`meta[name="image"]`, `http://localhost:8000/recipe-public-url`],
    [`meta[name="twitter:card"]`, `summary`],
    [`meta[name="twitter:title"]`, `recipe-title`],
    [`meta[name="twitter:url"]`, `http://localhost:8000/`],
    [
      `meta[name="twitter:description"]`,
      `This a great way to make a fluffy low-carb bread in just a few minutes!`,
    ],
    [`meta[name="twitter:image"]`, `http://localhost:8000/recipe-public-url`],
    [`meta[name="twitter:creator"]`, `@ratcliffe_mike`],
  ]),
  mockMegaMapAppendix: new Map([
    [`meta[name="og:title"]`, `recipe-title`],
    [`meta[name="og:image"]`, `http://localhost:8000/recipe-public-url`],
    [`meta[name="og:description"]`, `recipe-description`],
    [`meta[name="og:type"]`, `website`],
    [`meta[name="description"]`, `recipe-description`],
    [`meta[name="image"]`, `http://localhost:8000/recipe-public-url`],
    [`meta[name="twitter:card"]`, `summary`],
    [`meta[name="twitter:title"]`, `recipe-title`],
    [`meta[name="twitter:url"]`, `http://localhost:8000/`],
    [`meta[name="twitter:description"]`, `recipe-description`],
    [`meta[name="twitter:image"]`, `http://localhost:8000/recipe-public-url`],
    [`meta[name="twitter:creator"]`, `@ratcliffe_mike`],
  ]),
  mockMegaMapTag: new Map([
    [`meta[name="og:title"]`, `mock tag`],
    [`meta[name="og:image"]`, `http://localhost:8000/og-image-16x9.jpg`],
    [`meta[name="og:description"]`, `mock tag`],
    [`meta[name="og:type"]`, `website`],
    [`meta[name="description"]`, `mock tag`],
    [`meta[name="image"]`, `http://localhost:8000/og-image-16x9.jpg`],
    [`meta[name="twitter:card"]`, `summary`],
    [`meta[name="twitter:title"]`, `mock tag`],
    [`meta[name="twitter:url"]`, `http://localhost:8000/`],
    [`meta[name="twitter:description"]`, `mock tag`],
    [`meta[name="twitter:image"]`, `http://localhost:8000/og-image-16x9.jpg`],
    [`meta[name="twitter:creator"]`, `@ratcliffe_mike`],
  ]),
};
