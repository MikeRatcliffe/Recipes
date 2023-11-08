import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Row, Col } from "react-bootstrap";
import RecipeCard from "../components/RecipeCard";
import { sortPosts } from "../utils/utilityFunctions";
import slug from "slug";

const AllRecipes = ({ data }: GraphQL.results) => {
  if (!data) {
    return;
  }

  const posts = sortPosts(data.allMarkdownRemark.edges);
  const tags = data.tags.group.sort();

  return (
    <Layout className="recipe-list-page">
      <div className="container">
        <Row>
          <Col lg="3">
            <h3>Recipes</h3>
            <ul className="recipe-tags list-unstyled row">
              {tags.map(({ tag, totalCount }) => {
                return (
                  <li key={tag} className="mb-0 pb-2 pt-2 col-4 col-lg-12">
                    <Link to={`/tags/${slug(tag)}`} className="portfolio-item">
                      {tag}{" "}
                      <span className="d-none d-sm-inline-block">
                        ({totalCount})
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Col>
          <Col md="12" lg="9" className="hp-recipes">
            <Row>
              {posts.map(({ node }) => {
                return (
                  <Col
                    xl="2"
                    md="3"
                    sm="4"
                    xs="12"
                    key={node.frontmatter.title}
                  >
                    <RecipeCard recipe={node} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

AllRecipes.propTypes = {
  data: PropTypes.object,
};

export default AllRecipes;

/* eslint-disable react/prop-types */
export const Head = ({ location }: IHead) => {
  return (
    <Seo
      title="View all Ratcliffe Family Recipes"
      pathname={location.pathname}
    />
  );
};
/* eslint-enable react/prop-types */

export const pageQuery = graphql`
  query AllRecipes {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { title: ASC } }) {
      edges {
        node {
          fields {
            slug
          }
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
`;
