import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import GatsbyImageWithFallback from "../components/GatsbyImageWithFallback";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Row, Col } from "react-bootstrap";
import RecipeCard from "../components/RecipeCard";

const AboutPage = ({ data }: GraphQL.results) => {
  if (!data) {
    return;
  }

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);

  // Remove appendices from suggested recipes
  let posts = data.allMarkdownRemark.edges.filter((edge) => {
    return edge.node.frontmatter.layout !== "appendix";
  });

  // Randomize recipes
  posts.sort(() => 0.5 - Math.random());

  // Get first 6 random posts
  posts = posts.slice(0, 6);

  return (
    <Layout>
      <div className="container">
        <Row className="recipe-detail-row mb-5 mt-5">
          <Col md="6">
            <h1>We just wanted a recipe that worked for us.</h1>
            <p>
              We also had a hard time remembering our own recipes. So, we just
              created our own personal recipe website?
            </p>
          </Col>
          <Col sm="12" md="6" className="hp-recipes order-first order-md-last">
            <Row>
              <Col>
                <GatsbyImageWithFallback
                  image={data.image}
                  className="recipe-img mb-4"
                  alt="Herbs and measuring cup"
                  data-testid="about-image"
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="mt-5 pt-5">
            <p className="text-center">
              While you&apos;re here, maybe you want to check out one of these
              recipes:
            </p>

            <Row className="hp-recipes">
              {hydrated
                ? posts.map(({ node }) => {
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
                  })
                : ""}
            </Row>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object,
};

export default AboutPage;

/* eslint-disable react/prop-types */
export const Head = ({ location }: IHead) => {
  return <Seo title="About Us" pathname={location.pathname} />;
};
/* eslint-enable react/prop-types */

export const pageQuery = graphql`
  query AboutPage {
    site {
      siteMetadata {
        title
      }
    }
    image: file(absolutePath: { regex: "/about-page.jpg/" }) {
      childImageSharp {
        gatsbyImageData(quality: 100, layout: FULL_WIDTH)
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
  }
`;
