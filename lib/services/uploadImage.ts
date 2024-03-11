import { ID, storage } from '@/appwrite';

export const uploadImage = async (imageFile: File) => {
  if (!imageFile) return;

  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID!,
    ID.unique(),
    imageFile
  );

  return fileUploaded;
};
