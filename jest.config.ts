import type { Config } from 'jest';

import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>" }),
  modulePaths: [
    '<rootDir>'
  ],
  setupFilesAfterEnv: ["<rootDir>/Test/setupTests.ts"]
};


export default config;

process.env = Object.assign(process.env, {
  MONGODB_CNN: "mongodb://127.0.0.1:27017/test-mxloadboard",
  PORT: 8010,
  SECRETPRIVATEKEY: "mx-loadboard051214"
});