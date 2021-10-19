import axios from 'axios';
const BASE_URL = 'http://10.128.0.63:8080/api/tesoreria/mtesoreria-reclamaciones/';

export const axiosPost = async (url,data) =>{
  const response = await axios.post(url,data);
  const result = await response.json();
  return {status: response.status, data: result};
};

export const axiosPut = async (url,data) =>{
  const response = await axios.put(`${BASE_URL}${url}`,data);
  return {status: response.status, data: response.data};
};


export const axiosGet = async (url) => {
  const response = await axios.get(`${BASE_URL}${url}`);
  const result = await response.json();
  return {status: response.status, data: result};
}


export const axiosRequest = (path, method, data, params, responseType = 'json', ContentType = 'application/json; charset=utf-8;') => {
  let CancelToken = axios.CancelToken;
  let call1 = CancelToken.source();
  return new Promise((resolve, reject) => {
    let url = `/${path}`;
    const requestData = { url, data, method, params, responseType, headers: { 'content-type': ContentType }, cancelToken: call1.token };
    axios.request(requestData).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
};

export const axiosRequestHeaders = (path, method, data, params, responseType = 'json', headers = {}) => {
  let CancelToken = axios.CancelToken;
  let call1 = CancelToken.source();
  return new Promise((resolve, reject) => {
    let url = `/${path}`;
    const requestData = { url, data, method, params, responseType, headers: headers, cancelToken: call1.token };
    axios.request(requestData).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject(err);
    });
  });
};
