import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import CollectionRequest from '../models/newCollection/collectionRequest';
import CollectionResponse from '../models/newCollection/collectionResponse';
import { uploadImage } from './firebaseApi';

const createNewCollection = async (payload: CollectionRequest):
Promise<AxiosResponse<CollectionResponse>> => {
  const imageUrl: string = await uploadImage(payload.image);
  return $api.post(urls.NEWCOLLECTION, { ...payload, image: imageUrl });
};

export default createNewCollection;
