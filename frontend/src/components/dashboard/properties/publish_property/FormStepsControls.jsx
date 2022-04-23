import React from 'react'

function FormStepsControls({ currentStep, steps, handleNext, handlePrev }) {
  return (
    <div className='flex gap-4 w-full justify-center'>
      {currentStep > 1 && (
        <button type='button' className='btn btn-primary text-lg' onClick={handlePrev}>
          Prev
        </button>
      )}
      {currentStep < steps.length && (
        <button type='button' className='btn btn-primary text-lg' onClick={handleNext}>
          Next
        </button>
      )}
      {currentStep === steps.length && (
        <button type='submit' className='btn btn-success btn-outline text-lg'>
          Publish
        </button>
      )}
    </div>
  )
}

export default FormStepsControls
