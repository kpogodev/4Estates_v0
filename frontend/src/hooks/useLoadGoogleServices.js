import { useEffect } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { googleServicesLoaded } from '../features/app/appSlice'
import { useDispatch } from 'react-redux'

const libraries = ['places']

const useLoadGoogleServices = () => {
  //Load Google Services
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  })

  const dispatch = useDispatch()

  console.log({ isLoaded, loadError })
  useEffect(() => {
    if (isLoaded && !loadError) {
      dispatch(googleServicesLoaded())
    }
  }, [isLoaded, loadError, dispatch])
}

export default useLoadGoogleServices
