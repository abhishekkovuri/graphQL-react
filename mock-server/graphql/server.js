import { readFileSync } from "fs"
import resolvers from "./resolvers"
import { ApolloServer } from "@apollo/server"

const typeDefs = readFileSync("./graphql/schema.graphql", {
	encoding: "utf-8",
})

const server = new ApolloServer({ typeDefs, resolvers })

export default server
