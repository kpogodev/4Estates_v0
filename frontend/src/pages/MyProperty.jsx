import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProperty } from '../features/properties/propertiesSlice'
import GoogleMaps from '../components/dashboard/properties/GoogleMaps'

function MyProperty() {
  const { myProperty, isLoading } = useSelector((state) => state.properties)
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => {
    dispatch(getProperty(params.id))
  }, [dispatch, params.id])

  return <>{myProperty && <GoogleMaps coordinates={myProperty?.location?.coordinates} />}</>
}

export default MyProperty
