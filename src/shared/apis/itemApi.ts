import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import ItemEditRequest from '../models/items/itemEditRequest.model';
import ItemStructure from '../models/items/itemStructure.model';
import NewItemRequest from '../models/items/newItemRequest.model';

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

export default createNewItem;
