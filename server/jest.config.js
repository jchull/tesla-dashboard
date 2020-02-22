module.exports = {
  rootDir: ".",
  "globals": {
    "ts-jest": {}
  },
  "collectCoverageFrom": [
    "src/**/*.{ts}",
    "!src/**/*.d.ts"
  ],
  "coverageDirectory": "../test-reports/server/coverage",
  setupFiles: [
    //"<rootDir>/config/jest/jest.setup.js"
  ],
  setupFilesAfterEnv: [
     // "<rootDir>/config/jest/jest.setupAfterEnv.js"
  ],
  "testMatch": [
    "<rootDir>/src/**/*.spec.ts"
  ],
  "testEnvironment": "node",
  "transform": {
    "^.+\\.(js|ts)$": "<rootDir>/node_modules/ts-jest",
    // "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\]"
  ],
  "modulePaths": [],
  "moduleNameMapper": {
    "^@service/(.+)(\\.js)?$": "<rootDir>/src/service/$1",
    "^@component/(.*)(\\.js)?$": "<rootDir>/src/component/$1",
    "^@store/(.*)(\\.js)?$": "<rootDir>/src/store/$1"
  },
  "moduleFileExtensions": [
    "js",
    "ts",
    "json"
  ],
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
