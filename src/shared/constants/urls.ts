const prod = 'https://final-project-itransition-s.herokuapp.com';
const dev = 'http://localhost:3001';

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
export const BASE_URL = config;

export const urls = {
  REGISTRATION: `${BASE_URL}/signup`,
  LOGOUT: `${BASE_URL}/logout`,
  LOGIN: `${BASE_URL}/login`,
  REFRESH: `${BASE_URL}/refresh`,
};
