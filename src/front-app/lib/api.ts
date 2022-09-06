import axios from 'axios';

export const signedIn = () => {
  return( (localStorage.jwt == undefined) ? false : true);
}

export const signOut = () => {
  localStorage.removeItem('jwt');
  window.location.href = '/login';
}

export const setJwt = (jwt: string) => {
  localStorage.jwt = jwt;
  window.location.href = '/';
}

export const api = axios.create({
  baseURL: 'http://localhost:3022/api',
});

api.interceptors.request.use(config => {
  if (localStorage.jwt) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${localStorage.jwt}`,
    };
  }

  return config;
});

api.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    signOut();
  }

  return Promise.reject(error);
});