import Weather from '../../types/Weather';

interface DailyWeatherProps {
	el: {
		temp: number;
		datetime: string;
		weather: {
			icon: string;
			description: string;
		};
	};
	i: number;
	weather: Weather;
}

const DailyWeather = ({ el, i, weather }: DailyWeatherProps) => {
	return (
		<div className='flex flex-col items-center' key={el.datetime}>
			<span className='font-semibold text-sm'>
				{new Date(el.datetime).toLocaleDateString('en-US', {
					weekday: 'short',
				})}
			</span>
			<img
				src={`https://cdn.weatherbit.io/static/img/icons/${weather.data[i].weather.icon}.png`}
				alt={weather.data[i].weather.description}
				width={50}
			/>
			<span className='font-semibold mt-3 text-lg'>
				{Math.round(el.temp)}°C
			</span>
		</div>
	);
};

export default DailyWeather;
