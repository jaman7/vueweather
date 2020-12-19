import axios from 'axios';

const URL_DB_PATCH = 'mojabaza-49c9';
const restdbInstance = axios.create({
	baseURL: `https://${URL_DB_PATCH}.restdb.io/rest/`,
	responseType: 'json',
	headers: { 'x-apikey': '5fcd578789b564693884427b' }
});

export default restdbInstance;
