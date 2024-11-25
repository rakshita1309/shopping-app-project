// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './', // Path to your Next.js project directory
});

// Export a custom Jest config with Next.js preset
module.exports = createJestConfig({
  testEnvironment: 'jest-environment-jsdom', // Use jsdom for simulating browser environment
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use babel-jest to transform JS/JSX files
  },
  moduleNameMapper: {
    // Mock static assets (like images and CSS files) for Jest tests
    '\\.(jpg|jpeg|png|gif|svg|css|scss)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Ensure correct path for jest-dom matchers
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}', 
    '!**/node_modules/**', 
    '!**/.next/**',
  ], // Collect coverage from all files except node_modules and .next
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Ignore test in node_modules and .next
});
