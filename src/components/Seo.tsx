/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import urlJoin from "url-join";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({
  description = "",
  title,
  ingredients,
  isRecipe,
  image,
  steps = [],
  notes,
  pathname,
  basedOn,
  children,
}: ISeo) => {
  const { site }: GraphQL.data = useStaticQuery(
    graphql`
      query Seo {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            twitterUsername
          }
        }
      }
    `
  );

  const siteogimage = "og-image-16x9.jpg";
  const metaDescription = description || site.siteMetadata.description;

  const getSchemaOrgJSONLD = () => {
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        name: title,
        alternateName: site.siteMetadata.title,
      },
    ];

    if (isRecipe) {
      const recipeSchemaJSONLD: IRecipeSchemaJSON = {
        "@context": "http://schema.org",
        "@type": "Recipe",
        author: {
          "@type": "Organization",
          name: site.siteMetadata.title,
        },
        name: title,
        description: description || "",
        recipeCategory: "Dinner",
        image: `${site.siteMetadata.siteUrl}${image}`,
        recipeInstructions: [],
        recipeIngredient: [],
        notes: "",
        basedOn: "",
      };

      //Loop through the steps array to add to the JSONLD
      steps.forEach((step) => {
        recipeSchemaJSONLD.recipeInstructions.push({
          "@type": "HowToStep",
          text: step,
        });
      });

      recipeSchemaJSONLD.notes = notes || "";
      recipeSchemaJSONLD.recipeIngredient = ingredients || [""];
      recipeSchemaJSONLD.basedOn = basedOn || "";

      return [...schemaOrgJSONLD, recipeSchemaJSONLD];
    }

    return schemaOrgJSONLD;
  };

  const schemaOrgJSONLD = getSchemaOrgJSONLD();
  const url = new URL(pathname || "", site.siteMetadata.siteUrl).href;
  const ogimage = image
    ? `${site.siteMetadata.siteUrl}${image}`
    : `${site.siteMetadata.siteUrl}${siteogimage}`;

  return (
    <>
      <title>{title}</title>
      <meta name="og:title" content={title} />
      <meta name="og:image" content={ogimage} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />

      <meta name="description" content={metaDescription} />
      <meta name="image" content={ogimage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogimage} />
      <meta
        name="twitter:creator"
        content={site.siteMetadata.twitterUsername}
      />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {children}
    </>
  );
};

Seo.propTypes = {
  children: PropTypes.node,
  description: PropTypes.string,
  ingredients: PropTypes.array,
  image: PropTypes.string,
  isRecipe: PropTypes.bool,
  pathname: PropTypes.string,
  notes: PropTypes.string,
  steps: PropTypes.array,
  title: PropTypes.string.isRequired,
  basedOn: PropTypes.string,
};

export default Seo;
