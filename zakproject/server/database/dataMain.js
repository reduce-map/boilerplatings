
const mongoose = require('mongoose')

mongoose.Promise = Promise
mongoose.connect("mongodb://localhost:27017/User")
const database = mongoose.connection;

database.on('error', error => console.log(`Connection to  database failed: ${error}`));
database.on('connected', () => console.log(`Connected to ${'User'} database`));
database.on('disconnected', () => console.log(`Disconnected from ${'User'} database`));
process.on('SIGINT', () => {
    database.close(() => {
        console.log(`${'User'} terminated, connection closed`);
        process.exit(0);
    })
});

module.exports = mongoose;




