const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: process.env.cloudinary_cloud_name, 
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_api_secret 
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'oktub',
       // allowedFormats:['png','jpeg','jpg'],
      format: async (req, file) => 'jpg',// supports promises as well
      public_id: (req, file) => 'computed-filename-using-request',
    },
  });


module.exports = {
    cloudinary,
    storage
  }




