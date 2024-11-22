const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/restaurant'


mongoose.connect(
    mongoURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');

})

db.on('error', (err) => {
    console.error('MongoDB connection error:' ,err);

})

db.on('disconnected', () => {
    console.log('MongoDB Disconnected');

})


module.export= db;

/*


Nodejs mongioose schema

-- sending data from client to server
particular data ko save krskte hain through uska end point means API banake


now we need post method that we are sending request to save the data sent by client
jab ham app.post kregy toh wo save hojaega

ab jo data arah ahay wo pehle request ki body mai jaraa hay,now we have to make a document for th enew person jo kay hmar eperson ki type ja hogaf


-- Async Await...makes our work easier
we use it by using try catch block/...try uses for sucessfuk code else block fo rany kind of error

*/