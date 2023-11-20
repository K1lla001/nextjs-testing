module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-js-dom',
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$" : "babel-jest",
    },
};