import { isUndefined } from 'util'
import Cookies from 'universal-cookie/es6'
import axios from 'axios';
import { API_HOST as host } from '../../app.json'

const cookies = new Cookies();

export function calculateSessionExpiration() {
    const now = new Date().getTime();
    const newDate = now + 60 * 30 * 1000;
    return new Date(newDate);
}

export function getSession() {
    return isUndefined(cookies.get('_s')) ? false : cookies.get('_s');
}

function renewSession() {
    const session = getSession();
    if (!session) window.location.href = '/login';
    cookies.set('_s', session, {
        path: '/',
        expires: calculateSessionExpiration()
    })
    return session;
}

export const request = {
    get: function(services) {
        let token = renewSession();
        return axios.get(`${host}${services}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }
}