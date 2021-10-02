import getFetch from './apiService.js';
import template from '../templates/main.hbs';

const list = document.querySelector('.gallery');
const form = document.getElementById('search-form');
const btnMore = document.createElement('button');
btnMore.textContent = 'Load more';
const modal = document.querySelector('.js-lightbox');
const modalImg = document.querySelector('.lightbox__image');
const modalBtnClose = document.querySelector('[data-action="close-lightbox"]');
const modalOverlay = document.querySelector('.lightbox__overlay');

let page = 1;
let query = '';
let isStartedBtn = false;
let isStartedList = false;
let firstNewElem = 0;
let data;

form.addEventListener('submit', async e => {
  e.preventDefault();

  list.innerHTML = '';

  firstNewElem = 0;

  if (query !== '') {
    if (query === e.target.elements.query.value) {
      page = page + 1;
    } else {
      page = 1;
    }
  }

  data = await getFetch(e.target.elements.query.value, page);
  list.insertAdjacentHTML('beforeend', template(data));

  list.appendChild(btnMore);

  query = e.target.elements.query.value;

  if (!isStartedBtn) {
    isStartedBtn = true;
    btnMore.addEventListener('click', async () => {
      page = page + 1;
      firstNewElem = firstNewElem + 12;
      data = await getFetch(e.target.elements.query.value, page);

      list.insertAdjacentHTML('beforeend', template(data));
      list.appendChild(btnMore);
      const elems = document.querySelectorAll('.photo-card');

      function scroll() {
        list.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
      setTimeout(scroll, 100);
    });
  }

  if (!isStartedList) {
    isStartedList = true;

    list.addEventListener('click', async e => {
      if (e.target.nodeName === 'IMG') {
        const targetSrc = e.target.src;
        const targetData = data.find(({ webformatURL }) => webformatURL === targetSrc);
        const LargeImgSrc = targetData.largeImageURL;

        modal.classList.add('is-open');
        modalImg.setAttribute('src', LargeImgSrc);

        modalBtnClose.addEventListener('click', closeModalBtn);
        modalOverlay.addEventListener('click', closeModalOverlay);
        window.addEventListener('keydown', closeModalByEscape);
      }
    });
  }
});

function closeModal() {
  modal.classList.remove('is-open');
  modalImg.setAttribute('src', '');
}
function closeModalBtn() {
  closeModal();
  modalBtnClose.removeEventListener('click', closeModalBtn);
}
function closeModalOverlay() {
  closeModal();
  modalOverlay.removeEventListener('click', closeModalOverlay);
}
function closeModalByEscape(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
  window.removeEventListener('keydown', closeModalByEscape);
}
