import './css/styles.css';

import _, { debounce } from 'lodash';
import Notiflix from 'notiflix';

import { fetchCountries } from './js/fetch';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(inputText, DEBOUNCE_DELAY));

function inputText(event) {
  event.preventDefault();
  const country = event.target.value.trim();

  if (country === '') {
    countryList.innerHTML = '';
    return;
  }

  fetchCountries(country)
    .then(data => createMarkup(data))
    .catch(error => createError(error));
}

function createMarkup(data) {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length <= 10 && data.length >= 2) {
    const markup = data
      .map(dat => {
        return `<li class="js-country">
            <img src="${dat.flags.svg}" alt="flag" width="40px">
            <p><b>${dat.name.official}</b></p>
            </li>`;
      })
      .join('');
    countryList.innerHTML = markup;
    countryInfo.innerHTML = '';
  }
  else if (data.length === 1) {
      const markup = data.map(dat => {
          return `
            <img src="${dat.flags.svg}" alt="flag" width="100px">
            <p><b>Name</b>: ${dat.name.official}</p>
            <p><b>capital</b>: ${dat.capital}</p>
            <p><b>population</b>: ${dat.population}</p>
            <p><b>languages</b>: ${Object.values(dat.languages)}</p>`;
        })
        .join('');
    countryList.innerHTML = '';
    countryInfo.innerHTML = markup;
    }
}

function createError(error) {
  Notiflix.Notify.failure(
    `Oops, there is no country with that name ERROR ${error}`
  );
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

