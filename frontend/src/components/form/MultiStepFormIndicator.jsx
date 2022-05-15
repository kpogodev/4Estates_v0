import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

function MultiStepFormIndicator({ step, titles, containerClassNames, clickable, onClick }) {
  const handleClick = (e) => {
    if (clickable) {
      onClick(+e.target.dataset.step)
    }
  }

  return (
    <ul className={`steps ${containerClassNames}`}>
      {titles.map((title, index) => (
        <li
          key={uuidv4()}
          className={`step !min-w-fit before:transition-all after:transition-all${step >= index + 1 ? ' step-primary' : ''}${
            clickable ? ' cursor-pointer' : ''
          }`}
          onClick={handleClick}
          data-step={index + 1}
        >
          <span className={`hidden sm:inline pointer-events-none${clickable ? ' link text-primary' : ''}`}>{`${title.charAt(0)?.toUpperCase()}${title.slice(
            1
          )}`}</span>
        </li>
      ))}
    </ul>
  )
}

MultiStepFormIndicator.propTypes = {
  step: PropTypes.number.isRequired,
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default MultiStepFormIndicator
