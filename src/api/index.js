import axios from 'axios';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_SERVER_API,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalReq = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalReq._isRetry = true;
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_API}refresh`, {withCredentials: true});
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalReq);
    } catch (e) {
      console.log('Пользователь не авторизован', e);
    }
  }
  throw error;
})

export default $api;