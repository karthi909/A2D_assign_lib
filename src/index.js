const express = require('express')
const app = express()
let port = 3000;

const mongoose = require('mongoose')

const route = require('./Route/route')



app.use(express.json());

mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


//mongodb+srv://KA909_1:karthi123@cluster0.qpomb.mongodb.net/A2d_asign
//mongodb://localhost:27017



app.listen(port, () => {
   console.log(`Server Running on PORT - ${port}`) 
});