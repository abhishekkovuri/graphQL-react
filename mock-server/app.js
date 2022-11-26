import bodyParser from "body-parser"
import cors from "cors"
import express from "express"
import playground from "graphql-playground-middleware-express"
import server from "./graphql/server"
import { expressMiddleware } from "@apollo/server/express4"

const grqphqlPlayground = playground.default
const port = process.env.PORT || 9000
const app = express()

app.use(cors(), bodyParser.json())

server.start().then(() => {
	app.use("/graphql", bodyParser.json(), expressMiddleware(server))
	app.get("/local-mock-playground", grqphqlPlayground({ endpoint: "/graphql" }))
})

app.listen(port, () => console.info(`Server started on port ${port}`))
