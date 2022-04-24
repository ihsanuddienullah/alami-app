import Swal from 'sweetalert2';
import baseURL from './baseUrl';

export const searchProductByKeyword = (keyword = 'a') => baseURL.get(`/searchProductByKeyword?keyword=${keyword}`)
  .then((response) => response)
  .catch((err) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${err.message}`,
    });
  });

export const addSeller = (nama, kota) => baseURL.post('/addSeller', { nama, kota })
  .then((response) => response.data)
  .catch((err) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${err.message}`,
    });
  });

export const addProduct = (sellerId, nama, satuan, hargaSatuan, deskripsi) => {
  const bodyJson = {
    sellerId,
    nama,
    satuan,
    hargaSatuan,
    deskripsi,
  };

  return baseURL.post('/addProduct', bodyJson)
    .then((response) => response.data)
    .catch((err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.message}`,
      });
    });
};

export const listProductBySellerId = (id) => baseURL.get(`/listProductBySellerId?seller_id=${id}`)
  .then((response) => response)
  .catch((err) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${err.message}`,
    });
  });
