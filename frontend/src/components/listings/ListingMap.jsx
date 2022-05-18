import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GoogleMap, Marker, MarkerClusterer, Circle } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import SkeletonItem from 'components/shared/SkeletonItem'
import pin_icon from 'assets/pin-icon.svg'

const defualtCenter = { lat: 52.61234622571823, lng: -1.424856930199212 }
const defaultZoom = 5.5

function ListingMap({data}) {
  const [markers, setMarkers] = useState([])
  const [zoneCenter, setZoneCenter] = useState()
  const [zoneRadius, setZoneRadius] = useState()

  
  const [searchParams] = useSearchParams()
  const lat = +searchParams.get('lat')
  const lng = +searchParams.get('lng')
  const radius = +searchParams.get('radius')

  const { googleServicesLoaded } = useSelector((state) => state.app)
  const mapRef = useRef(null)
  const circleRef = useRef(null)

  // Google Maps Loaded
  const onLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  // Circle Loaded
  const onCircleLoad = useCallback((circle) => {
    circleRef.current = circle
    mapRef?.current?.fitBounds(circle?.getBounds())
    mapRef?.current?.panToBounds(circle?.getBounds())
  }, [])

  // Google Fit Bounds
  const onCircleChange = useCallback(() => {
    const bounds = circleRef?.current?.getBounds()
    if (bounds) {
      mapRef?.current?.fitBounds(bounds)
      mapRef?.current?.panToBounds(bounds)
    }
  }, [])

  // Set Markers
  const handleSetMarkers = useCallback(() => {
    setMarkers(data.map((item) => ({ offer_id: item._id, coordinates: item.property.location.coordinates })))
  }, [data])

  // Set Zone Center
  const handleSetZone = useCallback((center, radius) => {
    setZoneCenter(center)
    setZoneRadius(radius * 1609)
  }, [])

  useEffect(() => {
    if (lat && lng && radius) {
      handleSetZone({ lat, lng }, radius)
      mapRef.current?.panTo({ lat, lng })
    } else {
      handleSetZone(defualtCenter, null)
      mapRef?.current?.panTo(defualtCenter)
      mapRef?.current?.setZoom(defaultZoom)
    }
  }, [handleSetZone, lat, lng, radius])

  useEffect(() => {
    handleSetMarkers()
  }, [handleSetMarkers])

  if (!googleServicesLoaded) {
    return <SkeletonItem className='w-full h-[400px] bg-[#ccc] animate-pulse shadow-lg mb-10' />
  }

  return (
    <div className='col-span-2'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={defaultZoom}
        onLoad={onLoad}
        center={defualtCenter}
        options={{
          mapId: '7a9d2899aa99bae5',
          disableDefaultUI: true,
          zoomControl: true,
          fullscreenControl: true,
        }}
      >
        <>
          <MarkerClusterer imagePath='https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.png'>
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
          {zoneCenter && zoneRadius && (
            <Circle
              center={zoneCenter}
              radius={zoneRadius}
              options={{
                strokeColor: '#185ADB',
                strokeOpacity: 0.3,
                strokeWeight: 2,
                clickable: false,
                fillColor: '#185ADB',
                fillOpacity: 0.1,
                visible: true,
                draggable: false,
                editable: false,
              }}
              onCenterChanged={onCircleChange}
              onRadiusChanged={onCircleChange}
              onLoad={onCircleLoad}
            />
          )}
        </>
      </GoogleMap>
    </div>
  )
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '350px',
}

export default ListingMap
