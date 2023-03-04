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
import Tags from '../models/items/tags.module';
import CollectionResponse from '../models/newCollection/collectionResponse.model';
import { getCollectionApi } from './collectionApi';
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

export const updateVisitsItem = async (id: string):
Promise<AxiosResponse<void>> => $api.patch(`${urls.ITEM}/${id}`);

export const addLikeItem = async (payload: string[]):
Promise<AxiosResponse<ItemStructure>> => {
  const [id, userId] = payload;
  return $api.patch(`${urls.ADD_LIKE}/${id}`, { userId });
};

export const removeLikeItem = async (payload: string[]):
Promise<AxiosResponse<ItemStructure>> => {
  const [id, userId] = payload;
  return $api.patch(`${urls.REMOVE_LIKE}/${id}`, { userId });
};

export const getLastItemsApi = (): Promise<AxiosResponse<ItemStructure[]>> => $api.get(urls.LAST_ITEMS);

export const getAllItemsCollectionApi = async (id: string):
Promise<ItemsCollectionResponse> => {
  const response = await Promise.all([getCollectionApi(id), getItemsCollectionApi(id)]);
  const [collection, items] = response.map((n) => n.data);
  return { collection: collection as CollectionResponse, items: items as ItemStructure[] };
};

export const getItemDataApi = async (payload: ItemPageRequest):
Promise<ItemPageResponse> => {
  const vv = await Promise.all([
    getItemApi(payload.itemId),
    getCollectionApi(payload.collectionId),
    getAllComents(payload.itemId)]);
  const [item, collection, comments] = vv.map((n) => n.data);
  return {
    item: item as ItemStructure,
    collection: collection as CollectionResponse,
    comments: comments as CommentResponse[],
  };
};

export const getTagsApi = ():
Promise<AxiosResponse<Tags[]>> => $api.get(urls.TAGS_ITEM);

export default createNewItem;
