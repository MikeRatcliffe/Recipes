module.exports = {
  parser: "@typescript-eslint/parser",
  processor: "@graphql-eslint/graphql",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "react": {
      "version": "detect",
    },
  },
  env: {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "node": true,
    "jest": true,
  },
  plugins: ["@typescript-eslint", "react"],
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": "latest",
    "sourceType": "module",
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
    "react/prop-types": "warn",
  },
  overrides: [
    {
      files: ["*.d.ts"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
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
      parser: "@graphql-eslint/eslint-plugin",
      plugins: ["@graphql-eslint"],
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
  ],
};
