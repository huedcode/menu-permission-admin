'use strict'
const path = require('path')

// const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = 'vue' // page title

const port = process.env.port || process.env.npm_config_port || 9527 // dev port

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'production',
    productionSourceMap: process.env.NODE_ENV === 'dev',
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            ['/']: {
                ws: false,
                target: ``,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + '']: ''
                }
            }
        },
        disableHostCheck: false,
    },
    configureWebpack: {
        devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : undefined,
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },

    },
    chainWebpack(config) {
        config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'vue'
                return args
            })
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
