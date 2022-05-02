import moment from 'moment'
import { toLocalCurrency } from 'utils/toLocalCurrency'
import { useState, useCallback } from 'react'
import { GrDocumentTxt } from 'react-icons/gr'
import Modal from 'components/layout/Modal'
import DisplayRichText from 'components/shared/DisplayRichText'

function PropertyPublishedRent({ rental }) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  return (
    <>
      <div className='w-full flex items-center gap-4 justify-between'>
        <span className='badge badge-success badge-lg font-semibold'>Published</span>
        <p className='font-semibold italic text-gray-500'>{moment(rental?.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
      </div>
      <div className='w-full flex flex-col items-start py-4'>
        <p>
          Furnished: <span className='font-semibold'>{rental?.furnished ? 'Yes' : 'No'}</span>
        </p>
        <p>
          Monthly Rent: <span className='font-semibold'>{toLocalCurrency('en-GB', rental?.price, 'GBP')}</span>
        </p>
        <p>
          Deposit: <span className='font-semibold'>{toLocalCurrency('en-GB', rental?.deposit, 'GBP')}</span>
        </p>
        <p>
          Contract: <span className='font-semibold'>{`${rental?.rental_type.charAt(0).toUpperCase()}${rental?.rental_type.slice(1)}`} Term</span>
        </p>
        <p>
          Available From: <span className='font-semibold'>{moment(rental?.available_from).format('Do MMM YYYY')}</span>
        </p>
        <div className='w-full flex items-center gap-1'>
          <p>
            Tenancy Information: <span className='font-semibold'>{rental?.tenancy_info?.blocks.length > 0 ? 'Included' : 'Not Included'}</span>
          </p>
          {rental.tenancy_info.blocks.length > 0 && (
            <>
              <button className='btn btn-link btn-primary flex gap-1 p-0 h-fit min-h-0' onClick={handleModalToggle}>
                <GrDocumentTxt className='w-4 h-4' />
                Read
              </button>
              <Modal isOpen={modalOpen} onClose={handleModalToggle} boxStyle='p-[15px] md:p-10 !max-w-4xl'>
                <h2 className='text-2xl lg:text-4xl font-semibold'>Tenancy Information</h2>
                <DisplayRichText
                  blocks={rental?.tenancy_info}
                  className='mt-6 mx-auto p-3 md:p-6 max-w-none border-gray-200 border-[1px] rounded-md shadow-md'
                />
              </Modal>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default PropertyPublishedRent
