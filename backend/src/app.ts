import express, { Express } from "express"
import "dotenv/config"
import bodyParser from "body-parser"
import cors from "cors"
import userRoutes from "./http/routes/userRoutes"
import courseRoutes from "./http/routes/courseRoutes"
import questionRoutes from "./http/routes/questionRoutes"
import questionAnswerRoutes from "./http/routes/questionAnswerRoutes"

export const app: Express = express()

app.use(cors())
app.use(bodyParser.json())

userRoutes(app)
courseRoutes(app)
questionRoutes(app)
questionAnswerRoutes(app)
