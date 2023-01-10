import './css/styles.css';
import _, { debounce } from 'lodash';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-infox');

const BASE_URL = 'https://restcountries.com/v3.1/name/';

input.addEventListener('input', debounce(inputText, 300));

function inputText(event) {
    event.preventDefault();
    if (event.target.value.trim() === '') {
        countryList.innerHTML = '';
        return
    }
    console.dir(event.target.value.trim());
    const country = event.target.value.trim();
    countryApi(country)
      .then(data => createMarkup(data))
      .catch(error => createError(error));
}

function countryApi(country) {
    return fetch(`${BASE_URL}${country}`).then(resp => {
      if (!resp.ok) {
          throw new Error(resp.statusText);
      }
      return resp.json();
    });
}

function createMarkup(data) {
    
if(data.length > 10){
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
} else if (data.length <= 10 && data.length >= 2) {
  const markup = data.map(dat => {
    return `<li class="js-country">
<img src="${dat.flags.svg}" alt="flag" width="40px">
      <p><b>${dat.name.official}</b></p>
      </li>`;
  }).join('');
  countryList.innerHTML = markup;
} else if (data.length === 1) {
  const markup = data
    .map(dat => {
      return `<li>
<img src="${dat.flags.svg}" alt="flag" width="100px">
      <p><b>Name</b>: ${dat.name.official}</p>
      <p><b>capital</b>: ${dat.capital}</p>
      <p><b>population</b>: ${dat.population}</p>
      <p><b>languages</b>: ${dat.languages}</p>
      </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
    } 

}


function createError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = '';
}

// ---------------

