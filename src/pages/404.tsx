import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import RecipeCard from "../components/RecipeCard";
import { sortPosts } from "../utils/utilityFunctions";

const NotFoundPage = ({ data }: GraphQL.results) => {
  if (!data) {
    return;
  }

  const posts = sortPosts(data.allMarkdownRemark.edges);

  return (
    <Layout>
      <div className="container">
        <Row>
          <Col>
            <div
              className="text-center mb-5 mt-5"
              style={{ overflow: "hidden" }}
            >
              <h3 style={{ fontSize: "10rem" }} className="mb-0">
                404
              </h3>
              <h1 className="mb-5">Page Not Found</h1>
            </div>
            <p className="text-center">
              While you&apos;re here, maybe you want to check out one of these
              recipes:
            </p>

            <Row className="hp-recipes">
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

NotFoundPage.propTypes = {
  data: PropTypes.object,
};

export default NotFoundPage;

/* eslint-disable react/prop-types */
export const Head = ({ location }: IHead) => {
  return <Seo title="404: Not Found" pathname={location.pathname} />;
};
/* eslint-enable react/prop-types */

export const pageQuery = graphql`
  query NotFoundPage {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { title: ASC } }, limit: 6) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            recipe_img {
              childImageSharp {
                gatsbyImageData(width: 500, quality: 100, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
