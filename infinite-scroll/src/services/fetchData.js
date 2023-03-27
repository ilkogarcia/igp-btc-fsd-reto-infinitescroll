const RICKANDMORTY_API_URL = 'https://rickandmortyapi.com/api/character/'

export const fetchData = async (page) => {
  const data = await fetch(`${RICKANDMORTY_API_URL}?page=${page}`).then((res) => res.json())
  return data
}

export default fetchData
