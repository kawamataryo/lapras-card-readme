module.exports = {
  clearMocks: true,
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {useESM: true, tsconfig: {types: ['node']}}]
  },
  verbose: true
}
