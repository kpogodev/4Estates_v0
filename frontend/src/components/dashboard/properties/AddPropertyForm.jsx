import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProperty, resetError, resetSuccess } from '../../../features/properties/propertiesSlice'
import InputField from '../../form/InputField'
import { usePropertyFormsValidator } from '../../../hooks/usePropertyFormsValidator'
import InputSelect from '../../form/InputSelect'
import InputTextarea from '../../form/InputTextarea'
import InputNumber from '../../form/InputNumber'
import Spinner from '../../shared/Spinner'
import { toast } from 'react-toastify'


const initFormData = {
  address: '',
  type: '',
  description: '',
  key_features: '',
  bedrooms: 0,
  bathrooms: 0,
  size: 0,
}

function AddPropertyForm() {
  //Component States
  const [formData, setFormData] = useState(initFormData)
  const [fieldsDisabled, setFieldsDisabled] = useState(false)
  const [showGoToBtn, setShowToBtn] = useState(false)


  //From Redxu State
  const dispatch = useDispatch()
  const { property, isLoading, isSuccess, isError, message } = useSelector((state) => state.properties)

  //Disable some fileds based on property type
  useEffect(() => {
    formData.type === 'commercial' || formData.type === 'land' ? setFieldsDisabled(true) : setFieldsDisabled(false)
  }, [formData.type])

  useEffect(() => {
    if (isSuccess) {
      toast.success(message)
      dispatch(resetSuccess())
      setShowToBtn(true)
    }

    if (isError) {
      toast.error(message)
      dispatch(resetError())
    }
  }, [dispatch, isError, isSuccess, message])

  //Validation Hook
  const {
    addressValid,
    descriptionValid,
    keyFeaturesValid,
    bedroomsValid,
    bathroomsValid,
    sizeValid,
    validateAddress,
    validateDescription,
    validateKeyFeatures,
    validateBedrooms,
    validateBathrooms,
    validateSize,
    setValidityAll,
  } = usePropertyFormsValidator()

  //Submition
  const onSubmit = (e) => {
    e.preventDefault()

    const { address, description, key_features, type, bedrooms, bathrooms, size } = formData

    let newFormData = {
      address,
      type,
      details: {
        description,
        key_features: key_features.split(',').map((item) => item.trim()),
        bedrooms,
        bathrooms,
        size,
      },
    }

    if (fieldsDisabled) {
      const validAddress = validateAddress(address)
      const validDescription = validateDescription(description)
      const validSize = validateSize(size)
      const validKeyFeatures = validateKeyFeatures(key_features)

      if (validAddress && validDescription && validSize && validKeyFeatures) {
        delete newFormData.details.bedrooms
        delete newFormData.details.bathrooms

        dispatch(addProperty(newFormData))

        return setFormData(initFormData) && setValidityAll(null)
      }
    } else {
      const validAddress = validateAddress(address)
      const validDescription = validateDescription(description)
      const validBedrooms = validateBedrooms(bedrooms)
      const validBathrooms = validateBathrooms(bathrooms)
      const validSize = validateSize(size)
      const validKeyFeatures = validateKeyFeatures(key_features)

      if (validAddress && validDescription && validBedrooms && validBathrooms && validSize && validKeyFeatures) {
        dispatch(addProperty(newFormData))
        return setFormData(initFormData) && setValidityAll(null)
      }
    }

    return
  }

  return (
    <form className='max-w-screen-lg mx-auto' onSubmit={onSubmit} noValidate>
      <div className='grid md:grid-cols-2 lg:p-8 pt-0 gap-x-10 gap-y-4'>
        {/* col-1 */}
        <div className='flex flex-col gap-y-4'>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Address:</span>
              <span className='label-alt text-error text-sm italic'>Required *</span>
            </label>
            <InputField
              name='address'
              type='text'
              placeholder='54 Slaidburn St, London SW10 0JW'
              className='input input-bordered w-full'
              value={formData.address}
              setFormData={setFormData}
              validator={[addressValid, setValidityAll]}
              autoComplete='new-address'
            />
          </div>
          <div className='relative form-control w-full'>
            <label className='label'>
              <span className='label-text'>Description:</span>
              <span className='label-alt text-error text-sm italic'>Required *</span>
            </label>
            <InputTextarea
              name='description'
              placeholder='Please provide some description...'
              value={formData.description}
              className='textarea textarea-bordered min-h-[200px]'
              setFormData={setFormData}
              validator={[descriptionValid, setValidityAll]}
              maxlength={3200}
            />
          </div>
          <div className='flex justify-start gap-5'>
            <div className='relative form-control max-w-[100px]'>
              <label className='label'>
                <span className='label-text'>Bedrooms:</span>
              </label>
              <InputNumber
                name='bedrooms'
                className='input input-bordered'
                minValue={1}
                maxValue={100}
                setFormData={setFormData}
                value={formData.bedrooms}
                validator={[bedroomsValid, setValidityAll]}
                disabled={fieldsDisabled}
              />
            </div>
            <div className='relative form-control max-w-[100px]'>
              <label className='label'>
                <span className='label-text'>Bathrooms:</span>
              </label>
              <InputNumber
                name='bathrooms'
                className='input input-bordered'
                minValue={1}
                maxValue={100}
                setFormData={setFormData}
                value={formData.bathrooms}
                validator={[bathroomsValid, setValidityAll]}
                disabled={fieldsDisabled}
              />
            </div>
            <div className='relative form-control max-w-[100px]'>
              <label className='label'>
                <span className='label-text'>
                  Size (m<sup>2</sup>) :
                </span>
              </label>
              <InputNumber
                name='size'
                className='input input-bordered'
                minValue={0}
                maxValue={99999999}
                setFormData={setFormData}
                validator={[sizeValid, setValidityAll]}
                value={formData.size}
              />
            </div>
          </div>
        </div>
        {/* col-2 */}
        <div className='flex flex-col gap-y-4'>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Property Type:</span>
              <span className='label-alt text-error text-sm italic'>Required *</span>
            </label>
            <InputSelect
              name='type'
              options={['house', 'flat', 'apartament', 'bungalow', 'land', 'commercial']}
              value={formData.type}
              setFormData={setFormData}
            />
          </div>
          <div className='relative form-control w-full'>
            <label className='label'>
              <span className='label-text'>Key Features:</span>
              <span className='label-alt text-primary italic'>Separate with comma</span>
            </label>
            <InputTextarea
              name='key_features'
              placeholder='Large Garden, Close to local amenities, etc.'
              value={formData.key_features}
              className='textarea textarea-bordered min-h-[120px]'
              setFormData={setFormData}
              validator={[keyFeaturesValid, setValidityAll]}
              maxlength={1000}
            />
          </div>
          <div className='flex gap-5 ml-auto mt-auto'>
            {property?._id && showGoToBtn && (
              <Link to={`/my-property/${property._id}`} className='btn btn-ghost'>
                Go To Property
              </Link>
            )}
            <button type='submit' className='btn btn-primary ml-auto mt-auto'>
              Add Property {isLoading && <Spinner className={'w-4 h-h4'} />}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddPropertyForm
