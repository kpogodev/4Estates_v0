import React from 'react'
import { useSelector } from 'react-redux'
import SearchInputLocation from './SearchBar'
function SearchBox() {
  const { googleServicesLoaded } = useSelector((state) => state.app)
  return (
    <div className='w-full max-w-3xl bg-base-100 p-6 mx-auto  mt-5 z-10 rounded-xl shadow-custom flex flex-col'>
      <h2 className='text-4xl text-center'>Make your move !</h2>
      <p className='text-2xl font-semibold text-gray-700 text-center mb-4 mt-1'>Search properties for sale and to rent in the UK</p>
      {googleServicesLoaded && <SearchInputLocation />}
    </div>
  )
}

export default SearchBox
