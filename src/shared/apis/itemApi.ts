import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import ItemStructure from '../models/items/itemStructure';
import NewItemRequest from '../models/items/newItemResponse';

export const createNewItem = async (payload: NewItemRequest):
Promise<AxiosResponse<ItemStructure>> => $api.post(
  urls.NEW_ITEM,
  { ...payload },
);

export default createNewItem;
