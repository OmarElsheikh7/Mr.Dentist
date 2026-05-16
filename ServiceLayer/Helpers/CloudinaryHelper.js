const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// 2. Configure Multer to use a root 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // This points to a folder named "uploads" at the root of your repository
    const uploadDir = path.join(__dirname, '../../uploads'); 
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadMiddleware = multer({ storage: storage });

// 3. Simple upload and cleanup function
const uploadToCloudinary = async (localFilePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
    });

    // Delete the temporary file from your local folder
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return result.secure_url;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw new Error("Cloudinary upload failed: " + error.message);
  }
};

module.exports = {
  uploadMiddleware,
  uploadToCloudinary
};