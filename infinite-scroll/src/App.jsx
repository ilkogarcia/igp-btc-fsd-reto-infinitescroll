import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Loading } from './components/Loading'
import { Card } from './components/Card'
import { useMemo } from 'react'

const RICKANDMORTY_API_URL = 'https://rickandmortyapi.com/api/character/'

export const App = () => {

  const fetchData = (page) => {
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

  const characters = useMemo(() => data?.pages.reduce((prev,page) => {
    return {
      info: page.info,
      results: [...prev.results, ...page.results]
    }
  }), [data])
  
  if (status === 'loading') return <Loading />
  if (status === 'error') return <h4>Ups!, {`${error} as string`}</h4>

return (
  <div className="App">
    <h1 className="title">Scroll infinito en React</h1>

    <InfiniteScroll
      dataLength={characters ? characters.results.length : 0}
      next={() => fetchNextPage()}
      hasMore={!!hasNextPage}
      loader={<Loading />}
    >
      <div className="grid-container">
        {
          characters && 
            characters.results.map(character => (
              <Card key={character.id} character={character} />
          ))
        }
      </div>
    </InfiniteScroll>
  </div>
  )
}

export default App
