const axios = require('axios');

const commonAxios = axios.create({
  baseURL: 'https://simple-contact-crud.herokuapp.com/'
});



commonAxios.interceptors.response.use(function (response) {
  const { data } = response;

  if (data.data === null) {
    const error = new Error(data.message || "error tidak diketahui(Unknown error)");
    throw error;
  }
  return data.data;
},
  function (error) {
    return Promise.reject(error);
  }
);

export { commonAxios };
