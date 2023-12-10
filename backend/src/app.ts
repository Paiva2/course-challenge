import express, { Express } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "../swagger.json"
import handleRoutes from "./http/routes"
import startUsersDb from "./http/utils/startUsersDb"
import "dotenv/config"

export const app: Express = express()

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://course-challenge.vercel.app"
      : "*",
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

handleRoutes(app)

if (process.env.NODE_ENV !== "production") {
  ;(async () => {
    await startUsersDb()
  })()
}
