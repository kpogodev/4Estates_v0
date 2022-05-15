import { useEffect } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import { googleServicesLoaded } from '../context/app/appSlice'
import { useDispatch } from 'react-redux'

const libraries = ['places']

const useLoadGoogleServices = () => {
  //Load Google Services
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoaded) {
      dispatch(googleServicesLoaded())
    }
  }, [isLoaded, dispatch])
}

export default useLoadGoogleServices
