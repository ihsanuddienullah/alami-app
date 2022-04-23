import Swal from 'sweetalert2';
import baseURL from './baseUrl';

export const searchProductByKeyword = async (keyword) => {
  const result = await baseURL.get(`/searchProductByKeyword?keyword=${keyword}`)
    .then((response) => response)
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.message}`,
      });
    });
  return result;
};

export const addSeller = async (nama, kota) => {
  const result = await baseURL.post('/addSeller', { nama, kota })
    .then((response) => response).catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.message}`,
      });
    });
  return result;
};
