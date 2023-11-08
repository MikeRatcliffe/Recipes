import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import slug from "slug";
import GatsbyImageWithFallback from "../components/GatsbyImageWithFallback";

const RecipeCard = ({ recipe }: IRecipeNode) => {
  return (
    <article key={recipe.fields.slug} className="recipe-card">
      <Link
        to={recipe.fields.slug}
        data-testid={`recipe-card-link-${slug(recipe.frontmatter.title)}`}
      >
        <header>
          <GatsbyImageWithFallback
            image={recipe.frontmatter.recipe_img}
            alt={recipe.frontmatter.title}
            data-testid={`recipe-card-image-${slug(recipe.frontmatter.title)}`}
          />
        </header>
        <section
          data-testid={`recipe-card-title-${slug(recipe.frontmatter.title)}`}
        >
          <h3>{recipe.frontmatter.title}</h3>
        </section>
      </Link>
    </article>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object,
};

export default RecipeCard;
