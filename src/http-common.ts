import axios from 'axios';

//TODO: Logout and auth
export const HTTP = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})
