import React, { KeyboardEvent } from "react";
import PropTypes from "prop-types";
import { Link, graphql, navigate } from "gatsby";
import GatsbyImageWithFallback from "../components/GatsbyImageWithFallback";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { extractRecipeData } from "../utils/utilityFunctions";
import { Row, Col, Badge } from "react-bootstrap";
import { parse } from "node-html-parser";
import slug from "slug";

const AppendixPageTemplate = ({ data, pageContext }: IAppendixRecipePage) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;
  const recipeData = extractRecipeData(post.html);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        if (previous) {
          navigate(previous.fields.slug);
        }
        break;
      case "ArrowRight":
        if (next) {
          navigate(next.fields.slug);
        }
        break;
    }
  };

  if (post.frontmatter.tags) {
    post.frontmatter.tags.sort();
  }

  return (
    <Layout className="recipe-page">
      <div
        className="container"
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        data-testid="appendix-container"
      >
        <Row className="recipe-detail-row">
          <Col lg="10" md="12">
            <div className="recipe-details p-2">
              <h1
                className="d-block d-md-none d-lg-block recipe-title"
                data-testid="appendix-title"
              >
                {post.frontmatter.title}
              </h1>
              <p
                className="d-block d-md-none d-lg-block recipe-description"
                data-testid="appendix-description"
              >
                {recipeData.description}
              </p>

              {post.frontmatter.tags ? (
                <div id="recipe-actions" className="text-center">
                  <ul className="list-unstyled list-inline recipe-tag-list">
                    <li className="list-inline-item tags-title">
                      <small>Tags:</small>
                    </li>
                    {post.frontmatter.tags.map((tag) => (
                      <li key={tag} className="list-inline-item tag">
                        <Link
                          to={`/tags/${slug(tag)}`}
                          data-testid="appendix-tag"
                        >
                          <Badge className="badge-color">{tag}</Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </Col>
          <Col md="2" sm="12" className="mb-4 recipe-img">
            <GatsbyImageWithFallback
              image={post.frontmatter.recipe_img}
              alt={post.frontmatter.title}
              data-testid="appendix-image"
            />
          </Col>

          <Col sm="12">
            <article>
              <Row className="pt-5 recipe-body">
                <Col className="appendix-column">
                  <section
                    className="appendix"
                    data-testid="appendix-body"
                    dangerouslySetInnerHTML={{ __html: recipeData.body }}
                  />
                </Col>
              </Row>
              {recipeData.basedOnLink ? (
                <Row className="recipe-based-on">
                  <Col>
                    <strong>Based on: </strong>
                    <a
                      href={recipeData.basedOnLink}
                      target="_blank"
                      rel="noreferrer"
                      data-testid="appendix-based-on-link"
                    >
                      {recipeData.basedOnLink}
                    </a>
                  </Col>
                </Row>
              ) : (
                ""
              )}
              {recipeData.basedOnText ? (
                <Row className="recipe-based-on">
                  <Col data-testid="appendix-based-on-text">
                    <strong>Based on:</strong> {recipeData.basedOnText}
                  </Col>
                </Row>
              ) : (
                ""
              )}

              <hr />

              <nav>
                <ul className="recipe-footer-nav list-inline">
                  <li className="list-inline-item prev">
                    {previous && (
                      <Link
                        to={previous.fields.slug}
                        rel="prev"
                        data-testid="appendix-prev"
                      >
                        ← {previous.frontmatter.title}
                      </Link>
                    )}
                  </li>
                  <li className="list-inline-item next">
                    {next && (
                      <Link
                        to={next.fields.slug}
                        rel="next"
                        data-testid="appendix-next"
                      >
                        {next.frontmatter.title} →
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>
            </article>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

AppendixPageTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
};

export default AppendixPageTemplate;

/* eslint-disable react/prop-types */
export const Head = ({
  location,
  data,
}: IHeadWithDataMarkdownRemarkImageNotFound) => {
  const post = data.markdownRemark;
  const recipeData = extractRecipeData(post.html);
  const content = parse(recipeData.steps);

  const steps = [...content.querySelectorAll("li")]
    .map((node) => {
      return node.textContent ? node.textContent.trim() : "";
    })
    .join("\n")
    .split("\n");

  return (
    <Seo
      title={post.frontmatter.title}
      description={post.excerpt}
      ingredients={recipeData.ingredientsArray}
      isRecipe={true}
      image={(post.frontmatter.recipe_img || data.imageNotFound).publicURL}
      steps={steps}
      notes={recipeData.notesPlain}
      pathname={location.pathname}
      basedOn={recipeData.basedOnLink || recipeData.basedOnText}
    />
  );
};
/* eslint-enable react/prop-types */

export const pageQuery = graphql`
  query AppendixPageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        tags
        recipe_img {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 150, quality: 100, layout: CONSTRAINED)
          }
        }
      }
    }
    imageNotFound: file(name: { in: "image-not-found" }) {
      publicURL
      childImageSharp {
        gatsbyImageData(width: 150, quality: 100, layout: CONSTRAINED)
      }
    }
  }
`;
