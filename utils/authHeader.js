import axios from 'axios';

const authHeader = async (token) => {
    axios.defaults.headers.common['Authorization'] = token;
    await sessionStorage.setItem('auth', token);
};

export {authHeader};