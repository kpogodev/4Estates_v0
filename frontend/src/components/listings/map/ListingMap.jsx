import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GoogleMap, Marker, MarkerClusterer, Circle, InfoWindow } from '@react-google-maps/api'
import { useSelector } from 'react-redux'
import { selectRentsMarkers, selectRentByMarker, selectRentsIsLoading } from 'redux/rents/rentsSlice'
import SkeletonItem from 'components/shared/SkeletonItem'
import pin_icon from 'assets/pin-icon.svg'
import InfoWindowContent from './InfoWindowContent'
import ListingMapPlaceholder from './ListingMapPlaceholder'

const defualtCenter = { lat: 52.61234622571823, lng: -1.424856930199212 }
const defaultZoom = 5.5

function ListingMap() {
  const [zoneCenter, setZoneCenter] = useState(null)
  const [zoneRadius, setZoneRadius] = useState(null)
  const [selectedMarker, setSelectedMarker] = useState(null)

  const { googleServicesLoaded } = useSelector((state) => state.app)
  const markers = useSelector(selectRentsMarkers)
  const rentOfferByMarker = useSelector((state) => selectRentByMarker(state, selectedMarker?.id))
  const loadingMarkers = useSelector(selectRentsIsLoading)

  const [searchParams] = useSearchParams()
  const lat = +searchParams.get('lat')
  const lng = +searchParams.get('lng')
  const radius = +searchParams.get('radius')

  const mapRef = useRef(null)
  const circleRef = useRef(null)
  const infoWindowRef = useRef(null)

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

  // InfoWindow Loaded
  const onInfoWindowLoad = useCallback((infoWindow) => {
    infoWindowRef.current = infoWindow
  }, [])

  // Google Fit Bounds
  const onCircleChange = useCallback(() => {
    const bounds = circleRef?.current?.getBounds()
    if (bounds) {
      mapRef?.current?.fitBounds(bounds)
      mapRef?.current?.panToBounds(bounds)
    }
  }, [])

  // Set Zone Center
  const handleSetZone = useCallback((center, radius) => {
    setZoneCenter(center)
    setZoneRadius(radius * 1609)
  }, [])

  // Set Selected Marker
  const handleSetSelectedMarker = useCallback((marker) => {
    setSelectedMarker(marker)
  }, [])

  // Clear Selected Marker
  const handleClearSelectedMarker = useCallback(() => {
    setSelectedMarker(null)
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

  if (!googleServicesLoaded || (!markers.length && !loadingMarkers)) {
    return <ListingMapPlaceholder />
  }

  return (
    <div className='col-span-3 aspect-w-4 aspect-h-3 md:aspect-w-6 md:aspect-h-2'>
      <GoogleMap
        className='shadow-lg'
        mapContainerStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
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
          <MarkerClusterer
            imagePath='https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.png'
            defaultZoomOnClick
            gridSize={30}
          >
            {(clusterer) =>
              markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={{ lat: marker?.coordinates[0], lng: marker?.coordinates[1] }}
                  clusterer={clusterer}
                  icon={{
                    url: pin_icon,
                    scaledSize: {
                      width: 50,
                      height: 50,
                    },
                  }}
                  onClick={() => handleSetSelectedMarker(marker)}
                ></Marker>
              ))
            }
          </MarkerClusterer>
          {selectedMarker && rentOfferByMarker && (
            <InfoWindow
              position={{ lat: +selectedMarker.coordinates[0], lng: +selectedMarker.coordinates[1] }}
              options={{
                pixelOffset: {
                  width: 0,
                  height: -30,
                },
              }}
              onCloseClick={handleClearSelectedMarker}
              onLoad={onInfoWindowLoad}
              onUnmount={() => (infoWindowRef.current = null)}
            >
              <InfoWindowContent offer={rentOfferByMarker} infoWindow={infoWindowRef} clearSelectedMarker={handleClearSelectedMarker} />
            </InfoWindow>
          )}
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

export default ListingMap
