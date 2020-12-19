import axios from 'axios';

const mapboxInstance = axios.create({
	baseURL: `api.mapbox.com/geocoding/v5/mapbox.places/`,
	responseType: 'json',
	headers: { 'x-apikey': '5fcd578789b564693884427b' }
});

export default mapboxInstance;
