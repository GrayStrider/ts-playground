module.exports = {

  collectCoverage: true,

  collectCoverageFrom: [
    '<rootDir>/_Snippets/**/*.{ts,tsx,js,jsx}',
  ],

  testPathIgnorePatterns: [
    '<rootDir>/_Snippets/Reference, TS/D/BigInt.ts',
  ],

  roots: [
    // '<rootDir>/src/',
    '<rootDir>/_Snippets/',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  modulePaths: [
    '<rootDir>/src/',
    '<rootDir>/_Snippets/',
  ],
}
