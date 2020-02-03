mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const driver = process.env.DB_API_DRIVER;
const host = process.env.DB_API_HOST;
const port = process.env.DB_API_PORT;
const user = process.env.DB_API_USERNAME;
const pass = process.env.DB_API_PASSWORD;
const database = process.env.DB_API_DATABASE;



const connectionString = `${driver}://${host}:${port}/${database}`;

mongoose.connection.on('error', err => {
    console.log("el error de la coneccion mongodb");
    console.log(err);
});

const mongoOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}

if (user && pass) {
    mongoOptions.auth = {
        user: user,
        password: pass
    }
}


module.exports = mongoose.connect(connectionString, mongoOptions)
