import React from 'react'
import { MdGridView, MdOutlineList, MdSwipe } from 'react-icons/md'
import useMediaQuery from '../../hooks/useMediaQuery'

function ViewSwitcher({ listType, setListType }) {
  const handleChangeListType = (e) => setListType(e.target.closest('button').dataset.enum)

  const { matches } = useMediaQuery('(min-width: 768px)')

  return (
    <div className='btn-group absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      {matches && (
        <button
          className={`relative btn ${listType === 'tabel' && 'btn-active'}`}
          data-enum='tabel'
          onClick={handleChangeListType}
        >
          <MdOutlineList className='text-lg' />
          <div className='tooltip absolute w-full h-full top-0 left-0' data-tip='List'></div>
        </button>
      )}
      <button
        className={`btn relative ${listType === 'grid' && 'btn-active'}`}
        data-enum='grid'
        onClick={handleChangeListType}
      >
        <MdGridView className='text-lg' />
        <div className='tooltip absolute w-full h-full top-0 left-0' data-tip='Grid'></div>
      </button>
      <button
        className={`btn relative ${listType === 'swiper' && 'btn-active'}`}
        data-enum='swiper'
        onClick={handleChangeListType}
      >
        <MdSwipe className='text-lg' />
        <div className='tooltip absolute w-full h-full top-0 left-0' data-tip='Carousel'></div>
      </button>
    </div>
  )
}

export default ViewSwitcher
