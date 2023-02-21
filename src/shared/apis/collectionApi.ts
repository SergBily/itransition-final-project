import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import AllCollectionsResponse from '../models/allCollections/allCollectionsResponse';
import CollectionRequest from '../models/newCollection/collectionRequest';
import CollectionResponse from '../models/newCollection/collectionResponse';
import { uploadImage } from './firebaseApi';

export const createNewCollection = async (payload: CollectionRequest):
Promise<AxiosResponse<CollectionResponse>> => {
  const imageUrl: string = payload.image
    ? await uploadImage(payload.image, payload.userId) : '';
  return $api.post(urls.NEW_COLLECTION, { ...payload, image: imageUrl });
};

export const getCollections = (userId: string):
Promise<AxiosResponse<AllCollectionsResponse[]>> => $api.get(`${urls.COLLECTIONS}/${userId}`);

export const deleteCollectionApi = async (id: string):
Promise<AxiosResponse> => $api.delete(`${urls.DELETE_COLLECTION}/${id}`);
