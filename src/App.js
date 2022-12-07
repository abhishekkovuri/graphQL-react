import React from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_COUNTRIES } from './graphql-query/getCountries.js';
import './App.css';

const App = () => {
	const { data } = useQuery(GET_COUNTRIES);
	const countries = data?.getCountries?.countries;

	const [lazyLoadBtn, { data: duplicateCountriesData }] =
		useLazyQuery(GET_COUNTRIES);
	const duplicateCountries = duplicateCountriesData?.getCountries?.countries;

	return (
		<section className="list">
			<header> Render Country List </header>
			<section>
				<h1>Original data</h1>
				{countries &&
					countries.map((country) => (
						<div className="item" key={country.countryName}>
							{country.countryName} - {country.capital}
						</div>
					))}
			</section>
			<button onClick={lazyLoadBtn}>Click me</button>
			<section>
				<h1>Duplicate data</h1>
				{duplicateCountries &&
					duplicateCountries.map((country) => (
						<div className="item" key={country.countryName}>
							{country.countryName} - {country.capital}
						</div>
					))}
			</section>
		</section>
	);
};

export default App;
