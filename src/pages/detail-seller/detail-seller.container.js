import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ContainerPage, ButtonStyled } from 'components';
import {
  addProduct, searchProductByKeyword, listProductBySellerId,
} from 'services/api';
import {
  Table, Column, HeaderCell, Cell,
} from 'rsuite-table';
import { useSelector } from 'react-redux';

const DetailSeller = () => {
  const [addProductFormValue, setAddProductFormValue] = useState({
    sellerId: 0, nama: '', satuan: '', hargaSatuan: 0, deskripsi: '',
  });
  const [newProduct, setNewProduct] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dataProduk, setDataProduk] = useState({});
  const [showAddSellerForm, setShowAddSellerForm] = useState(false);

  const data = useSelector((state) => state);

  useEffect(() => {
    const fetchApi = async () => {
      await listProductBySellerId(data?.id)
        .then((res) => {
          if (res.data.status === 'Error') {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${res.data.message}`,
            });
          } else {
            setDataProduk(res.data);
          }
        });
    };
    fetchApi();
  }, [newProduct]);

  const changeValue = (label, e) => {
    if (label === 'nama') {
      setAddProductFormValue({ ...addProductFormValue, nama: e.target.value });
    } else if (label === 'satuan') {
      setAddProductFormValue({ ...addProductFormValue, satuan: e.target.value });
    } else if (label === 'hargaSatuan') {
      setAddProductFormValue({ ...addProductFormValue, hargaSatuan: e.target.value });
    } else {
      setAddProductFormValue({ ...addProductFormValue, deskripsi: e.target.value });
    }
  };

  const submitAddProduct = async (e) => {
    e.preventDefault();
    await addProduct(
      data?.id,
      addProductFormValue.nama,
      addProductFormValue.satuan,
      addProductFormValue.hargaSatuan,
      addProductFormValue.deskripsi,
    )
      .then((res) => {
        if (res.data.status === 'Error') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${res.data.message}`,
          });
        } else {
          setNewProduct(res.data);
        }
      });
    await setAddProductFormValue({
      sellerId: 0, nama: '', satuan: '', hargaSatuan: 0, deskripsi: '',
    });
  };

  const changeSearch = (e) => {
    e.preventDefault();
    setSearchKeyword(e.target.value);
  };

  const searchProduk = async () => {
    await searchProductByKeyword(searchKeyword)
      .then((res) => {
        if (res.data.status === 'Error') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${res.data.message}`,
          });
        } else {
          setDataProduk(res.data);
        }
      });
  };

  return (
    <div className="home-page">
      <ContainerPage>
        <div className="add-seller-btn">
          <ButtonStyled text="Tambah Produk" type="button" onClick={() => setShowAddSellerForm(!showAddSellerForm)} />
        </div>
        <br />
        {showAddSellerForm && (
        <div className="add-seller-form">
          <form onSubmit={submitAddProduct}>
            <label htmlFor="nama">
              Nama
              <input type="text" placeholder="Ketik nama" id="nama" value={addProductFormValue.nama} onChange={(e) => changeValue('nama', e)} />
            </label>
            <label htmlFor="satuan">
              Satuan
              <input type="text" placeholder="Ketik satuan" id="satuan" value={addProductFormValue.satuan} onChange={(e) => changeValue('satuan', e)} />
            </label>
            <label htmlFor="hargaSatuan">
              Harga Satuan
              <input type="number" placeholder="Ketik hargaSatuan" id="hargaSatuan" value={addProductFormValue.hargaSatuan} onChange={(e) => changeValue('hargaSatuan', e)} />
            </label>
            <label htmlFor="deskripsi">
              Deskripsi
              <input type="text" placeholder="Ketik deskripsi" id="deskripsi" value={addProductFormValue.deskripsi} onChange={(e) => changeValue('deskripsi', e)} />
            </label>
            <ButtonStyled text="Submit" type="submit" />
          </form>
        </div>
        )}
        <div className="form-search">
          <label htmlFor="search">
            Cari Produk
            <input type="text" placeholder="Ketik nama produk" id="search" value={searchKeyword} onChange={(e) => changeSearch(e)} />
          </label>
          <ButtonStyled text="Cari" type="button" onClick={() => searchProduk()} />
        </div>
        <Table data={dataProduk.data}>
          <Column width={200} sortable fixed resizable>
            <HeaderCell>Nama</HeaderCell>
            <Cell dataKey="nama" />
          </Column>

          <Column width={100} sortable resizable>
            <HeaderCell>Satuan</HeaderCell>
            <Cell dataKey="satuan" />
          </Column>

          <Column width={200} sortable resizable>
            <HeaderCell>Harga Satuan</HeaderCell>
            <Cell dataKey="hargaSatuan" />
          </Column>

          <Column width={100} sortable resizable>
            <HeaderCell>Seller Id</HeaderCell>
            <Cell dataKey="sellerId" />
          </Column>

          <Column width={300} sortable resizable>
            <HeaderCell>Deskripsi</HeaderCell>
            <Cell dataKey="deskripsi" />
          </Column>
        </Table>
      </ContainerPage>
    </div>
  );
};

export default DetailSeller;
