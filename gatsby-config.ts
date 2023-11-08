import type { GatsbyConfig } from "gatsby";

export const siteMetadata: GatsbyConfig["siteMetadata"] = {
  title: `Ratcliffe Family Recipes`,
  author: `Mike Ratcliffe`,
  description: `Recipes just the way we like 'em!`,
  siteUrl: `http://localhost:8000/`,
  twitterUsername: `@ratcliffe_mike`,
};

export const plugins: GatsbyConfig["plugins"] = [
  "gatsby-plugin-typescript",
  "gatsby-plugin-pnpm-gatsby-5",
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /\.inline\.svg$/,
      },
    },
  },
  "gatsby-plugin-sass",
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      icon: "content/assets/favicon.svg",
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/blog`,
      name: `blog`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content/assets`,
      name: `assets`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 590,
          },
        },
        {
          resolve: `gatsby-remark-footnotes`,
          options: {
            footnoteBackRefPreviousElementDisplay: "inline",
            footnoteBackRefDisplay: "none",
            footnoteBackRefInnerText: "↩",
            footnoteBackRefAnchorStyle: `text-decoration: none;`,
            useFootnoteMarkerText: true,
            useCustomDivider: "",
          },
        },
        `gatsby-remark-copy-linked-files`,
        `gatsby-remark-smartypants`,
      ],
    },
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  {
    resolve: "gatsby-plugin-flexsearch",
    options: {
      languages: ["en"],
      type: "MarkdownRemark",
      fields: [
        {
          name: "title",
          indexed: true,
          resolver: "frontmatter.title",
          attributes: {
            tokenize: "strict",
            encode: "simple",
            threshold: 6,
            depth: 3,
          },
          store: true,
        },
        {
          name: "url",
          indexed: false,
          resolver: "fields.slug",
          store: true,
        },
        {
          name: "html",
          indexed: true,
          resolver: "internal.content",
          attributes: {
            tokenize: "strict",
            encode: "simple",
            threshold: 0,
            resolution: 3,
            depth: 3,
          },
          store: true,
        },
      ],
    },
  },
  `gatsby-plugin-sitemap`,
];

export default {
  siteMetadata,
  plugins,
};
