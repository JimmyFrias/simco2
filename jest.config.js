/* eslint-disable */
module.exports = {
    verbose: true,
    "moduleNameMapper": {
        ".*\\.(css|less|styl|scss|sass)$": "<rootDir>/test/config/cssModule.js",
    },
    'transform': {
        '^.+\\.(js|jsx)$': 'babel-jest',
        '^.+\\.svg$': '<rootDir>/test/config/svgTransform.js',
        '\\.(css|less)$': '<rootDir>/test/config/styleMock.js'
    },
    testResultsProcessor: "jest-sonar-reporter",
};