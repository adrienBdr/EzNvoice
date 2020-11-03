import axios from 'axios';
import { URL_API, CONFIG_REQUEST } from './config';

class ApiProvider {

  put = (endpoint, data, config) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${URL_API}${endpoint}`, data, config || CONFIG_REQUEST)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  delete = (endpoint, config) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${URL_API}${endpoint}`, config || CONFIG_REQUEST)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  get = (endpoint, config) => new Promise((resolve, reject) => {
    axios
      .get(`${URL_API}${endpoint}`, config || CONFIG_REQUEST)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  post = (endpoint, data, config) => new Promise((resolve, reject) => {
    axios
      .post(`${URL_API}${endpoint}`, data, config || CONFIG_REQUEST)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default ApiProvider;
