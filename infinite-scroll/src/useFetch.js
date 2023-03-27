import { useState, useEffect } from "react"

// Fetch data With loading and error
export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => setError(error))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}

export default useFetch
