/*
  allMarkdownRemark {
    totalCount
    edges {
      node {
        excerpt
        frontmatter {
          layout
          tags
          title
          recipe_img {
            publicURL
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        html
        id
        fields {
          slug
        }
      }
    }
  }
  site {
    siteMetadata {
      title
      author
      description
      siteUrl
      twitterUsername
    }
  }
  tags: allMarkdownRemark(limit: 1) {
    group(field: { frontmatter: { tags: SELECT } }) {
      tag: fieldValue
      totalCount
    }
  }
*/

namespace GraphQL {
  interface results {
    data?: data;
    errors?: Array<errors>;
  }

  interface data {
    allMarkdownRemark: allMarkdownRemark;
    site: site;
    tags: tags;
    image: recipe_img;
  }

  interface allMarkdownRemark {
    totalCount: number;
    edges: Array<edge>;
  }

  interface site {
    siteMetadata: siteMetadata;
  }

  interface tags {
    group: Array<group>;
  }

  interface edge {
    node: node;
  }

  interface errors {
    message: string;
    locations: Array<errorLocation>;
  }

  interface errorLocation {
    "line": number;
    "column": number;
  }

  interface siteMetadata {
    title: string;
    author: string;
    description: string;
    siteUrl: string;
    twitterUsername: string;
  }

  interface group {
    tag: string;
    totalCount: number;
  }

  interface node {
    excerpt: string;
    frontmatter: frontmatter;
    html: string;
    id: string;
    fields: fields;
  }

  interface frontmatter {
    layout: null;
    tags: Array<string>;
    title: string;
    recipe_img: recipe_img;
  }

  interface fields {
    slug: string;
  }

  interface recipe_img {
    publicURL: string;
    childImageSharp: childImageSharp;
  }

  interface childImageSharp {
    gatsbyImageData: IGatsbyImageData;
  }

  interface imageNotFound {
    imageNotFound: IGatsbyImage;
  }

  interface markdownRemark {
    markdownRemark: node;
  }
}
