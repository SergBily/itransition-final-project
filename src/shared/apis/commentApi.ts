import { AxiosResponse } from 'axios';
import $api from '../http/http';
import CommentResponse from '../models/comment/commentResponse';
import urls from '../constants/urls';

const getAllComents = async (itemId: string):
Promise<AxiosResponse<CommentResponse[]>> => $api.get(`${urls.COMMENTS_ITEM}/${itemId}`);

export default getAllComents;
