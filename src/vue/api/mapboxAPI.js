import axios from 'axios';

const mapboxInstance = axios.create({
	baseURL: `api.mapbox.com/geocoding/v5/mapbox.places/`,
	responseType: 'json'
});

export default mapboxInstance;
