const BASE_URL = 'https://restcountries.com/v3.1';
const PATH = 'name';

export function fetchCountries(country) {
  return fetch(`${BASE_URL}/${PATH}/${country}`)
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    })
    .catch(error => createError(error));
}
