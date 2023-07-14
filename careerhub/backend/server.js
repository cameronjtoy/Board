require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const companyy = require('./test.js')


app.use(express.json())
// app.use(bodyParser.json())
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(cookieParser())
// app.use(cors({
//     origin: 'http://localhost:8080',
//     methods: ['GET', 'POST'],
//     credentials: true
//   }));
// app.use(express.static(__dirname + '/public'));


//Routes
// app.use('/user',require('./routes/login.js'))
app.use('/api',require('./routes/dashboard.js'))




const URI = process.env.DATABASE_URI
mongoose.connect(URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'front-end', 'build')));
    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'));
    });
}

const server = PORT = process.env.PORT || 8080
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
    })
