const express  = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const cookieparser = require('cookie-parser')

const schema = require('./schema')

const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended : true
}))
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(cookieparser('secret'))

async function connection(){
    try {
        const connectionparams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(process.env.MONGO_URL, connectionparams)
        console.log("DB connected")
    }
    catch (err){
        console.log(err)
    }
}
connection();

app.get('/', (req,res)=>{
    res.send("hii")
})

app.post('/app/sentiment', async(req,res) => {

    console.log(req.body);
    const data = new schema({
        text: req.body.text,
        result: req.body.result,
        satisfaction: req.body.satisfaction,
        desiredResult: req.body.desiredResult
    })

    await data
    .save()
    .then( result => {
        console.log(result)
        res.status(200).json({
            message: "Saved"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: err.toString()
        })
    })
})

app.listen(process.env.PORT || 80, () => console.log("Express server on 8000"))