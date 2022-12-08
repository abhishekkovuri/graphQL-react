import {
	render,
	waitFor,
	fireEvent,
	getAllByText,
} from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import { GET_COUNTRIES } from './graphql-query/getCountries';
import { GET_COUNTRIES_V2 } from './graphql-query/getCountriesV2';

describe('App test', () => {
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
								countryName: 'India',
								capital: 'New Delhi',
							},
						],
					},
				},
			},
		},
		{
			request: {
				query: GET_COUNTRIES_V2,
			},
			result: {
				data: {
					getCountriesV2: {
						countries: [
							{
								countryName: 'Japan',
								capital: 'Tokyo',
							},
						],
					},
				},
			},
		},
	];

	test('should generate snapshot', async () => {
		const { asFragment } = render(
			<MockedProvider mocks={[...mocks]}>
				<App />
			</MockedProvider>
		);

		await waitFor(() => expect(asFragment()).toMatchSnapshot());
	});

	test('should have the countries list generated', async () => {
		const { getByText, queryByText } = render(
			<MockedProvider mocks={[...mocks]}>
				<App />
			</MockedProvider>
		);

		expect(getByText(/Render Country List/i)).toBeInTheDocument();
		await waitFor(() =>
			expect(getByText(/India - New Delhi/i)).toBeInTheDocument()
		);
		await waitFor(() =>
			expect(queryByText(/Japan - Tokyo/i)).not.toBeInTheDocument()
		);
	});

	test('should display duplicate countries list upon click', async () => {
		const { getAllByText, getByText } = render(
			<MockedProvider mocks={[...mocks]}>
				<App />
			</MockedProvider>
		);

		const buttonElement = getByText(/Click me/);
		fireEvent.click(buttonElement);

		await waitFor(() =>
			expect(getAllByText(/India - New Delhi/i).length).toBe(2)
		);
	});
});
