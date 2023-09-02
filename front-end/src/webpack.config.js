var path = require('path');

module.exports = function (config) {
    config.set({
        testRunner: "jest",
        mutator: "typescript",
        transpilers: ["webpack"],
        reporter: ["clear-text", "progress", "dashboard"],
        coverageAnalysis: "off",
        tsconfigFile: "tsconfig.json",
        mutate: ["src/**/*.ts"],
        webpack: {
            configFile: path.join(__dirname, "config/webpack.config.dev.js")
        }
    });
};