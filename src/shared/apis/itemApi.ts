import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import CommentResponse from '../models/comment/commentResponse';
import ItemPageRequest from '../models/itemPage/ItemPageRequest.model';
import ItemPageResponse from '../models/itemPage/itemPageResponse.model';
import ItemEditRequest from '../models/items/itemEditRequest.model';
import ItemsCollectionResponse from '../models/items/itemssCollectionResponse.model';
import ItemStructure from '../models/items/itemStructure.model';
import NewItemRequest from '../models/items/newItemRequest.model';
import CollectionResponse from '../models/newCollection/collectionResponse.model';
import { getCollection } from './collectionApi';
import getAllComents from './commentApi';

export const createNewItem = async (payload: NewItemRequest):
Promise<AxiosResponse<ItemStructure>> => $api.post(
  urls.NEW_ITEM,
  { ...payload },
);

export const editItemApi = async ({ itemId, payload }: ItemEditRequest):
Promise<AxiosResponse<string>> => $api.put(
  `${urls.EDIT_ITEM}/${itemId}`,
  { ...payload },
);

export const deleteItemsApi = async (items: string[]):
Promise<void> => {
  const requests = items.map((id) => $api.delete(`${urls.DELETE_ITEM}/${id}`));
  await Promise.all(requests);
};

export const getItemApi = async (itemId: string):
Promise<AxiosResponse<ItemStructure>> => $api.get(`${urls.ITEM}/${itemId}`);

export const getItemsCollectionApi = async (collectionId: string):
Promise<AxiosResponse<ItemStructure[]>> => $api.get(`${urls.ALL_ITEMS}/${collectionId}`);

export const getAllItemsCollectionApi = async (id: string):
Promise<ItemsCollectionResponse> => {
  const response = await Promise.all([getCollection(id), getItemsCollectionApi(id)]);
  const [collection, items] = response.map((n) => n.data);
  return { collection: collection as CollectionResponse, items: items as ItemStructure[] };
};

export const getItemDataApi = async (payload: ItemPageRequest):
Promise<ItemPageResponse> => {
  const vv = await Promise.all([
    getItemApi(payload.itemId),
    getCollection(payload.collectionId),
    getAllComents(payload.itemId)]);
  const [item, collection, comments] = vv.map((n) => n.data);
  return {
    item: item as ItemStructure,
    collection: collection as CollectionResponse,
    comments: comments as CommentResponse[],
  };
};

export default createNewItem;
