import mongoose from 'mongoose';

export const profilesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contact: {
      email: {
        type: String,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email address',
        ],
        unique: true,
      },
      address: String,
      phone: String,
      fax: String,
      socials: {
        facebook: String,
        linkedin: String,
      },
      website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Please use a valid URL starting with HTTP/HTTPS',
        ],
      },
      is_public: Boolean,
    },
    favorites: {
      sales: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Sale',
        },
      ],
      rents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Rent',
        },
      ],
    },
    sales: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sale' }],
    rents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rent' }],
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profilesSchema);
export default Profile;
