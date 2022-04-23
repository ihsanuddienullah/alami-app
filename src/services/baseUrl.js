import axios from 'axios';

const baseURL = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default baseURL;
