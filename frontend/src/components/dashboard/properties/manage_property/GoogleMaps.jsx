import { useState, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

function GoogleMaps({ coordinates, className }) {
  const [marker, setMarker] = useState({ lat: coordinates[0], lng: coordinates[1] })
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries,
  })

  const onMapClick = useCallback((e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    })
  }, [])

  return (
    <div className={className}>
      {isLoaded && (
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={18} center={marker} onClick={onMapClick}>
          <Marker position={{ lat: marker.lat, lng: marker.lng }} />
        </GoogleMap>
      )}
    </div>
  )
}

const libraries = ['places']
const mapContainerStyle = {
  width: '100%',
  height: '100%',
}

export default GoogleMaps
