module.exports = {
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: ['src/*.{js,jsx}', 'src/**/*.{js,jsx}', '!src/**/*.test.{js,jsx}', '!src/index.js', '!src/**/**/liveui-core.js'],
  coverageReporters: ['json', 'text', 'lcov'],
  moduleDirectories: ['node_modules', 'src'],
  testRegex: 'tests/.*\\.test\\.js$',
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|ico|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/internals/mocks/image.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@composiv)'],
};
