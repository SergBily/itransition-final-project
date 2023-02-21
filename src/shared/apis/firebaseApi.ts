import {
  deleteObject,
  getDownloadURL, ref, StorageReference, uploadBytes,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import storageImages from '../../firebase';
import filePaths from '../constants/filePaths';
import localStorageKeys from '../constants/localStorageKeys';
import DropImage from '../models/newCollection/imageFile.model';

const userId = localStorage.getItem(localStorageKeys.USERId);

export const downloadUrl = async (r: StorageReference): Promise<string> => getDownloadURL(r);

export const uploadImage = async (image: DropImage): Promise<string> => {
  const imageRef = ref(storageImages, `${filePaths.COLLECTION}/${userId}/${uuidv4()}`);
  await uploadBytes(imageRef, image);
  return downloadUrl(imageRef);
};

export const deleteImage = (imageName: string): Promise<void> => {
  const imageRef = ref(storageImages, `${filePaths.COLLECTION}/${userId}/${imageName}`);
  return deleteObject(imageRef);
};
