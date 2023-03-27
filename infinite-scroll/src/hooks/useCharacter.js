import { useMemo } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useCharacter = () => {
  const fetchData = (page) => {
    const RICKANDMORTY_API_URL = 'https://rickandmortyapi.com/api/character/'
    const promise = fetch(`${RICKANDMORTY_API_URL}?page=${page}`).then((res) => res.json())
    return promise
  }

  const { data, error, fetchNextPage, status, hasNextPage } = useInfiniteQuery(
    ['characters'],
    ({ pageParam = 1 }) => fetchData(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const previousPage = lastPage.info.prev ? +lastPage.info.prev.split('=')[1] : 0
        const currentPage = previousPage + 1
        if (currentPage === lastPage.info.pages) return false
        return currentPage + 1
      }
    }
  )

  const characters = useMemo(() => data?.pages.reduce((prev, page) => {
    return {
      info: page.info,
      results: [...prev.results, ...page.results]
    }
  }), [data])

  return {
    error, fetchNextPage, status, hasNextPage, characters
  }
}

export default useCharacter
