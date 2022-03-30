import spinner from '../../assets/spinner.gif'

function Spinner({ className }) {
  return <img className={className} src={spinner} alt='loading...' />
}

export default Spinner
