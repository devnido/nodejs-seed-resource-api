const config = {
    app: {
        name: process.env.APP_NAME,
        env: process.env.NODE_ENV,
        ip: process.env.APP_LOCAL_IP,
        port: process.env.APP_LOCAL_PORT,
        urlApiPrefix: process.env.APP_PREFIX_API_URL,
        urlVersionPrefix: process.env.APP_VERSION_API,
        baseUrl: process.env.APP_BASE_URL,
        baseUrlAuth: process.env.APP_RESOURCE_BASE_URL,
        baseUrlApi: process.env.APP_AUTH_BASE_URL,
        secretAuth: process.env.APP_TOKEN_AUTH_SECRET,
        secretApi: process.env.APP_TOKEN_API_SECRET,
        todoPerPage: process.env.APP_SETTINGS_TODO_PER_PAGE,
        passwordSalt: process.env.APP_SETTINGS_PASS_SALT
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
    },
    email: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        name: process.env.EMAIL_NAME,
        from: process.env.EMAIL_FROM,
        user: process.env.EMAIL_AUTH,
        pass: process.env.EMAIL_AUTH_PASS,
    }
}

module.exports = config