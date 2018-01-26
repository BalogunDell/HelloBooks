require('dotenv').config();

const cloudinaryUrl = process.env.CLOUD_URL;
const cloudinaryPreset = process.env.CLOUD_KEY;
const requestHeader = 'application/x-www-form-urlencoded';

export {
  cloudinaryUrl,
  cloudinaryPreset,
  requestHeader
};
