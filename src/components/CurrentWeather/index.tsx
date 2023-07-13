import Weather from '../../types/Weather';
import DailyWeather from '../DailyWeather';

interface WeatherProps {
	weather: Weather;
}

const CurrentWeather = ({ weather }: WeatherProps) => {
	return (
		<div className='flex flex-col items-center justify-center w-screen min-h-screen text-gray-700 p-10 bg-gradient-to-r from-indigo-400 to-cyan-400'>
			{weather && (
				<div className='w-full max-w-screen-sm bg-white p-10 rounded-xl ring-opacity-40 shadow-2xl'>
					<div className='flex justify-between flex-wrap'>
						<div className='flex flex-col'>
							<span className='text-6xl font-bold'>
								{Math.round(weather.data[0].temp)}°C
							</span>
							<span className='font-semibold mt-1 text-gray-500'>
								{weather.city_name}, {weather.country_code}
							</span>
						</div>
						<img
							src={`https://cdn.weatherbit.io/static/img/icons/${weather.data[0].weather.icon}.png`}
							alt={weather.data[0].weather.description}
						/>
					</div>
					<div className='flex justify-between flex-wrap mt-12'>
						{weather.data.map((el, i) => (
							<DailyWeather key={el.datetime} el={el} i={i} weather={weather} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default CurrentWeather;
