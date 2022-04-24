import { GET_LIST_SELLER, GET_SELLER_BY_ID } from 'redux/actions/action-type';

const initialState = {
  listSeller: [],
  sellerById: {},
};

const appReducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case GET_LIST_SELLER:
      return { ...state, listSeller: payload };
    case GET_SELLER_BY_ID:
      return { ...state, sellerById: payload };
    default:
      return state;
  }
};

export default appReducer;
