module.exports = {
  transform: {
    "^.+\\.[jt]sx?$": `<rootDir>/testing/jest-preprocess.js`,
  },

  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },

  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],

  transformIgnorePatterns: [
    `node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)`,
  ],

  globals: {
    __PATH_PREFIX__: ``,
  },

  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: `http://localhost:8000`,
  },

  setupFiles: [`<rootDir>/testing/loadershim.js`],

  reporters: [
    "default",
    ["jest-junit", { outputDirectory: "<rootDir>/coverage" }],
  ],
  coverageReporters: ["text", "text-summary", "cobertura", "html"],
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 40,
    },
  },
};
