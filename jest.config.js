/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "\\.[jt]sx?$": ["babel-jest", { presets: ["next/babel"] }],
  },
  modulePathIgnorePatterns: ["<rootDir>/e2e-tests/"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  collectCoverageFrom: [
    "<rootDir>/components/**/*.ts(x)?",
    "<rootDir>/constants/**/*.ts(x)?",
    "<rootDir>/hooks/**/*.ts(x)?",
    "<rootDir>/models/**/*.ts(x)?",
    "<rootDir>/services/**/*.ts(x)?",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "\\.stories\\.tsx?$"],
  resetMocks: true,
  resetModules: true,
};
