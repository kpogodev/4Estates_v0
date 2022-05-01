import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoAddCircle } from 'react-icons/io5'
import { getMyProperties } from 'context/properties/propertiesSlice'
import Spinner from 'components/shared/Spinner'
import ViewSwitcher from 'components/shared/ViewSwitcher'
import useMediaQuery from 'hooks/useMediaQuery'
import PropertiesGrid from './PropertiesGrid'
import PropertiesTabel from './PropertiesTabel'
import PropertiesSwiper from './PropertiesSwiper'

function PropertiesPanel() {
  const [listType, setListType] = useState('grid')
  const { myProperties, loading } = useSelector((state) => state.properties)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const { matches } = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    dispatch(
      getMyProperties({
        publisher: user._id,
      })
    )
  }, [user._id, dispatch])

  useEffect(() => {
    if (!matches && listType === 'tabel') {
      setListType('grid')
    }
  }, [matches, listType])

  const propertiesList = () => {
    switch (listType) {
      case 'grid':
        return <PropertiesGrid properties={myProperties} />
      case 'tabel':
        return matches && <PropertiesTabel properties={myProperties} />
      case 'swiper':
        return <PropertiesSwiper properties={myProperties} />
      default:
        break
    }
  }

  return (
    <div className='card w-full bg-base-100 shadow-lg col-span-2 [--padding-card:1rem] md:[--padding-card:2rem]'>
      <div className='card-body gap-12 pb-12'>
        <div className='flex justify-between items-center flex-wrap gap-4'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold'>My Properties</h2>
          <Link className='btn btn-outline btn-primary btn-sm lg:btn-md' to='/add-property'>
            <IoAddCircle className='text-xl lg:text-2xl' />
            <span className='font-semibold text-lg lg:text-xl'>Add New</span>
          </Link>
        </div>
        <div className='pt-10 pb-5 border-y-2 relative'>
          <ViewSwitcher listType={listType} setListType={setListType} />
          {loading ? <Spinner className='w-10 h-10' /> : propertiesList()}
        </div>
      </div>
    </div>
  )
}

export default PropertiesPanel
