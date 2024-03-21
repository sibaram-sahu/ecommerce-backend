const mangoose = require("mongoose")
const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
    mangoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {console.log("Databse connected.")})
}

module.exports = connectDatabase;