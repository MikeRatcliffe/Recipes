[![Gatsby v5.0](https://img.shields.io/badge/Gatsby-v5.0-blue)](https://www.gatsbyjs.com/) [![MIT](https://img.shields.io/badge/License-MIT-blue)](https://www.gnu.org/licenses/gpl-3.0.html) [![npm](https://img.shields.io/badge/Package%20manager-npm-blue.svg)](https://npmjs.com/) [![ESLint](https://github.com/MikeRatcliffe/NewRecipes/actions/workflows/eslint.yml/badge.svg)](https://github.com/MikeRatcliffe/NewRecipes/actions/workflows/eslint.yml) [![Prettier](https://github.com/MikeRatcliffe/NewRecipes/actions/workflows/prettier.yml/badge.svg)](https://github.com/MikeRatcliffe/NewRecipes/actions/workflows/prettier.yml) [![TypeScript](https://github.com/MikeRatcliffe/NewRecipes/actions/workflows/typescript.yml/badge.svg)](https://github.com/MikeRatcliffe/NewRecipes/actions/workflows/typescript.yml) [![Jest](https://github.com/MikeRatcliffe/NewRecipes/actions/workflows/jest.yml/badge.svg)](https://github.com/MikeRatcliffe/NewRecipes/actions/workflows/jest.yml) ![Tests](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/MikeRatcliffe/d47e9cd71b3f13a3c34585c26b767b74/raw/NewRecipes-junit-tests.json&label=Tests) ![Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/MikeRatcliffe/d47e9cd71b3f13a3c34585c26b767b74/raw/NewRecipes-cobertura-coverage.json&label=Coverage)

<h1 align="center">
  Simple Recipe Book
</h1>

## Installation & Development

```shell
# Clone the repository
git clone https://github.com/MikeRatcliffe/Recipes
cd Recipes

# Install gatsby-cli globally
npm install -g gatsby-cli

# Compile and serves a development build of your site
# at http://localhost:8000 that reflects your source
# code changes in the browser in real time. Should be
# run from the root of your project.
# When the development server is running for one of your
# Gatsby sites, you can open GraphiQL at
# http://localhost:8000/___graphql
gatsby develop

# Compile your site for production so it can be
# deployed. Should be run from the root of your project.
gatsby build

# Serve the production build of your site for testing
# prior to deployment. Should be run from the root of
# your project.
gatsby serve

# Delete the .cache and public directories. Should be
# run from the root of your project. This is useful as a
# last resort when your local project seems to have
# issues or content does not seem to be refreshing.
gatsby clean
```

The recipes for this recipe book are stored under the blog folder:

```text
content
└── blog
    ├── chamorro-kelaguen
    │   ├── image.jpg
    │   └── index.md
    └── chimichurri-steak
        ├── image.jpg
        └── index.md
```

The standard template `index.md` looks like this:

```markdown
---
title: Breakfast Burritos
recipe_img: ./breakfast-burritos.jpg
tags:
  - American
  - Breakfast
  - Dinner
  - Eggs
  - Pan Fried
  - High Carb
  - Lunch
  - Mexican
---

<!-- markdownlint-disable MD024 -->

## description

Filled with sausage, eggs, cheese and fresh avocado salsa, these bodega-style breakfast burritos are delish any time of day!

## ingredients

### Avocado-Tomato Salsa

- 1 large avocado (diced)
- 1-2 tomatoes (diced)
- 1 shallot (minced)
- 1 clove garlic (minced)
- 1 jalapeño pepper (minced)
- 1 tbsp fresh lime juice
- 1/2 tsp salt
- 1/4 tsp ground cumin
- 10 g fresh chopped coriander

### Burritos

- 4 large eggs
- 1/4 tsp smoked paprika
- 1/4 tsp salt
- 225 g spicy sausage such as Chorizo (removed from casings)
- 170 g shredded Monterey Jack cheese
- 4 flour tortillas
- Vegetable oil

## steps

### Avocado-Tomato Salsa

1. Place all of the ingredients in a medium bowl and mix to combine. Set aside.

### Burritos

1. In a medium bowl, whisk the eggs with the smoked paprika and salt. Set aside.
2. Heat a large nonstick pan over medium-high heat. Add the sausage and cook, stirring frequently, until browned, 4 to 5 minutes.
3. Use a slotted spoon to transfer the sausage from the pan to a plate, leaving the drippings in the pan. Reduce the heat to low.
4. Add the eggs and scramble until just cooked through. Transfer the eggs to a plate. Clean the pan (you'll use it again).

### Assemble the burritos

1. Spoon about 1/4 cup of the avocado-salsa onto each tortilla, followed by a quarter of the sausage, a quarter of the eggs, and 1/3 cup cheese.
2. Fold in the sides of the tortilla over the filling and roll, tucking in the edges as you go.
3. Lightly coat the pan with oil and set over medium heat. When the pan is hot, add the burritos, seam side down.
4. Cook, covered, until the bottom of the burritos are golden brown, about 3 minutes. Flip the burritos over and continue cooking, covered, until golden, a few minutes more. Serve warm.

## notes

### Make Ahead

The burritos may be assembled a few hours ahead of time, wrapped tightly in plastic wrap and refrigerated, before cooking. To reheat leftover burritos, wrap in foil and warm in a 180C oven for about 15 minutes.

## based on

- https://www.onceuponachef.com/recipes/breakfast-burritos.html
<!-- markdownlint-enable MD024 -->
```

## Full Tag List

- Recipe Type:
  - Air Fried
  - Roast / Baked
  - Bread
  - Casserole
  - Cake
  - Curry
  - Dehydrated
  - Dip
  - Drink
  - Frittata
  - Grilled
  - Marinade
  - Microwave
  - Ninja Foodi
  - Pan Fried
  - Pressure Cooker
  - Salad
  - Sauce
  - Seasoning
  - Sheet Pan
  - Side Dish
  - Slow Cooker
  - Soup
  - Stir Fried
  - Stovetop
- Diets:
  - Carnivore
  - Keto
  - Low Carb
  - Paleo
  - Vegetarian
  - High Carb
- Mealtimes
  - Breakfast
  - Lunch
  - Dinner
  - Snack
  - Dessert
  - Drink
- Main ingredients
  - Anchovies
  - Avocado
  - Bacon
  - Beans
  - Beef
  - Beetroot
  - Broccoli
  - Brussels Sprouts
  - Cabbage
  - Carrots
  - Cauliflower
  - Cheese
  - Chicken
  - Chickpeas
  - Courgettes
  - Cucumber
  - Duck
  - Eggs
  - Fish
  - Green Beans
  - Lamb
  - Lettuce
  - Mango
  - Minced Beef
  - Mushrooms
  - Mussels
  - Offal
  - Olives
  - Pasta
  - Peppers
  - Pork
  - Potatoes
  - Pumpkin
  - Rice
  - Salmon
  - Sausage
  - Shrimp / Prawns
  - Smoked Haddock
  - Soup
  - Spinach
  - Strawberries
  - Tomatoes
  - Tuna
  - Turkey
  - Vegetables
  - Watermelon
- Origin
  - American
  - Argentinian
  - Australian
  - British
  - Canadian
  - Chilean
  - Chinese
  - Ecuadorian
  - Egyptian
  - Ethiopian
  - Filipino
  - French
  - German
  - Greek
  - Hawaiian
  - Indian
  - Irish
  - Italian
  - Japanese
  - Korean
  - Mediterranean
  - Mexican
  - Kiwi
  - Paraguayan
  - South African
  - Spanish
  - Swiss
  - Thai
  - Tongan
  - Uruguayan
  - Welsh
  - World Foods
