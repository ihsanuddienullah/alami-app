import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { ContainerPage, ButtonStyled } from 'components';
import {
  addSeller, searchProductByKeyword,
} from 'services/api';
import {
  Table, Column, HeaderCell, Cell,
} from 'rsuite-table';

const Home = () => {
  const [addSellerFormValue, setAddSellerFormValue] = useState({ nama: '', kota: '' });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [dataProduk, setDataProduk] = useState({});
  const [showAddSellerForm, setShowAddSellerForm] = useState(false);

  const changeValue = (label, e) => {
    if (label === 'nama') {
      setAddSellerFormValue({ ...addSellerFormValue, nama: e.target.value });
    } else {
      setAddSellerFormValue({ ...addSellerFormValue, kota: e.target.value });
    }
  };

  const submitAddSeller = async (e) => {
    e.preventDefault();
    addSeller(addSellerFormValue.nama, addSellerFormValue.kota)
      .then((res) => {
        if (res.data.status === 'Error') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${res.data.message}`,
          });
        }
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
    <ContainerPage>
      <div className="add-seller-btn">
        <ButtonStyled text="Add Seller" type="button" onClick={() => setShowAddSellerForm(!showAddSellerForm)} />
      </div>
      <br />
      {showAddSellerForm && (
      <div className="add-seller-form">
        <form onSubmit={submitAddSeller}>
          <label htmlFor="nama">
            Name
            <input type="text" id="nama" value={addSellerFormValue.nama} onChange={(e) => changeValue('nama', e)} />
          </label>
          <label htmlFor="kota">
            Kota
            <input type="text" id="kota" value={addSellerFormValue.kota} onChange={(e) => changeValue('kota', e)} />
          </label>
          <ButtonStyled text="Submit" type="submit" />
        </form>
      </div>
      )}
      <div className="form-search">
        <label htmlFor="search">
          Search
          <input type="text" id="search" value={searchKeyword} onChange={(e) => changeSearch(e)} />
        </label>
        <ButtonStyled text="Search" type="button" onClick={() => searchProduk()} />
      </div>
      <Table data={dataProduk.data}>
        <Column width={100} sortable fixed resizable>
          <HeaderCell>Nama</HeaderCell>
          <Cell dataKey="nama" />
        </Column>

        <Column width={100} sortable resizable>
          <HeaderCell>Satuan</HeaderCell>
          <Cell dataKey="satuan" />
        </Column>

        <Column width={100} sortable resizable>
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
  );
};

export default Home;
