// import API_KEY from '../api/apiKey';
import { load, save, remove } from './local-st-load-remove-save';
import trailer from './traile';

const galleryFilm = document.querySelector('.cards__list--home');
const modalEl = document.querySelector('.modal');

galleryFilm.addEventListener('click', onOpenModal);
let movie_id;


  // --------test-btn--------------
  const btnWatchEl = document.querySelector('.btn__watch');
  const btnQueueEl = document.querySelector('.btn__queue');

  btnWatchEl.addEventListener('click', onLibraruWatch);
  btnQueueEl.addEventListener('click', onLibraruQueue);

  // відпрацювання кнопки проглянуте
  function onLibraruWatch(ev) {
    const btnEl = ev.target;

    if (!load('watched')) {
      const firstLocalSt = save('watched', []);
    }

    if (btnEl.getAttribute('data-show') === 'true') {
      addWatchedLocalStorage(oneFilmById);
    }
    if (btnEl.getAttribute('data-show') === 'false') {
      removeFromWatchedList(movie_id);
    }

    changeTextBtnWatch(btnEl);
  }

  function onLibraruQueue(ev) {
    const btnEl = ev.target;

    if (!load('queue')) {
      const firstLocalSt = save('queue', []);
    }

    if (btnEl.getAttribute('data-show') === 'true') {
      addQueueLocalStorage(oneFilmById);
    }
    if (btnEl.getAttribute('data-show') === 'false') {
      removeFromQueueList(movie_id);
    }

    changeTextBtnQueue(btnEl);
  }
  // --------test-btn--------------

let arrayFilmsWatched = [];
let localWatchListJson = [];
let watchList = [];

function addWatchedLocalStorage(obj) {
  // перевірка, чи є вже ця картка в сховищі

  localWatchListJson = load('watched');

  if (localWatchListJson) {
    watchList = localWatchListJson;
  }

  let index1 = watchList.findIndex(film => film.id === Number(movie_id));
  if (index1 != -1) {
    return;
  }

  // перевірка, чи є вже ця картка в сховищі

  arrayFilmsWatched = localWatchListJson;

  arrayFilmsWatched.push(obj);

  localStorage.setItem('watched', JSON.stringify(arrayFilmsWatched));

  return arrayFilmsWatched;
}
function removeFromWatchedList(id) {
  console.log('удаляем из watched');

  localWatchListJson = load('watched');

  if (localWatchListJson) {
    watchList = localWatchListJson;
  }

  remove('watched');

  let index = watchList.findIndex(film => film.id === Number(movie_id));

  watchList.splice(index, 1);
  save('watched', watchList);
}

// ________ Add Remove QUEUE

let arrayFilmsQueue = [];
let localQueueListJson = [];
let queueList = [];

function addQueueLocalStorage(obj) {
  // перевірка, чи є вже ця картка в сховищі

  localQueueListJson = load('queue');

  if (localQueueListJson) {
    queueList = localQueueListJson;
  }

  let index1 = queueList.findIndex(film => film.id === Number(movie_id));
  if (index1 != -1) {
    return;
  }

  // перевірка, чи є вже ця картка в сховищі

  arrayFilmsQueue = localQueueListJson;

  arrayFilmsQueue.push(obj);

  localStorage.setItem('queue', JSON.stringify(arrayFilmsQueue));

  return arrayFilmsQueue;
}
function removeFromQueueList(id) {
  localQueueListJson = load('queue');

  if (localQueueListJson) {
    queueList = localQueueListJson;
  }

  remove('queue');

  let index = queueList.findIndex(film => film.id === Number(movie_id));

  queueList.splice(index, 1);
  save('queue', queueList);
}
// ________ Add Remove QUEUE

//  Ф-ції зміни тексту на кнопках
function changeTextBtnQueue(btnEl) {
  if (btnEl.getAttribute('data-show') === 'true') {
    btnEl.innerText = 'Remove from queue';
    btnEl.setAttribute('data-show', 'false');
  } else {
    btnEl.innerText = 'Add to queue';
    btnEl.setAttribute('data-show', 'true');
  }
}
function changeTextBtnWatch(btnEl) {
  if (btnEl.getAttribute('data-show') === 'true') {
    btnEl.innerText = 'Remove from watched';
    btnEl.setAttribute('data-show', 'false');
  } else {
    btnEl.innerText = 'Add to watched';
    btnEl.setAttribute('data-show', 'true');
  }
}

// Ф-ція рендеру кнопок модалки

function btnChangeWatch() {
  localWatchListJson = load('watched');

  if (localWatchListJson) {
    watchList = localWatchListJson;
  }

  let index = watchList.findIndex(film => film.id === Number(movie_id));
  // перевіряєм чи знайшло фільм, тру якщо Є ФІЛЬМ
  if (index != -1) {
    return '<button type="button" class="film__button btn__watch" data-id="${id}" data-show="false">Remove from watched</button>';
  } else {
    return '<button type="button" class="film__button btn__watch" data-id="${id}" data-show="true">Add to watched</button>';
  }
}
function btnChangeQueue() {
  localQueueListJson = load('queue');
  if (localQueueListJson) {
    queueList = localQueueListJson;
  }
  let index = queueList.findIndex(film => film.id === Number(movie_id));
  if (index != -1) {
    return '<button type="button" class="film__button btn__queue" data-id="${id}" data-show="false">Remove from queue</button>';
  } else {
    return '<button type="button" class="film__button btn__queue" data-id="${id}" data-show="true">Add to queue</button>';
  }
}

function murckupCard({
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  overview,
  genre_ids,
  name,
  id,
  backdrop_path,
}) {
  return (
    (modalEl.innerHTML = `
  <div class='modal__backdrop'
              style="background-image:linear-gradient(to right, rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)),
              ${
                backdrop_path
                  ? `url('https://image.tmdb.org/t/p/original/${backdrop_path}');`
                  : `url(/src/images/back-drop.jpg);`
              }
              background-size:cover; 
              background-position: center;">
  </div>
  <div class='modal__container'>
    <div class='film__image'>
    <div class="btn-id">
      <button data-id='${id}' class="btn-youtube">
    </div>
      <img
        class='image modal-movie__img'
        src='${setPosters(poster_path)}'
        alt='${title || name}'
        title=''
        width='336'
      />
      
    </div>
    <div class='film__information'>
      <div>
        <h2 class='film__title'>${title || name}</h2>
        <ul>
          <li class='film__item'>
            <p class='film__details'>Vote / Votes</p>
            <p class='film__info--uper'>
            <span class='film__rating--orange'>${vote_average.toFixed(1)}</span>
            <span class='film__rating--divider'> / </span>
            <span>${vote_count}</span>
          </p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Popularity</p>
            <p class='film__info--uper'>${popularity}</p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Original title</p>
            <p class='film__info--uper'>${original_title || name}</p>
          </li>
          <li class='film__item'>
            <p class='film__details'>Genre</p>
            <p class='film__about__text'>${genresList(genre_ids) || 'N/A'}
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h3 class='film__about__title'>About</h3>
        <p class='film__about__text'>${overview}
        </p>
      </div>
      <div class='film__button__wrapper'>${btnChangeWatch()}
        ${btnChangeQueue()}
      </div>
      <button
        type='button'
        class='close__button__modal'
        data-action='close-modal'
      >
       <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute"><path d="m8 8 14 14M8 22 22 8" stroke="#000" stroke-width="2"/></svg>
    </button>
    </div>
  </div>
  `),
    trailer.createTrailerLink(document.querySelectorAll('.btn-youtube'))
  );
}
