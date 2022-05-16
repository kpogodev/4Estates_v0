import { useSelector } from 'react-redux'

function Results() {
  const { rents } = useSelector((state) => state.rents)
  return <p className='font-medium text-xl mt-auto text-center lg:text-left'>There is <span className='font-bold'>{rents?.length}</span> results meeting given criteria.</p>
}

export default Results
