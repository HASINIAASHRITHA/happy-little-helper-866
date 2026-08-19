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
 * 
 * Supports both full Cloudinary URLs and just public IDs
 */
export const getOptimizedCloudinaryUrl = (source: string, width = 800) => {
  if (!source) return '';
  
  // If it's already a Cloudinary URL, we can inject transformations
  if (source.includes('res.cloudinary.com')) {
    const parts = source.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/w_${width},c_scale,q_auto,f_auto/${parts[1]}`;
    }
  }
  
  // If it's just a public ID or a path
  if (!source.startsWith('http')) {
    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/w_${width},c_scale,q_auto,f_auto/${source}`;
  }
  
  // Fallback for non-Cloudinary external URLs (no optimization)
  return source;
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
