module.exports = {
  rootDir: "../..",
  "globals": {
    "ts-jest": {}
  },
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts"
  ],
  setupFiles: [
    "<rootDir>/config/jest/jest.setup.js"
  ],
  setupFilesAfterEnv: [
      "<rootDir>/config/jest/jest.setupAfterEnv.js"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/ts-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\]"
  ],
  "modulePaths": [],
  "moduleNameMapper": {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^@service/(.+)(\\.js)?$": "<rootDir>/src/service/$1",
    "^@component/(.*)(\\.js)?$": "<rootDir>/src/component/$1",
    "^@store/(.*)(\\.js)?$": "<rootDir>/src/store/$1"
  },
  "moduleFileExtensions": [
    "js",
    "ts",
    "tsx",
    "json",
    "jsx",
    "node"
  ],
  "watchPlugins": [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
}