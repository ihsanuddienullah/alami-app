import React, { useState } from 'react';
// import Swal from 'sweetalert2';
import { ContainerPage, ButtonStyled } from 'components';
import { addSeller } from 'services/api';

const Home = () => {
  const [addSellerFormValue, setAddSellerFormValue] = useState({ nama: '', kota: '' });

  // useEffect(() => {
  //   const fetch = async () => {
  //     await searchProductByKeyword();
  //   };
  //   fetch();
  // }, []);

  const changeValue = (label, e) => {
    if (label === 'nama') {
      setAddSellerFormValue({ ...addSellerFormValue, nama: e.target.value });
    } else {
      setAddSellerFormValue({ ...addSellerFormValue, kota: e.target.value });
    }
  };

  const submitAddSeller = (e) => {
    e.preventDefault();
    addSeller(addSellerFormValue);
  };

  return (
    <ContainerPage>
      <ButtonStyled text="Add Seller" type="button" />
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
    </ContainerPage>
  );
};

export default Home;
