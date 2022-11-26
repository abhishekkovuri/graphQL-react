import countries from "./mocks/countries"
const resolvers = {
	Query: {
		getCountries: () => countries,
	},
}

export default resolvers
