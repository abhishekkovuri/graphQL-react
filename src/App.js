import React from "react"
import { useQuery } from "@apollo/client"
import { GET_COUNTRIES } from "./graphql-query/getCountries.js"
import "./App.css"

const App = () => {
	const { data } = useQuery(GET_COUNTRIES)
	const countries = data?.getCountries?.countries

	return (
		<section className="list">
			<header> Render Country List </header>
			<section>
				{countries &&
					countries.map((country) => (
						<div className="item" key={country.countryName}>
							{country.countryName} - {country.capital}
						</div>
					))}
			</section>
		</section>
	)
}

export default App
