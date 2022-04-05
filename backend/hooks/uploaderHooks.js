import cloudinary from '../utils/cloudinary.js'

export const imageMultiUpload = async (data) => {
  const imageUploadPromises = data.map(async (item) => {
    return cloudinary.uploader.upload(item, { upload_preset: '4estates' })
  })

  const imageUploadResponses = await Promise.all(imageUploadPromises)

  const newImages = imageUploadResponses.map((response) => {
    return {
      cloudinary_id: response.public_id,
      width: response.width,
      height: response.height,
      format: response.format,
      secure_url: response.secure_url,
    }
  })

  return newImages
}

export const imageSingleUpload = async (data) => {
  const response = await cloudinary.uploader.upload(data, { upload_preset: '4estates' })
  return {
    cloudinary_id: response.public_id,
    width: response.width,
    height: response.height,
    format: response.format,
    secure_url: response.secure_url,
  }
}

export const imageDelete = async (data) => {
  await cloudinary.uploader.destroy(data.cloudinary_id, {
    invalidate: true,
  })
}

export const imagesDelete = async (data) => {
  const imageDeletePromises = data.map(async (item) => {
    return cloudinary.uploader.destroy(item.cloudinary_id, {
      invalidate: true,
    })
  })

  await Promise.all(imageDeletePromises)
}
