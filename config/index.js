'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        env: require('./dev.env'),
        host: 'localhost',
        port: 8080,
        devtool: 'eval-source-map',
        cacheBusting: false,
        autoOpenBrowser: true,
        assetsSubDirectory: "static",
        assetsPublicPath: "",
        proxyTable: {
            // '/bp': {
            //     target: 'https://t.govlan.com:8443/',
            //     changeOrigin: true,
            //     secure: false,
            //     headers: {
            //         Referer: 'https://t.govlan.com:8443/'
            //     }
            // }
            '/bp': {
                target: 'http://192.168.2.102:8080/',
                changeOrigin: true,
                secure: false,
                headers: {
                    Referer: 'http://192.168.2.102:8080/'
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    },

    build: {
        env: require("./prod.env"),
        index: path.resolve(__dirname, "../dist/index.html"),
        assetsRoot: path.resolve(__dirname, "../dist"),
        assetsSubDirectory: "static",
        assetsPublicPath: './',
        proxyTable: {
            '/bp': {
                target: 'https://t.govlan.com:8443/',
                changeOrigin: true,
                secure: false,
                headers: {
                    Referer: 'https://t.govlan.com:8443/'
                }
            }
        },
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}