import { useEffect } from 'react'
import { useLocalStorage } from 'hooks/useStorage'
import { nanoid } from '@reduxjs/toolkit'
import { useSearchParams } from 'react-router-dom'
import RecentSearchLink from './RecentSearchLink'

const RecentSearch = () => {
  const [recentSearches, setRecentSearches] = useLocalStorage('recent_searches', [])
  const [searchParams] = useSearchParams()
  const location_present = searchParams.get('lng') && searchParams.get('lat') && searchParams.get('radius') ? true : false

  useEffect(() => {
    return () => {
      if (location_present) {
        setRecentSearches((prevState) => {
          const searchString = searchParams.toString()
          if (prevState.includes(searchString)) {
            return [...prevState.sort((a, b) => (a === searchString ? -1 : 1))]
          }
          if (prevState.length < 5) return [searchString, ...prevState]
          else return [searchString, ...prevState.slice(0, 4)]
        })
      }
    }
  }, [location_present, searchParams, setRecentSearches])

  if (recentSearches.length === 0) return null

  return (
    <nav className='col-span-1 flex flex-col gap-4 p-3 xl:p-5 shadow-custom rounded-lg bg-white'>
      <h3 className='text-2xl font-bold'>Your Recent Searches</h3>
      <ul className='flex flex-col'>
        {recentSearches.map((searchString) => (
          <li className='border-t py-2 first-of-type:border-t-0' key={nanoid()}>
            <RecentSearchLink searchString={searchString} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default RecentSearch
