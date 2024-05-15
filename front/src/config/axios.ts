import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: 'http://localhost:5001/'
  // baseURL: process.env.REACT_APP_BASE_URL
});

api.defaults.withCredentials = true;

api.interceptors.response.use(undefined, (error) => {
  console.error('Error:', error);

  if (error.message === 'Network Error') {
    console.error('Network Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Network Error',
      text: 'Failed to connect to the server. Please check your internet connection.'
    });
  }

  if (
    error.response &&
    (error.response.status === 401 || error.response.status === 404)
  ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `${
        typeof error.response.data === 'string'
          ? error.response.data
          : error.response.data.message
      }`
    });
  }

  return Promise.reject(error);
});

export default api;
