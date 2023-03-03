import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import UserActionRequest from '../models/admin/blockRequest.model';
import User from '../models/admin/userAdmin.model';

export const getAllUsersApi = (): Promise<AxiosResponse<User[]>> => $api.get(urls.ALL_USERS);

export const deleteUsersApi = async (usersId: string[]): Promise<void> => {
  const promises = usersId.map((u) => $api.delete(`${urls.DELETE_USERS}/${u}`));
  await Promise.all(promises);
};

export const blockAndUnblockUsersApi = async ({ usersId, action }: UserActionRequest): Promise<void> => {
  const promises = usersId.map((u) => $api.patch(`${urls.STATUS_USERS}/${u}`, { status: action }));
  await Promise.all(promises);
};

export const changeRoleApi = async ({ usersId, action }: UserActionRequest): Promise<void> => {
  const promises = usersId.map((u) => $api.patch(`${urls.ROLE_USERS}/${u}`, { role: action }));
  await Promise.all(promises);
};
