const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/many",
            "/endpoints",
            "/i",
            "/need",
            "/to",
            "/proxy"
        ],
        target: "https://ilaunchrapp.com/demo_ecom/api",
        secure: false,
        changeOrigin: true,
        pathRewrite: function (path) {
            console.log("path", path.replace("/api",""));
            return path.replace("/api","");
        }
    }
]

module.exports = PROXY_CONFIG;
