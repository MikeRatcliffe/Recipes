import slug from "slug";
import { sortPosts } from "./src/utils/utilityFunctions";
import * as path from "path";
import { createFilePath } from "gatsby-source-filesystem";
import type { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;

  const appendixPost = path.resolve(`./src/templates/AppendixPage.tsx`);
  const recipePost = path.resolve(`./src/templates/RecipePage.tsx`);
  const tagPage = path.resolve(`./src/templates/TagPage.tsx`);
  const result: GraphQL.results = await graphql(`
    query CreatePages {
      allMarkdownRemark(sort: { frontmatter: { title: ASC } }, limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              layout
            }
          }
        }
      }
      tags: allMarkdownRemark(limit: 2000) {
        group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
          totalCount
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  if (!result.data) {
    return;
  }

  // Create recipe posts pages.
  const posts: GraphQL.allMarkdownRemark["edges"] = sortPosts(
    result.data.allMarkdownRemark.edges
  );

  posts.forEach((post, index: number) => {
    const previous = index === 0 ? null : posts[index - 1].node;
    const next = index === posts.length - 1 ? null : posts[index + 1].node;

    createPage({
      path: post.node.fields.slug,
      component:
        post.node.frontmatter.layout === "appendix" ? appendixPost : recipePost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });

  if (!result.data.tags) {
    return;
  }

  // Create pages for each tag
  const tags = result.data.tags.group.sort((a, b) => {
    const aLower = a.tag.toLowerCase();
    const bLower = b.tag.toLowerCase();

    if (aLower > bLower) {
      return 1;
    }
    if (aLower < bLower) {
      return -1;
    }
    return 0;
  });

  {
    tags.map(({ tag, totalCount }) => {
      //Create tags page
      createPage({
        path: `/tags/${slug(tag)}`,
        component: tagPage,
        context: {
          tag,
          totalCount,
        },
      });
    });
  }
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    actions.createTypes(`
    type Site {
      siteMetadata: SiteMetadata!
    }

    type SiteMetadata {
      title: String!
    }
    `);
  };

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
  plugins,
  stage,
  getConfig,
}) => {
  if (stage === "build-javascript") {
    // get current webpack config
    const config = getConfig();

    const options = {
      minimizerOptions: {
        preset: [
          `default`,
          {
            svgo: {
              full: true,
              plugins: [
                // potentially destructive plugins removed - see https://github.com/gatsbyjs/gatsby/issues/15629
                // use correct config format and remove plugins requiring specific params - see https://github.com/gatsbyjs/gatsby/issues/31619
                // List of default plugins and their defaults: https://github.com/svg/svgo#built-in-plugins
                // Last update 2021-08-17
                `cleanupAttrs`,
                `cleanupEnableBackground`,
                // `cleanupIDs`, // Error: Unknown builtin plugin "cleanupIDs" specified.
                `cleanupListOfValues`, // Default: disabled
                `cleanupNumericValues`,
                `collapseGroups`,
                `convertColors`,
                `convertPathData`,
                `convertStyleToAttrs`, // Default: disabled
                `convertTransform`,
                `inlineStyles`,
                `mergePaths`,
                `minifyStyles`,
                `moveElemsAttrsToGroup`,
                `moveGroupAttrsToElems`,
                `prefixIds`, // Default: disabled
                `removeComments`,
                `removeDesc`,
                `removeDoctype`,
                `removeEditorsNSData`,
                `removeEmptyAttrs`,
                `removeEmptyContainers`,
                `removeEmptyText`,
                `removeHiddenElems`,
                `removeMetadata`,
                `removeNonInheritableGroupAttrs`,
                `removeRasterImages`, // Default: disabled
                `removeScriptElement`, // Default: disabled
                `removeStyleElement`, // Default: disabled
                `removeTitle`,
                `removeUnknownsAndDefaults`,
                `removeUnusedNS`,
                `removeUselessDefs`,
                `removeUselessStrokeAndFill`,
                `removeXMLProcInst`,
                `reusePaths`, // Default: disabled
                `sortAttrs`, // Default: disabled
              ],
            },
          },
        ],
      },
    };
    // find CSS minimizer
    const minifyCssIndex = config.optimization.minimizer.findIndex(
      (minimizer: any): boolean =>
        minimizer.constructor.name === "CssMinimizerPlugin"
    );
    // if found, overwrite existing CSS minimizer with the new one
    if (minifyCssIndex > -1) {
      config.optimization.minimizer[minifyCssIndex] =
        plugins.minifyCss(options);
    }
    // replace webpack config with the modified object
    actions.replaceWebpackConfig(config);
  }

  actions.setWebpackConfig({
    devtool: "cheap-module-source-map",
  });
};
