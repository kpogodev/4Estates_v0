import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useForm from 'hooks/useForm'
import InputSelect from 'components/form/InputSelect'
import InputTextarea from 'components/form/InputTextarea'
import InputNumber from 'components/form/InputNumber'
import EditableActions from 'components/shared/EditableActions'
import NoneEditableActions from 'components/shared/NoneEditableActions'
import { updateProperty, selectProperty } from 'context/properties/propertiesSlice'

function PropertyDetails({ className }) {
  const [fieldsDisabled, setFieldsDisabled] = useState(false)
  const [editable, setEditable] = useState(false)

  const property = useSelector(selectProperty)
  const dispatch = useDispatch()

  // useForm Hook
  const { formData, isValid, handleChange, handleSubmit, handleReset } = useForm({
    initialFormData: {
      bathrooms: property?.details?.bathrooms ?? 0,
      bedrooms: property?.details?.bedrooms ?? 0,
      description: property.details?.description ?? '',
      key_features: property?.details?.key_features.join(', ') ?? '',
      size: property?.details?.size ?? 0,
      type: property?.type ?? '',
    },
    validations: {
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
    onSubmit: ({ description, key_features, type, bedrooms, bathrooms, size }) => {
      let newFormData = {
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
        dispatch(updateProperty({ data: newFormData, id: property._id }))
        setEditable(false)
      } else {
        dispatch(updateProperty({ data: newFormData, id: property._id }))
        setEditable(false)
      }
    },
  })

  //Disable some fileds based on property type
  useEffect(() => {
    formData.type === 'commercial' || formData.type === 'land' ? setFieldsDisabled(true) : setFieldsDisabled(false)
  }, [formData.type])

  return (
    <div className={`${className}`}>
      <form className='max-w-screen-lg mx-auto' onSubmit={handleSubmit} noValidate>
        <div className='flex justify-end gap-2 items-center pb-2'>
          <h3 className='text-xl xl:text-2xl font-semibold mr-auto'>Property Details</h3>
          {editable ? <EditableActions toggleEdit={setEditable} onCancel={handleReset} /> : <NoneEditableActions toggleEdit={setEditable} />}
        </div>
        <div className='form-control w-full'>
          <label className='label'>
            <span className='label-text'>Property Type:</span>
          </label>
          <InputSelect
            name='type'
            options={['detached', 'semi-detached', 'terraced', 'flat', 'apartment', 'bungalow', 'land', 'commercial']}
            value={formData.type}
            handleChange={handleChange}
            disabled={!editable}
          />
        </div>
        <div className='relative form-control w-full'>
          <label className='label'>
            <span className='label-text'>Description:</span>
          </label>
          <InputTextarea
            name='description'
            placeholder='Please provide some description...'
            value={formData.description}
            className='textarea textarea-bordered min-h-[200px] disabled:cursor-default'
            isValid={isValid.description}
            handleChange={handleChange}
            maxlength={3200}
            disabled={!editable}
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
            className='textarea textarea-bordered min-h-[120px] disabled:cursor-default'
            isValid={isValid.key_features}
            handleChange={handleChange}
            maxlength={1000}
            disabled={!editable}
          />
        </div>
        <div className='flex justify-start gap-5'>
          <div className='relative form-control max-w-[100px]'>
            <label className='label'>
              <span className='label-text'>Bedrooms:</span>
            </label>
            <InputNumber
              name='bedrooms'
              className='input input-bordered disabled:cursor-default'
              minValue={1}
              maxValue={100}
              handleChange={handleChange}
              value={+formData.bedrooms}
              isValid={isValid.bedrooms}
              disabled={fieldsDisabled || !editable}
            />
          </div>
          <div className='relative form-control max-w-[100px]'>
            <label className='label'>
              <span className='label-text'>Bathrooms:</span>
            </label>
            <InputNumber
              name='bathrooms'
              className='input input-bordered disabled:cursor-default'
              minValue={1}
              maxValue={100}
              handleChange={handleChange}
              value={+formData.bathrooms}
              isValid={isValid.bathrooms}
              disabled={fieldsDisabled || !editable}
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
              className='input input-bordered disabled:cursor-default'
              minValue={0}
              maxValue={99999999}
              handleChange={handleChange}
              isValid={isValid.size}
              value={+formData.size}
              disabled={!editable}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default PropertyDetails
