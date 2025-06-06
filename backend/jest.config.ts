import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config = {
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['./node_modules/'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  },
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/', // Always ignore node_modules
    '/dist/', // Ignore compiled output
    '/coverage/', // Ignore the coverage report output directory itself
    '/*.d.ts', // Ignore all TypeScript declaration files
    '/src/main.ts', // Ignore a specific entry file if it's just bootstrapping
    '/test/',
    '/*.spec.ts',
    '/*.config.ts',
    '/src/migrations/',
    '/src/seeders/',
    '/*.module.ts',
  ],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  reporters: [
    'default'
  ],
};

module.exports = config;
