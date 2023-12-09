import express, { Express } from "express"
import "dotenv/config"
import bodyParser from "body-parser"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "../swagger.json"
import userRoutes from "./http/routes/userRoutes"
import courseRoutes from "./http/routes/courseRoutes"
import questionRoutes from "./http/routes/questionRoutes"
import questionAnswerRoutes from "./http/routes/questionAnswerRoutes"
import finishedPaymentsRoutes from "./http/routes/finishedPaymentsRoutes"

export const app: Express = express()

app.use(cors())
app.use(bodyParser.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

userRoutes(app)
courseRoutes(app)
questionRoutes(app)
questionAnswerRoutes(app)
finishedPaymentsRoutes(app)
