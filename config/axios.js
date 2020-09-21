import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: process.env.backendURL
});

export default clienteAxios;