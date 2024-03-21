const express = require("express");
const path = require("path")
const bodyParser = require("body-parser")
const errorMiddleware = require('./middlewares/error');

const app = express();

// prod config
if (process.env.NODE_ENV !== "prod") {
    require("dotenv").config({path: "config/config.env"});
}


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const order = require('./routes/orderRoute');
const payment = require('./routes/paymentRoute');

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);

// deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
} else {
    app.get('/', (req, res) => {
        res.send('Server is Running! 🚀');
    });
}

// error middleware
app.use(errorMiddleware);

module.exports = app;