export const getToken = () => {
    return window.localStorage.getItem('accessToken');
};

export const setToken = (tokenKey, token) => {
    return window.localStorage.setItem(tokenKey, token);
};

export const deleteToken = () => {
    return window.localStorage.removeItem('accessToken');
};

