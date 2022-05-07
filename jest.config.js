module.exports = {
  clearMocks: true,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  moduleNameMapper: {
    "\\.css$": "<rootDir>/tests/mock.js",
  },
  extensionsToTreatAsEsm: [".jsx"],
};
