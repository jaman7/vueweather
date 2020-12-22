import axios from 'axios';

const URL_DB_PATCH = 'mojabaza-49c9';
const restdbInstance = axios.create({
	baseURL: `https://${URL_DB_PATCH}.restdb.io/rest/`,
	responseType: 'json',
	headers: { 'x-apikey': process.env.RESTDB_API }
});

export default restdbInstance;
