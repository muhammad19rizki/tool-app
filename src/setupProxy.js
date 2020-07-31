const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:7080',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        })
    );
};