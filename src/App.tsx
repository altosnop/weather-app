import { useEffect, useState } from 'react';
import axios from 'axios';

const weatherApiKey = import.meta.env.VITE_APP_KEY;

function App() {
	const [weather, setWeather] = useState();

	async function getWeather(lat: number, lon: number) {
		const response = await axios.get(
			`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=6&key=${weatherApiKey}`
		);

		setWeather(response.data);
	}

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position: any) => {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;

					getWeather(lat, lon);
				},
				(error: any) => {
					alert(error);
				}
			);
		}
	}, []);
	return (
		<div className='flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200'>
			{weather && (
				<div className='w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40'>
					<div className='flex justify-between'>
						<div className='flex flex-col'>
							<span className='text-6xl font-bold'>{weather.data[0].temp}</span>
							<span className='font-semibold mt-1 text-gray-500'>
								{weather.city_name}, {weather.country_code}
							</span>
						</div>
						<img
							src={`https://cdn.weatherbit.io/static/img/icons/${weather.data[0].weather.icon}.png`}
							alt={weather.data[0].weather.description}
						/>
					</div>
					<div className='flex justify-between mt-12'>
						{weather.data.map((el, i) => (
							<div className='flex flex-col items-center' key={el.datetime}>
								<span className='font-semibold text-sm'>{el.datetime}</span>
								<img
									src={`https://cdn.weatherbit.io/static/img/icons/${weather.data[i].weather.icon}.png`}
									alt={weather.data[i].weather.description}
									width={50}
								/>
								<span className='font-semibold mt-3 text-lg'>{el.temp}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
