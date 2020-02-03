const config = {
    app: {
        name: process.env.APP_NAME,
        env: process.env.NODE_ENV,
        ip: process.env.APP_LOCAL_IP,
        port: process.env.APP_LOCAL_PORT,
        urlApiPrefix: process.env.APP_PREFIX_API_URL,
        urlVersionPrefix: process.env.APP_VERSION_API,
        urlAppAuth: process.env.APP_RESOURCE_BASE_URL,
        urlAppApi: process.env.APP_AUTH_BASE_URL,
        secretAuth: process.env.APP_TOKEN_AUTH_SECRET,
        secretApi: process.env.APP_TOKEN_API_SECRET,
        todoPerPage: process.env.APP_SETTINGS_TODO_PER_PAGE
    },
    db: {
        api: {
            driver: process.env.DB_API_DRIVER,
            host: process.env.DB_API_HOST,
            port: process.env.DB_API_PORT,
            user: process.env.DB_API_USERNAME,
            pass: process.env.DB_API_PASSWORD,
            database: process.env.DB_API_DATABASE
        }
    }
};

module.exports = config;