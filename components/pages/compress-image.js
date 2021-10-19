import imageCompression from 'browser-image-compression';

const compressImage = async (imageUpload) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  if (imageUpload) {
    const upload = await imageCompression(imageUpload, options);
    return upload;
  }

  return false;
};

export default compressImage;
