import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import ProfilePanel from 'components/dashboard/profile/ProfilePanel'
import PropertiesPanel from 'components/dashboard/properties/my_properties/PropertiesPanel'
import { getMyProfile, selectProfile } from 'redux/profiles/profilesSlice'
import { getMyProperties, selectMyProperties } from 'redux/properties/propertiesSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from 'components/shared/Loading'

function Dashboard() {
  const { user } = useSelector((state) => state.auth)
  const myProperties = useSelector(selectMyProperties)
  const profile = useSelector(selectProfile)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyProfile())
  }, [dispatch])

  useEffect(() => {
    dispatch(
      getMyProperties({
        publisher: user._id,
      })
    )
  }, [user._id, dispatch])

  if (!myProperties || !profile || !user) return <Loading />

  return (
    <motion.div className='flex flex-col gap-5 xl:grid xl:grid-cols-3 lg:gap-10' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <ProfilePanel />
      <div className='flex flex-col gap-5 lg:gap-10 col-span-2'>
        <PropertiesPanel />
      </div>
    </motion.div>
  )
}

export default Dashboard
