import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Container, Nav, Navbar } from "react-bootstrap";
import ThemeDropdown from "./ThemeDropdown";

const Navigation = () => {
  const data: GraphQL.data = useStaticQuery(graphql`
    query Navigation {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div id="main_nav" className="container">
      <Navbar expand="md">
        <Container>
          <Navbar.Brand className="navbar-brand">
            <Link to="/" className="nav-link" data-testid="navbar-brand-link">
              {data.site.siteMetadata.title}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-collapse" />
          <ThemeDropdown className="theme-selector-mobile" />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="mr-auto" data-testid="nav">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/recipes" className="nav-link">
                Recipes
              </Link>
              <Link to="/tags" className="nav-link">
                Tags
              </Link>
              <Link to="/about" className="nav-link">
                About Us
              </Link>
              <Link to="/search" className="nav-link">
                Search
              </Link>
            </Nav>
          </Navbar.Collapse>
          <ThemeDropdown className="theme-selector-desktop" />
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
