import axios from 'axios';
import * as fs from 'fs';

const CLOUDINARY_CLOUD_NAME = 'dopo6gjfq';

async function checkImage(publicId: string) {
  const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/v1/${publicId}.png`;
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

async function main() {
  const commonIds = ['sample', 'cld-sample', 'cld-sample-2', 'cld-sample-3', 'cld-sample-4', 'cld-sample-5', 'warehouse-copilot', 'factory-copilot', 'ai-assistant', 'atomic-dreamscape'];
  for (const id of commonIds) {
    const exists = await checkImage(id);
    console.log(`ID: ${id}, Exists: ${exists}`);
  }
}

main();