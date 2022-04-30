import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addProperty, resetError, resetSuccess } from 'context/properties/propertiesSlice'
import InputField from 'components/form/InputField'
import useForm from 'hooks/useForm'
import InputSelect from 'components/form/InputSelect'
import InputTextarea from 'components/form/InputTextarea'
import InputNumber from 'components/form/InputNumber'
import Spinner from 'components/shared/Spinner'
import { toast } from 'react-toastify'
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox'
import '@reach/combobox/styles.css'
import usePlacesAutocomplete from 'use-places-autocomplete'

function AddPropertyForm() {
  //Component States
  const [fieldsDisabled, setFieldsDisabled] = useState(false)
  const [showGoToBtn, setShowToBtn] = useState(false)

  //From Redxu State
  const dispatch = useDispatch()
  const { property, isLoading, isSuccess, isError, message } = useSelector((state) => state.properties)
  const { googleServicesLoaded } = useSelector((state) => state.app)

  // useForm Hook
  const { formData, isValid, handleChange, handleChangeCustom, handleSubmit } = useForm({
    initialFormData: {
      address: '',
      bathrooms: 0,
      bedrooms: 0,
      description: '',
      key_features: '',
      size: 0,
      type: 'house',
    },
    validations: {
      address: {
        isRequired: 'Please provide address',
      },
      bathrooms: {
        isRequired: !fieldsDisabled || 'Please specify number of bathrooms',
        validation: (bathrooms) => (bathrooms >= 1 && bathrooms <= 100 ? true : false),
        validationErrorMessage: 'Property should have between 1 and 100 bathrooms',
      },
      bedrooms: {
        isRequired: !fieldsDisabled || 'Please specify number of bedrooms',
        validation: (bedrooms) => (bedrooms >= 1 && bedrooms <= 100 ? true : false),
        validationErrorMessage: 'Property should have between 1 and 100 bedrooms',
      },
      description: {
        isRequired: 'Please provide some property description',
        validation: (description) => (description.length <= 3200 ? true : false),
        validationErrorMessage: 'Description is limited to 3200 characters',
      },
      key_features: {
        validation: (key_features) => (key_features.length <= 1000 ? true : false),
        validationErrorMessage: 'Key features are limited to 1000 characters',
      },
      size: {
        isRequired: 'Please specify size of the property',
        validation: (size) => (size > 0 && size <= 99999999 ? true : false),
        validationErrorMessage: 'Size of the property is limited to 99.999.999 square meters',
      },
    },
    onSubmit: ({ address, description, key_features, type, bedrooms, bathrooms, size }) => {
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
        delete newFormData.details.bedrooms
        delete newFormData.details.bathrooms
        dispatch(addProperty(newFormData))
      } else {
        dispatch(addProperty(newFormData))
      }
    },
  })

  // Places Auto Complete Hook
  const { suggestions, setValue, clearSuggestions } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: ['uk'],
      },
    },
    defaultValue: formData.address,
  })

  const onAddressChange = (e) => {
    setValue(e.target.value)
    handleChange(e)
  }

  const onAddressSelect = (address) => {
    setValue(address, false)
    handleChangeCustom('address', address)
    clearSuggestions()
  }

  //Disable some fileds based on property type
  useEffect(() => {
    formData.type === 'commercial' || formData.type === 'land' ? setFieldsDisabled(true) : setFieldsDisabled(false)
  }, [formData.type])

  useEffect(() => {
    if (isSuccess) {
      dispatch(resetSuccess())
      setShowToBtn(true)
      toast.success(message)
    }

    if (isError) {
      dispatch(resetError())
      toast.error(message)
    }
  }, [dispatch, isError, isSuccess, message])

  return (
    <form className='max-w-screen-lg mx-auto' onSubmit={handleSubmit} noValidate>
      <div className='grid md:grid-cols-2 lg:p-8 pt-0 gap-x-10 gap-y-4'>
        {/* col-1 */}
        <div className='flex flex-col gap-y-4'>
          <Combobox onSelect={onAddressSelect}>
            <div className='form-control m-w-[300px] w-full'>
              <label className='label'>
                <span className='label-text'>Address:</span>
                <span className='label-alt text-error text-sm italic'>Required *</span>
              </label>
              <ComboboxInput
                name='address'
                className={`input input-bordered w-full focus:border-info${isValid.address === false ? ' border-error' : ''}${
                  isValid.address === true ? ' border-success' : ''
                }`}
                value={formData.address}
                onChange={onAddressChange}
                placeholder='54 Slaidburn St, London SW10 0JW'
                autoComplete='off'
              />
            </div>
            <ComboboxPopover>
              <ComboboxList>
                {suggestions.status === 'OK' && suggestions.data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
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
              isValid={isValid.description}
              handleChange={handleChange}
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
                handleChange={handleChange}
                value={+formData.bedrooms}
                isValid={isValid.bedrooms}
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
                handleChange={handleChange}
                value={+formData.bathrooms}
                isValid={isValid.bathrooms}
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
                handleChange={handleChange}
                isValid={isValid.size}
                value={+formData.size}
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
              handleChange={handleChange}
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
              isValid={isValid.key_features}
              handleChange={handleChange}
              maxlength={1000}
            />
          </div>
          <div className='flex gap-5 ml-auto mt-auto'>
            {property?._id && showGoToBtn && (
              <Link to={`/manage-property/${property._id}`} className='btn btn-ghost'>
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
