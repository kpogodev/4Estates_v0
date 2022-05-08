import React from 'react'

function StatusBadge({ status }) {
  if (status === 'ACTIVE') return <span className={`badge badge-success badge-lg font-semibold xl:text-xl text-white`}>Subscription status: {status}</span>
  if (status === 'SUSPENDED') return <span className='badge badge-accent badge-lg font-semibold xl:text-xl '>Subscription status: {status}</span>
  if (status === 'CANCELLED') return <span className='badge badge-danger badge-lg font-semibold xl:text-xl text-white'>Subscription status: {status}</span>
}

export default StatusBadge
