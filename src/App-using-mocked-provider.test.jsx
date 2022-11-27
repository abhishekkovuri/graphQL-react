import { render, waitFor } from "@testing-library/react"
import { MockedProvider } from "@apollo/client/testing"
import App from "./App"
import { GET_COUNTRIES } from "./graphql-query/getCountries"

describe("App test", () => {
	const mocks = [
		{
			request: {
				query: GET_COUNTRIES,
			},
			result: {
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
			},
		},
	]
	test("renders learn react link", async () => {
		const { getByText, queryByText } = render(
			<MockedProvider mocks={[...mocks]}>
				<App />
			</MockedProvider>
		)
		expect(getByText(/Render Country List/i)).toBeInTheDocument()
		await waitFor(() =>
			expect(getByText(/India - New Delhi/i)).toBeInTheDocument()
		)
		await waitFor(() =>
			expect(queryByText(/Japan - Tokyo/i)).not.toBeInTheDocument()
		)
	})
})
