import { motion } from 'framer-motion'
import { pageTransition } from 'utils/animationVariants'
import ProfilePanel from 'components/dashboard/profile/ProfilePanel'
import PropertiesPanel from 'components/dashboard/properties/my_properties/PropertiesPanel'
import { getMyProfile, selectProfile } from 'redux/profiles/profilesSlice'
import { getMyProperties, selectMyProperties } from 'redux/properties/propertiesSlice'
import { selectUser } from 'redux/auth/authSlice'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from 'components/common/Loading'

function Dashboard() {
  const user = useSelector(selectUser)
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
    <motion.div className='container flex flex-col mx-auto py-5 md:py-12 px-3' variants={pageTransition} initial='hidden' animate='visible' exit='exit'>
      <div className='flex flex-col gap-5 xl:grid xl:grid-cols-3 xl:items-start lg:gap-10'>
        <ProfilePanel />
        <div className='flex flex-col gap-5 lg:gap-10 col-span-2'>
          <PropertiesPanel />
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard
