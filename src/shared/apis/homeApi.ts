import { AxiosResponse } from 'axios';
import $api from '../http/http';
import CollectionRequest from '../models/newCollection/collectionRequest.model';
import EditCollectionRequest from '../models/allCollections/editCollectionRequest';
import getDefaultImagesUrls from '../utils/getDefaultImagesUrls';
import { uploadImage } from './firebaseApi';
import DropImage from '../models/newCollection/imageFile.model';
import urls from '../constants/urls';
// eslint-disable-next-line import/no-cycle
import { AppApi } from '../../redux';
import { CollectionResponse, ItemStructure } from '../models';

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
    ? await uploadImage(payload.image as unknown as DropImage, payload.userId)
    : payload.image as string;
  return $api.put(`${urls.EDIT_COLLECTION}/${id}`, { ...payload, image: imageUrl });
};

export const getAllCollections = (userId: string):
Promise<AxiosResponse<CollectionResponse[]>> => $api.get(`${urls.COLLECTIONS}/${userId}`);

export const deleteCollectionApi = (id: string):
Promise<AxiosResponse> => $api.delete(`${urls.DELETE_COLLECTION}/${id}`);

export const getCollectionApi = (id: string):
Promise<AxiosResponse<CollectionResponse>> => $api.get(`${urls.COLLECTION}/${id}`);

export const homeEndpointsApi = AppApi.injectEndpoints({
  endpoints: (build) => ({
    largestCollection: build.query<CollectionResponse[], void>({
      query: () => ({
        url: urls.LARGEST_COLLECTIONS,
        method: 'get',
      }),
    }),
    lastItems: build.query<ItemStructure[], void>({
      query: () => ({
        url: urls.LAST_ITEMS,
        method: 'get',
      }),
    }),
  }),
});

const { useLargestCollectionQuery, useLastItemsQuery } = homeEndpointsApi;

export default { useLargestCollectionQuery, useLastItemsQuery };
