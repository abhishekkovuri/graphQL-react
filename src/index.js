import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
const root = ReactDOM.createRoot(document.getElementById("root"))

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:9000/graphql",
})

root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
