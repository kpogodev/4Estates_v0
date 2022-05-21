import { useState, useEffect, forwardRef, useImperativeHandle, useId } from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import { updateProperty, selectProperty } from 'redux/properties/propertiesSlice'
import { BiInfoCircle } from 'react-icons/bi'
import SkeletonItem from 'components/shared/SkeletonItem'
import { motion } from 'framer-motion'
import { simpleFadeInOut } from 'utils/animationVariants'

function PropertyMap({ editable }, ref) {
  const animKey = useId()

  const property = useSelector(selectProperty)
  const { googleServicesLoaded } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  const [updatedMarker, setUpdatedMarker] = useState(null)
  const [tempMarker, setTempMarker] = useState(false)

  const InitialLocation = { lat: property.location.coordinates[0], lng: property.location.coordinates[1] }

  const onMarkerDragStart = (e) => {
    setTempMarker(true)
  }

  const onMarkerDragEnd = (e) => {
    setUpdatedMarker({ coordinates: [+e.latLng.lat(), +e.latLng.lng()] })
  }

  useEffect(() => {
    if (!editable) {
      setTempMarker(false)
      setUpdatedMarker(null)
    }
  }, [editable])

  useImperativeHandle(ref, () => ({
    handleSave: () => {
      updatedMarker &&
        dispatch(
          updateProperty({
            data: {
              location: {
                ...property.location,
                coordinates: [updatedMarker.coordinates[0], updatedMarker.coordinates[1]],
              },
            },
            id: property._id,
          })
        )
    },
  }))

  // If connecting to Google API failed
  if (!googleServicesLoaded) return <SkeletonItem className='w-full h-[400px] bg-[#ccc] animate-pulse shadow-lg' />

  return (
    <div className='w-full flex flex-col gap-4'>
      {editable && (
        <motion.p key={animKey} variants={simpleFadeInOut} className='flex gap-2 items-center text-info text-lg'>
          <BiInfoCircle />
          You can also manually adjust position of the pin (drag-and-drop)
        </motion.p>
      )}
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={18} center={InitialLocation}>
        <Marker
          position={!updatedMarker ? InitialLocation : { lat: updatedMarker.coordinates[0], lng: updatedMarker.coordinates[1] }}
          draggable={editable}
          onDragStart={onMarkerDragStart}
          onDragEnd={onMarkerDragEnd}
        />
        {tempMarker && <Marker position={InitialLocation} opacity={0.5} />}
      </GoogleMap>
    </div>
  )
}

const mapContainerStyle = {
  width: '100%',
  aspectRatio: '6/4',
  boxShadow: '1px 4px 16px rgba(0,0,0,0.1)',
}

export default forwardRef(PropertyMap)
