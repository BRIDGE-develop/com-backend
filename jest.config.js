module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    testMatch: ['**/test/**/*.test.(ts|js)'],
    moduleNameMapper: {
        '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
        '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
        '^@util/(.*)$': '<rootDir>/src/util/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
};
