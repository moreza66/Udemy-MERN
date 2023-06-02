const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, // This is the id of the user
    ref: 'user', // This refers to the user model
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    // Location is a string
    type: String,
  },
  status: {
    // Status is a string
    type: String,
    required: true,
  },
  skills: {
    // Skills is an array of strings
    type: [String],
    required: true,
  },
  bio: {
    // Bio is a string
    type: String,
  },
  githubusername: {
    // Github username is a string
    type: String,
  },
  experience: [
    // Experience is an array of objects
    {
      title: {
        // Title is a string
        type: String,
        required: true,
      },
      company: {
        // Company is a string
        type: String,
        required: true,
      },
      location: {
        // Location is a string
        type: String,
      },
      from: {
        // From is a date
        type: Date,
        required: true,
      },
      to: {
        // To is a date
        type: Date,
      },
      current: {
        // Current is a boolean
        type: Boolean,
        default: false,
      },
      description: {
        // Description is a string
        type: String,
      },
    },
  ],
  education: [
    // Education is an array of objects
    {
      school: {
        // School is a string
        type: String,
        required: true,
      },
      degree: {
        // Degree is a string
        type: String,
        required: true,
      },
      fieldofstudy: {
        // Field of study is a string
        type: String,
        required: true,
      },
      from: {
        // From is a date
        type: Date,
        required: true,
      },
      to: {
        // To is a date
        type: Date,
      },
      current: {
        // Current is a boolean
        type: Boolean,
        default: false,
      },
      description: {
        // Description is a string
        type: String,
      },
    },
  ],
  social: {
    // Social is an object
    youtube: {
      // Youtube is a string
      type: String,
    },
    twitter: {
      // Twitter is a string
      type: String,
    },
    facebook: {
      // Facebook is a string
      type: String,
    },
    linkedin: {
      // Linkedin is a string
      type: String,
    },
    instagram: {
      // Instagram is a string
      type: String,
    },
  },
  date: {
    // Date is a date
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
