/**
 * Cloudinary configuration
 * Cloud name: dopo6gjfq
 * Upload preset: portfolioooo
 */

export const CLOUDINARY_CONFIG = {
  cloudName: "dopo6gjfq",
  uploadPreset: "portfolioooo",
};

/**
 * Generates a Cloudinary upload URL
 */
export const getCloudinaryUploadUrl = () => {
  return `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
};

/**
 * Helper to transform Cloudinary URLs for optimization
 */
export const getOptimizedCloudinaryUrl = (publicId: string, width = 800) => {
  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/w_${width},c_scale,q_auto,f_auto/${publicId}`;
};

/**
 * Uploads an image to Cloudinary using the provided preset
 */
export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);

  const response = await fetch(getCloudinaryUploadUrl(), {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  return response.json();
};

