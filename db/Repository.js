import axios from 'axios';
//const BASE_URL = 'https://pet-api.blakestagner.com';
const BASE_URL = 'http://192.168.1.7:3050';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function login (email, password) {
    return axios.post(`${BASE_URL}/api/login`, {
        'email': email,
        'password': password
      })
      .then(res => {
        return res.data.response.token
      })
      .catch(error => {
        console.log(error.response.data)
        throw JSON.stringify(error.response.data)
      });
}

export function logOutTime () {
    return axios.post(`${BASE_URL}/api/logOutTime`, { 
        'x-access-token': localStorage.getItem('x-access-token')
    })
    .then(res => res.data)
    .catch(err => err);
}


export function isAuthenticated() {
    return localStorage.getItem('x-access-token') 
    && localStorage.getItem('x-access-token-expiration') > Date.now();
}

export async function getUserInfo() {
  const userToken = await AsyncStorage.getItem('userToken')
  return axios.get(`${BASE_URL}/user/data`, { 
      params: { 
        'x-access-token': userToken
      } 
      })
      .then(res => {
      return res.data
      })
      .catch(err => Promise.reject('Request Not Authenticated!'));
  }


export async function updateUser () {
  const userToken = await AsyncStorage.getItem('userToken')
  return axios.get(`${BASE_URL}/user/updated-data`, { 
      params: { 
          'x-access-token': userToken
      } 
  })
  .then( async (res) => {
      let newToken = res.data.response.token; 
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.setItem('userToken', newToken);
      return newToken;
  })
  .catch((err) => Promise.reject(err.response.data));
}



export async function uploadUserImage(data) {
  const userToken = await AsyncStorage.getItem('userToken')
  return axios.post(`${BASE_URL}/api/upload-user-img`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
      params: { 
          'x-access-token': userToken,
      } 
  })
  .then(res => {
    console.log(res)
    return JSON.stringify(res)
  })
  .catch(err => {
    console.log(err)
    throw JSON.stringify(err)
  })
}

export async function getCampigns() {
  const userToken = await AsyncStorage.getItem('userToken')
  return axios.get(`${BASE_URL}/api/getCampaigns`, { 
      params: { 
          'x-access-token': userToken
      }
  })
  .then( async (res) => {
      return res.data
  })
  .catch((err) => Promise.reject(err.response.data));
}

export async function getCampignDetails(data) {
  const userToken = await AsyncStorage.getItem('userToken')
  return axios.get(`${BASE_URL}/api/getCampaignDetails`, { 
      params: { 
          'x-access-token': userToken,
          'campaigns': data
      }
  })
  .then( async (res) => {
      return res.data
  })
  .catch((err) => Promise.reject(err.response.data));
}