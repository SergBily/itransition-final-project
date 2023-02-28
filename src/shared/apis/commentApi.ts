import { AxiosResponse } from 'axios';
import { urls } from '../constants/urls';
import $api from '../http/http';
import CommentResponse from '../models/comment/commentResponse';

const getAllComents = async (itemId: string):
Promise<AxiosResponse<CommentResponse[]>> => $api.get(`${urls.COMMENTS_ITEM}/${itemId}`);

export default getAllComents;
