import PropTypes from 'prop-types'

function MultiStepFormIndicator({ step, titles, containerClassNames }) {
  return (
    <ul className={`steps ${containerClassNames}`}>
      {titles.map((title, index) => (
        <li className={`step before:transition-all after:transition-all${step >= index + 1 ? ' step-primary' : ''}`}>{title}</li>
      ))}
    </ul>
  )
}

MultiStepFormIndicator.propTypes = {
  step: PropTypes.number.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default MultiStepFormIndicator
