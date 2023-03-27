const RICKANDMORTY_API_URL = 'https://rickandmortyapi.com/api/character/'

export const fetchData = (page) => {
  const promise = fetch(`${RICKANDMORTY_API_URL}?page=${page}`)
    .then((res) => res.json())
  return promise
}

export default fetchData
