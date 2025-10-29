import express from "express"
import cors from "cors"


//app config
const app = express()
const port = 3000

//middleware
app.use(express.json())
app.use(cors())

app.get()