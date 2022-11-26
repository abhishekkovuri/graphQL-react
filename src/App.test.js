import { render } from "@testing-library/react"
import { useQuery } from "@apollo/client"
import App from "./App"

jest.mock("@apollo/client", () => {
	return {
		gql: jest.fn(),
		useQuery: jest.fn(),
	}
})

describe("App test", () => {
	beforeEach(() => {
		useQuery.mockReturnValue({
			data: {
				getCountries: {
					countries: [
						{
							countryName: "India",
							capital: "New Delhi",
						},
					],
				},
			},
		})
	})

	test("renders learn react link", () => {
		const { getByText, queryByText } = render(<App />)
		expect(getByText(/Render Country List/i)).toBeInTheDocument()
		expect(getByText(/India - New Delhi/i)).toBeInTheDocument()
		expect(queryByText(/Japan - Tokyo/i)).not.toBeInTheDocument()
	})
})
