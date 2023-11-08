import React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby";

const GatsbyImageWithFallback = ({
  image,
  className = "",
  alt = "",
  ...props
}: IImage) => {
  const data: GraphQL.imageNotFound = useStaticQuery(graphql`
    query GatsbyImageWithFallback {
      imageNotFound: file(name: { in: "image-not-found" }) {
        childImageSharp {
          gatsbyImageData(quality: 100, layout: CONSTRAINED)
        }
      }
    }
  `);

  if (!image) {
    console.error(`Image missing or invalid in ${alt}`);
    return null;
  }

  const imageData = (image || data.imageNotFound).childImageSharp
    .gatsbyImageData;

  return (
    <GatsbyImage {...props} image={imageData} alt={alt} className={className} />
  );
};

GatsbyImageWithFallback.propTypes = {
  alt: PropTypes.string,
  data: PropTypes.object,
  image: PropTypes.object,
  className: PropTypes.string,
};

export default GatsbyImageWithFallback;
