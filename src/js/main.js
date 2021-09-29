import getFetch from './apiService.js';
import template from '../templates/main.hbs';

const list = document.querySelector('.gallery');
const form = document.getElementById('search-form');

form.addEventListener('submit', async e => {
  list.innerHTML = '';
  e.preventDefault();
  list.insertAdjacentHTML('beforeend', template(await getFetch(e.target.elements.query.value)));

  form.reset();
});
