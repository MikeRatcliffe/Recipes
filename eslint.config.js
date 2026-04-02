import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import graphql from "@graphql-eslint/eslint-plugin";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        global: "readonly",
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        GraphQL: "readonly",
        JSX: "readonly",
        ReactNode: "readonly",
        IGatsbyImageData: "readonly",
        IGatsbyImage: "readonly",
        // TypeScript interfaces used in the project
        IImage: "readonly",
        ILayout: "readonly",
        IRecipeNode: "readonly",
        ISeo: "readonly",
        IRecipeSchemaJSON: "readonly",
        IHead: "readonly",
        ISearchResult: "readonly",
        IWindowFlexSearchResults: "readonly",
        IAppendixRecipePage: "readonly",
        IHeadWithDataMarkdownRemarkImageNotFound: "readonly",
        ITagPage: "readonly",
        IHeadWithPageContextTag: "readonly",
        IRecipeData: "readonly",
        IHeadComponents: "readonly",
        // Browser globals
        HTMLElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLDivElement: "readonly",
        URL: "readonly",
        location: "readonly",
        // Jest globals
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        jest: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      react: react,
      prettier: prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Enable prettier rules
      "prettier/prettier": "warn",
      // interface start with capital I
      "@typescript-eslint/interface-name-prefix": "off",
      // allow "any" as type
      "@typescript-eslint/no-explicit-any": "off",
      // allow @ts-ignore for testing purposes
      "@typescript-eslint/ban-ts-ignore": "off",
      // Disable prop-types as we use TypeScript for type checking
      "react/prop-types": "off",
      // React recommended rules
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // Disable no-unused-vars for TypeScript files
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    files: ["*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
    },
  },
  {
    files: ["*.ts"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
  },
  {
    files: ["*.graphql"],
    languageOptions: {
      parser: graphql,
    },
    plugins: {
      "@graphql-eslint": graphql,
    },
    rules: {
      "@graphql-eslint/no-anonymous-operations": "error",
      "@graphql-eslint/naming-convention": [
        "error",
        {
          OperationDefinition: {
            style: "PascalCase",
            forbiddenPrefixes: ["Query", "Mutation", "Subscription", "Get"],
            forbiddenSuffixes: ["Query", "Mutation", "Subscription"],
          },
        },
      ],
    },
  },
  prettierConfig,
  {
    ignores: [
      "node_modules/**",
      ".cache/**",
      "public/**",
      "coverage/**",
      "build/**",
      "dist/**",
      "*.min.js",
      "*.bundle.js",
      "__mocks__/**",
      "**/*.cjs",
      "src/gatsby-types.d.ts",
    ],
  },
];
