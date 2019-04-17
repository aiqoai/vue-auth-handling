import axios from 'axios';



// const fetchClient = () => {
  const defaultOptions = {
    baseURL: process.env.APP_API_PATH,
    //method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    },
  };

  // Create instance
export const HTTP = axios.create(defaultOptions);

  // Set the AUTH token for any request
      HTTP.interceptors.request.use(function (config) {
          const token = localStorage.getItem('jwt');
          config.headers.Authorization =  token ? `Bearer ${token}` : '';
          return config;
        });

  // return instance;
// };


// export default fetchClient();
