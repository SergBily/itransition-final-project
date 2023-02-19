import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import AllCollectionsResponse from '../models/allCollections/allCollectionsResponse';
import CollectionRequest from '../models/newCollection/collectionRequest';
import CollectionResponse from '../models/newCollection/collectionResponse';
import { uploadImage } from './firebaseApi';

export const createNewCollection = async (payload: CollectionRequest):
Promise<AxiosResponse<CollectionResponse>> => {
  const imageUrl: string = await uploadImage(payload.image);
  return $api.post(urls.NEWCOLLECTION, { ...payload, image: imageUrl });
};

export const getCollections = async (userId: string):
Promise<AxiosResponse<AllCollectionsResponse[]>> => $api.get(`${urls.COLLECTIONS}/${userId}`);
