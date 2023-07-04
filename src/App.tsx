import { useEffect } from 'react';
import './App.css';

function App() {
	const weatherApiKey = import.meta.env.VITE_APP_KEY;
	// 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'

	function getWeather(lat: number, lon: number) {
		console.log(lat, lon);
	}

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position: any) => {
					console.log(position);
				},
				(error: any) => {
					console.log(error);
				}
			);
		}
	}, [weatherApiKey]);
	return (
		<>
			<div>
				<h1>Hello world!</h1>
			</div>
		</>
	);
}

export default App;
