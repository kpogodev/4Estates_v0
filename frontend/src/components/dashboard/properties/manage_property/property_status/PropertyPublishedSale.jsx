import moment from 'moment'
import { toLocalCurrency } from 'utils/toLocalCurrency'
import { useState, useCallback } from 'react'
import { GrDocumentTxt } from 'react-icons/gr'
import Modal from 'components/common/Modal'
import DisplayRichText from 'components/common/DisplayRichText'

function PropertyPublishedSale({ sale }) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev)
  }, [])

  return (
    <>
      <div className='w-full flex items-center gap-4 justify-between'>
        <span className='badge badge-success badge-lg font-semibold'>Published</span>
        <p className='font-semibold italic text-gray-500'>{moment(sale?.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
      </div>
      <div className='w-full flex flex-col items-start py-4'>
        <p>
          Price: <span className='font-semibold'>{toLocalCurrency('en-GB', sale?.price, 'GBP')}</span>
        </p>
        <div className='w-full flex items-center gap-1'>
          <p>
            Additional Information: <span className='font-semibold'>{sale?.additional_info?.blocks.length > 0 ? 'Included' : 'Not Included'}</span>
          </p>
          <button className='btn btn-link btn-primary flex gap-1 p-0 h-fit min-h-0' onClick={handleModalToggle}>
            <GrDocumentTxt className='w-4 h-4' />
            Read
          </button>
          <Modal isOpen={modalOpen} onClose={handleModalToggle} boxStyle='p-[15px] md:p-10 !max-w-4xl'>
            <h2 className='text-2xl lg:text-4xl font-semibold'>Additional Information</h2>
            <DisplayRichText blocks={sale?.additional_info} className='mt-6 mx-auto p-3 md:p-6 max-w-none border-gray-200 border-[1px] rounded-md shadow-md' />
          </Modal>
        </div>
      </div>
    </>
  )
}

export default PropertyPublishedSale
