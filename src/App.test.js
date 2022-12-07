import { getByText, render } from '@testing-library/react';
import { useQuery, useLazyQuery } from '@apollo/client';
import App from './App';

jest.mock('@apollo/client', () => {
	return {
		gql: jest.fn(),
		useQuery: jest.fn(),
		useLazyQuery: jest.fn(),
	};
});

describe('App test', () => {
	beforeEach(() => {
		useQuery.mockReturnValue({
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
		});
		useLazyQuery.mockReturnValue([
			jest.fn(),
			{
				data: {
					getCountries: {
						countries: [
							{
								countryName: 'Japan',
								capital: 'Tokyo',
							},
						],
					},
				},
			},
		]);
	});

	test('should generate snapshots', () => {
		const { asFragment } = render(<App />);

		expect(asFragment()).toMatchSnapshot();
	});

	test('should display the ', () => {
		const { getByText, queryByText } = render(
			<App />
		);

		expect(getByText(/Render Country List/i)).toBeInTheDocument();
		expect(getByText(/India - New Delhi/i)).toBeInTheDocument();
		expect(queryByText(/Japan - Tokyo/i)).toBeInTheDocument();
	});
});
