import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Row, Col } from "react-bootstrap";
import RecipeCard from "../components/RecipeCard";
import { sortPosts } from "../utils/utilityFunctions";
import slug from "slug";

const TagPageTemplate = ({ data, pageContext }: ITagPage) => {
  const { tag } = pageContext;
  const posts = sortPosts(data.allMarkdownRemark.edges);

  return (
    <Layout className="recipe-list-page">
      <div className="container">
        <Row className="hp-recipes tag-page-title">
          <Col
            xs="12"
            className="mb-12 recipe-list-header-container"
            data-testid="tag-title"
          >
            <h1>{tag}</h1>
          </Col>
        </Row>
        <Row className="hp-recipes">
          {posts.map(({ node }) => (
            <Col
              xl="2"
              md="3"
              sm="4"
              xs="12"
              key={node.frontmatter.title}
              className="tag-page-recipe-title"
              data-testid={`tag-recipe-card-${slug(node.frontmatter.title)}`}
            >
              <RecipeCard recipe={node} />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export const tagQuery = graphql`
  query TagPageTemplate($tag: String!) {
    allMarkdownRemark(
      sort: { frontmatter: { title: ASC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            layout
            recipe_img {
              publicURL
              childImageSharp {
                gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED)
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

TagPageTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
};

export default TagPageTemplate;

/* eslint-disable react/prop-types */
export const Head = ({ location, pageContext }: IHeadWithPageContextTag) => (
  <Seo
    title={pageContext.tag}
    description={pageContext.tag}
    pathname={location.pathname}
  />
);
/* eslint-enable react/prop-types */
