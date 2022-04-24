import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ContainerPage, ButtonStyled } from 'components';
import {
  addSeller, searchProductByKeyword, listProductBySellerId,
} from 'services/api';
import {
  Table, Column, HeaderCell, Cell,
} from 'rsuite-table';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerById } from 'redux/reducer';
import { useNavigate } from 'react-router-dom';

const DetailSeller = () => {
  const [addSellerFormValue, setAddSellerFormValue] = useState({ nama: '', kota: '' });
  const [newSeller, setNewSeller] = useState({});
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dataProduk, setDataProduk] = useState({});
  const [showAddSellerForm, setShowAddSellerForm] = useState(false);

  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  const navigate = useNavigate();

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
  }, []);

  const changeValue = (label, e) => {
    if (label === 'nama') {
      setAddSellerFormValue({ ...addSellerFormValue, nama: e.target.value });
    } else {
      setAddSellerFormValue({ ...addSellerFormValue, kota: e.target.value });
    }
  };

  const submitAddSeller = async (e) => {
    e.preventDefault();
    await addSeller(addSellerFormValue.nama, addSellerFormValue.kota)
      .then((res) => {
        if (res.data.status === 'Error') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${res.data.message}`,
          });
        } else {
          setNewSeller(res.data);
        }
      });
    await dispatch(getSellerById(newSeller));
    await setAddSellerFormValue({ nama: '', kota: '' });
    navigate('/detail-seller');
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
          <form onSubmit={submitAddSeller}>
            <label htmlFor="nama">
              Nama
              <input type="text" placeholder="Ketik nama" id="nama" value={addSellerFormValue.nama} onChange={(e) => changeValue('nama', e)} />
            </label>
            <label htmlFor="kota">
              Kota
              <input type="text" placeholder="Ketik kota" id="kota" value={addSellerFormValue.kota} onChange={(e) => changeValue('kota', e)} />
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
