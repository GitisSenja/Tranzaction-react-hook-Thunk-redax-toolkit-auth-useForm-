import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    responseType: 'json',
});

instance.interceptors.request.use((request) => {
    if (request.method === 'post') {
        request.headers['Content-Type'] = 'application/json';
    }
    request.headers.authorization = ` ${window.localStorage.accessToken}`;
    return request;
});

export default instance;
