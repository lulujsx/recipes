import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()
dotenv.config()

app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(express.json({limit: '30mb'}))

app.use(cors())

app.use("/posts", postRoutes)
app.use("/user", userRoutes)

app.get("/", (req,res) => {
    res.send("Welcome to Recipes Api")
})


mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log("BDD conectada"))
    .catch((err)=> console.log("BDD no se pudo conectar",err))


app.listen(process.env.PORT,() =>{
    console.log(`servidor corriendo en el puerto ${process.env.PORT}`)
})

