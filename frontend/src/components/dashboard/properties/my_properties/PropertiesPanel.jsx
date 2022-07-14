import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoAddCircle } from 'react-icons/io5'
import { selectMyProperties } from 'redux/properties/propertiesSlice'
import ViewSwitcher from 'components/dashboard/properties/my_properties/ViewSwitcher'
import useMediaQuery from 'hooks/useMediaQuery'
import PropertiesGrid from './PropertiesGrid'
import PropertiesTabel from './PropertiesTabel'
import PropertiesSwiper from './PropertiesSwiper'

function PropertiesPanel() {
  const [listType, setListType] = useState('grid')

  const myProperties = useSelector(selectMyProperties)
  const { matches } = useMediaQuery('(min-width: 768px)')

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

  useEffect(() => {
    if (!matches && listType === 'tabel') {
      setListType('grid')
    }
  }, [matches, listType])

  return (
    <div className='card w-full bg-base-100 shadow-custom col-span-2 [--padding-card:1rem] md:[--padding-card:2rem]'>
      <div className='card-body gap-12 pb-12'>
        <div className='flex justify-between items-center flex-wrap gap-4'>
          <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold'>My Properties</h2>
          <Link className='btn btn-outline btn-primary btn-sm lg:btn-md' to='/user/add-property'>
            <IoAddCircle className='text-xl lg:text-2xl' />
            <span className='font-semibold text-lg lg:text-xl'>Add New</span>
          </Link>
        </div>
        {myProperties.length === 0 ? (
          <p className='text-xl font-semibold mx-auto py-2 px-5 bg-slate-100 rounded-lg shadow-md'>You do not have any properties to display yet</p>
        ) : (
          <div className='pt-10 pb-5 border-y-2 relative'>
            <ViewSwitcher listType={listType} setListType={setListType} />
            {propertiesList()}
          </div>
        )}
      </div>
    </div>
  )
}

export default PropertiesPanel
