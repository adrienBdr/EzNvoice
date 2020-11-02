import axios from 'axios';
import { URL_API, CONFIG_REQUEST } from './config';

class ApiProvider {

  put = (endpoint, data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${URL_API}/${endpoint}`, data, CONFIG_REQUEST)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  delete = (endpoint) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${URL_API}/${endpoint}`, CONFIG_REQUEST)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  get = (endpoint) => new Promise((resolve, reject) => {
    axios
      .get(`${URL_API}/${endpoint}`, CONFIG_REQUEST)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  post = (endpoint, data) => new Promise((resolve, reject) => {
    console.log(`${URL_API}${endpoint}`);
    console.log(JSON.stringify(data));

    axios
      .post(`${URL_API}${endpoint}`, data, CONFIG_REQUEST)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default ApiProvider;
