const { createProxyMiddleware } =
    require('http-proxy-middleware');

module.exports = function (app) {
    app.use("/api",
        createProxyMiddleware({
            // server ke home page ka link
            target: "http://44.202.201.103",
            // target: 'https://food-app-i86p.onrender.com',
            changeOrigin: true,
        })
    );
};
