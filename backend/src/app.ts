import express, { Express } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import "dotenv/config"

export const app: Express = express()

app.use(cors())
app.use(bodyParser.json())

app.get("/init", (req, res) => res.status(200).send("init testing"))
