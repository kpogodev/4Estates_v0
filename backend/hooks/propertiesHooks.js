import { propertiesSchema } from '../models/propertiesModel.js'
import geocoder from '../utils/geocoder.js'

export const useSetLocation = () => {
  // Generate location detail pre adding new property
  propertiesSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address)

    this.location = {
      type: 'Point',
      coordinates: [loc[0].latitude, loc[0].longitude],
      formatted_address: loc[0].formattedAddress,
      street: loc[0].streetName,
      city: loc[0].city,
      postcode: loc[0].zipcode,
      neighborhood: loc[0].extra.neighborhood ? loc[0].extra.neighborhood : undefined,
      county: loc[0].administrativeLevels.level2long || loc[0].administrativeLevels.level1long,
      country: loc[0].country,
    }
    next()
  })

  //Generate location details pre update if address has changed
  propertiesSchema.pre('findOneAndUpdate', async function (next) {
    if (this._update.address) {
      const loc = await geocoder.geocode(this._update.address)

      this.set({
        location: {
          type: 'Point',
          coordinates: [loc[0].latitude, loc[0].longitude],
          formatted_address: loc[0].formattedAddress,
          street: loc[0].streetName,
          city: loc[0].city,
          postcode: loc[0].zipcode,
          neighborhood: loc[0].extra.neighborhood ? loc[0].extra.neighborhood : undefined,
          county: loc[0].administrativeLevels.level2long || loc[0].administrativeLevels.level1long,
          country: loc[0].country,
        },
      })
    }

    next()
  })
}
