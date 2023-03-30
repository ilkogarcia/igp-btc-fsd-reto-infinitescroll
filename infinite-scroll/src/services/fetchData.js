const RICKANDMORTY_API_URL = 'https://rickandmortyapi.com/api/character/'

export const fetchData = async (page) => {
  return fetch(`${RICKANDMORTY_API_URL}?page=${page}`).then((res) => res.json())
}

export default fetchData
