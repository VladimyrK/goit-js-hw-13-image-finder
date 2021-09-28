import getFetch from './apiService.js';
const data = getFetch('rose').then(result => console.log(result));
