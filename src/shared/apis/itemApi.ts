import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import ItemStructure from '../models/items/itemStructure.model';
import NewItemRequest from '../models/items/newItemRequest.model';

export const createNewItem = async (payload: NewItemRequest):
Promise<AxiosResponse<ItemStructure>> => $api.post(
  urls.NEW_ITEM,
  { ...payload },
);

export const deleteItemsApi = async (items: string[]):
Promise<void> => {
  const requests = items.map((id) => $api.delete(`${urls.DELETE_ITEM}/${id}`));
  await Promise.all(requests);
};

export default createNewItem;
