import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Navigation from "./Navigation";

const Layout = ({ children, className = "" }: ILayout) => {
  const data: GraphQL.data = useStaticQuery(graphql`
    query Layout {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className={className} data-testid="layout-container">
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <footer id="main_footer" className="container pb-5 pt-5 text-center">
        © {new Date().getFullYear()}{" "}
        {data.site ? data.site.siteMetadata.title : "2022"}
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Layout;
