import { useState, useEffect, useRef, useCallback } from 'react'
import { GoogleMap, Marker, MarkerClusterer, Circle } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import SkeletonItem from 'components/shared/SkeletonItem'
import { motion } from 'framer-motion'
import { simpleFadeInOut } from 'utils/animationVariants'
import pin_icon from 'assets/pin-icon.svg'

function ListingMap({ data, zone: { center, radius } }) {
  const [markers, setMarkers] = useState([])
  const [zoneCenter, setZoneCenter] = useState(null)
  const [zoneRadius, setZoneRadius] = useState(null)

  const mapRef = useRef(null)
  const { googleServicesLoaded } = useSelector((state) => state.app)

  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const handleSetMarkers = useCallback(() => {
    setMarkers(data.map((item) => ({ offer_id: item._id, coordinates: item.property.location.coordinates })))
  }, [data])

  const handleSetZone = useCallback(() => {
    setZoneCenter(center)
    setZoneRadius(radius * 1609)
  }, [center, radius])

  useEffect(() => {
    handleSetMarkers()
    if (center && radius) {
      handleSetZone()
    }
  }, [handleSetMarkers, handleSetZone])

  if (!googleServicesLoaded) return <SkeletonItem className='w-full h-[400px] bg-[#ccc] animate-pulse shadow-lg' />
  return (
    <div className='mb-10 border-4 border-gray-200 shadow-inner'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={{ lat: 53.049499, lng: -0.329219 }}
        options={{
          mapId: '7a9d2899aa99bae5',
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
        }}
        onLoad={onLoad}
      >
        <>
          <MarkerClusterer
            imagePath='https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.png'
            onLoad={(data) => console.log(data)}
          >
            {(clusterer) =>
              markers.map((marker) => (
                <Marker
                  key={marker.offer_id}
                  position={{ lat: marker?.coordinates[0], lng: marker?.coordinates[1] }}
                  clusterer={clusterer}
                  icon={{
                    url: pin_icon,
                    scaledSize: {
                      width: 50,
                      height: 50,
                    },
                  }}
                />
              ))
            }
          </MarkerClusterer>
          {zoneCenter && zoneRadius && <Circle center={zoneCenter} radius={zoneRadius} />}
        </>
      </GoogleMap>
    </div>
  )
}

const mapContainerStyle = {
  width: '100%',
  aspectRatio: '3/1',
}

export default ListingMap
