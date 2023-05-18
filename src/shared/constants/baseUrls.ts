const prod = 'https://final-project-itransition-s.herokuapp.com';
const dev = 'http://localhost:3001';

const config = process.env.NODE_ENV === 'development' ? dev : prod;
const BASE_URL = config;

export default BASE_URL;
