import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Row, Col } from "react-bootstrap";
import slug from "slug";

const TagsPage = ({ data }: GraphQL.results) => {
  if (!data) {
    return;
  }

  const tags = data.tags.group.sort();

  return (
    <Layout>
      <div className="container">
        <Row>
          {tags.map(({ tag, totalCount }) => {
            return (
              <Col key={tag} xl="2" md="3" sm="4" xs="12">
                <div className="tag-holder">
                  <Link
                    to={`/tags/${slug(tag)}`}
                    className="portfolio-item tag-item p-3"
                  >
                    {tag} ({totalCount})
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </Layout>
  );
};

TagsPage.propTypes = {
  data: PropTypes.object,
};

export default TagsPage;

export const Head = ({ location }: IHead) => {
  return <Seo title="All Tags" pathname={location.pathname} />;
};

export const pageQuery = graphql`
  query TagsPage {
    site {
      siteMetadata {
        title
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
