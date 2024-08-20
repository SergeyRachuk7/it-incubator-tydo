
module.exports = {
  preset: "jest-puppeteer",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
  setupFilesAfterEnv: ['./setupTests.js'],
};

// integration/jest.config.js

// module.exports = {
//   preset: "jest-puppeteer",
//   textRegex: "./*\\.test\\js$",
//   setupFilesAfterEnv: ['./setupTests.js']
// };
