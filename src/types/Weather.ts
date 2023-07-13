interface Weather {
	city_name: string;
	country_code: string;
	data: {
		temp: number;
		datetime: string;
		weather: {
			icon: string;
			description: string;
		};
	}[];
}

export default Weather;
