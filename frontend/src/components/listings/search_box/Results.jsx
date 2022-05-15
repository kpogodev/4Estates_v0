import { useSelector } from 'react-redux'

function Results() {
  const { rents } = useSelector((state) => state.rents)
  return <p className='font-semibold text-xl mt-auto'>Results meeting given criteria: {rents?.length}</p>
}

export default Results
