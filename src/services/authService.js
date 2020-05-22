import http from "./httpService";
import jwtDecode from 'jwt-decode';

const apiEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
    const { data: jwt } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt);
}

export function logout()
{
    localStorage.clear(tokenKey);
}

export function getCurrentUser()
{
    try {
        const jwt = localStorage.getItem("token");
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

export function loginWithJwt(jwt)
{
    localStorage.setItem(tokenKey, jwt);
}

export function getJwt()
{
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
};
