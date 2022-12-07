import { gql } from "@apollo/client"

export const GET_COUNTRIES_V2 = gql`
	query GetCountriesV2 {
		getCountriesV2 {
			countries {
				countryName
				capital
			}
		}
	}
`
