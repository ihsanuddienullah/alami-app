import { GET_LIST_SELLER, GET_SELLER_BY_ID } from './action-type';

export const getListSeller = (data) => ({ type: GET_LIST_SELLER, payload: data });
export const getSellerById = (data) => ({ type: GET_SELLER_BY_ID, payload: data });
