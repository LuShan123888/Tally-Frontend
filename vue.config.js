module.exports = {
    // 基本路径 baseURL已经过时
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'static',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
    parallel: require('os').cpus().length > 1,
    devServer: {
        open: process.platform === 'darwin',
        disableHostCheck: true,
        host: 'localhost',
        port: 8000,
        https: false,
        hotOnly: false,
    },
    transpileDependencies: ['vuetify']
}