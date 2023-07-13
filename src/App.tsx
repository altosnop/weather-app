import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Position from './types/Position';
import Weather from './types/Weather';
import CurrentWeather from './components/CurrentWeather';

const weatherApiKey = import.meta.env.VITE_APP_KEY;

function App() {
	const [location, setLocation] = useState<Position | undefined>(undefined);
	const [weather, setWeather] = useState<Weather | undefined>(undefined);

	const getWeather = useCallback(async (lat: number, lon: number) => {
		try {
			const response = await axios.get(
				`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=5&key=${weatherApiKey}`
			);

			setWeather(response.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position: Position) => {
					setLocation(position);
				},
				error => {
					console.error('Error retrieving geolocation', error);
				}
			);
		} else {
			console.error('Geolocation is not supported!');
		}
	}, []);

	useEffect(() => {
		if (location) {
			getWeather(location.coords.latitude, location.coords.longitude);
		}
	}, [location, getWeather]);

	return <>{weather && <CurrentWeather weather={weather} />}</>;
}

export default App;
