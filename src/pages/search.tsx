import React, { useState, ChangeEvent } from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { Row, Col } from "react-bootstrap";

const Search = ({ data }: GraphQL.results) => {
  if (!data) {
    return;
  }

  const [state, setState] = useState({ query: "", results: [] });

  const ResultList = () => {
    let output: string | JSX.Element[] = "";

    if (state.results.length > 0) {
      const results = state.results.map((page: ISearchResult) => {
        const description = extractDescription(page);

        return (
          <Col key={page.url}>
            <div className="item-search">
              <Link to={page.url} className="recipe-search-link">
                <h4>{page.title}</h4>
              </Link>
              <p>{description}</p>
            </div>
          </Col>
        );
      });

      output = results;
    } else if (state.query.length >= 3) {
      output = `No results for "${state.query}"`;
    } else if (state.results.length === 0 && state.query.length > 0) {
      output = "Please insert at least 3 characters";
    }

    return <>{output}</>;
  };

  const getSearchResults = (query: string) => {
    const index = window.__FLEXSEARCH__.en.index;
    const store = window.__FLEXSEARCH__.en.store;

    if (!query || !index) {
      return [];
    } else {
      let results: number[] = [];
      Object.keys(index).forEach((idx) => {
        results.push(...index[idx].values.search(query));
      });

      results = Array.from(new Set(results));

      const nodes: IWindowFlexSearchResults = store
        .filter((node) => (results.includes(node.id) ? node : null))
        .map((node) => node.node);

      return nodes;
    }
  };

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    const query: string = event.target.value;

    if (query.length >= 3) {
      const results = getSearchResults(query);
      setState({ query: query, results: results as any });
    } else {
      setState({ query: query, results: [] });
    }
  };

  return (
    <Layout>
      <div className="container">
        <Row>
          <input
            className="recipe-search"
            type="text"
            onChange={search}
            placeholder={"Search"}
            value={state.query}
          />
          <div className="search__list">
            <ResultList />
          </div>
        </Row>
      </div>
    </Layout>
  );
};

function extractDescription(post: GraphQL.node | ISearchResult): string {
  const html = post.html;
  const htmlNoComments = html.replace(/<!--.+?-->/g, "").trim();
  const matches = [
    ...htmlNoComments.matchAll(/## description([\s\S]+?)## ingredients/g),
  ];

  if (!matches[0]) {
    return "";
  }

  const description = matches[0][1].trim();
  return description;
}

Search.propTypes = {
  data: PropTypes.object,
};

export default Search;

/* eslint-disable react/prop-types */
export const Head = ({ location }: IHead) => {
  return (
    <Seo title="Search Ratcliffe Family Recipes" pathname={location.pathname} />
  );
};
/* eslint-enable react/prop-types */

export const pageQuery = graphql`
  query Search {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
