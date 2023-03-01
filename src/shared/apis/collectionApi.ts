import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import AllCollectionsResponse from '../models/allCollections/allCollectionsResponse.model';
import CollectionRequest from '../models/newCollection/collectionRequest.model';
import CollectionResponse from '../models/newCollection/collectionResponse.model';
import EditCollectionRequest from '../models/allCollections/editCollectionRequest';
import getDefaultImagesUrls from '../utils/getDefaultImagesUrls';
import { uploadImage } from './firebaseApi';
import DropImage from '../models/newCollection/imageFile.model';

export const createNewCollection = async (payload: CollectionRequest):
Promise<AxiosResponse<CollectionResponse>> => {
  const imageUrl: string = payload.image
    ? await uploadImage(payload.image as DropImage, payload.userId)
    : getDefaultImagesUrls(payload.topic);
  return $api.post(urls.NEW_COLLECTION, { ...payload, image: imageUrl });
};

export const editCollectionApi = async ({ payload, id }: EditCollectionRequest):
Promise<AxiosResponse<CollectionResponse>> => {
  const imageUrl: string = typeof payload.image === 'object'
    ? await uploadImage(payload.image as DropImage, payload.userId)
    : payload.image;
  return $api.put(`${urls.EDIT_COLLECTION}/${id}`, { ...payload, image: imageUrl });
};

export const getAllCollections = (userId: string):
Promise<AxiosResponse<AllCollectionsResponse[]>> => $api.get(`${urls.COLLECTIONS}/${userId}`);

export const deleteCollectionApi = (id: string):
Promise<AxiosResponse> => $api.delete(`${urls.DELETE_COLLECTION}/${id}`);

export const getCollectionApi = (id: string):
Promise<AxiosResponse<CollectionResponse>> => $api.get(`${urls.COLLECTION}/${id}`);
