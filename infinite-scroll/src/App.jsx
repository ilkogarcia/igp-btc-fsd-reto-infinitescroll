// Import libraries
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

// Import hooks and custome hooks
import { useCharacter } from './hooks/useCharacter'

// Import components
import { Loading } from './components/Loading'
import { Card } from './components/Card'

export const App = () => {
  const { characters, error, fetchNextPage, hasNextPage, status } = useCharacter()

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
          characters && characters.results.map(character => (
              <Card key={character.id} character={character} />
          ))
        }
      </div>
    </InfiniteScroll>
  </div>
  )
}

export default App
