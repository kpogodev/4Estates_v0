import { useState, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

function GoogleMaps({ coordinates }) {
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
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={18}
          center={marker}
          onClick={onMapClick}
          onMouseMove={(e) => console.log(e)}
        >
          <Marker position={{ lat: marker.lat, lng: marker.lng }} />
        </GoogleMap>
      )}
    </>
  )
}

const libraries = ['places']
const mapContainerStyle = {
  width: '100%',
  height: '80vh',
}

export default GoogleMaps
