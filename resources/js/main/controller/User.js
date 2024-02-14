import axios from 'axios';
import {showToast} from '../components/utils/Toast.js';

export async function usuario(router) {
    try {
        const token = localStorage.getItem('jwt-token');
        if (!token) {
            await router.push('/');
        }

        const config = {
            headers: {Authorization: `Bearer ${token}`},
        };

        const response = await axios.post('/api/user', {}, config);

        return response.data;
    } catch (error) {
        console.error('Error fetching logged in user:', error);
        throw error;
    }
}

export async function login(email, password, router) {
    let errors = [];
    if (!email || !/.+@.+\..+/.test(email)) {
        errors.push('E-mail inválido ou não informado');
    }
    if (!password || password.length < 3) {
        errors.push('Senha deve ter pelo menos 3 caracteres');
    }

    if (errors.length > 0) {
        errors.forEach(error => showToast(error, 'error'));
        return {success: false, errors};
    }

    try {
        const response = await axios.post('/api/login', {email, password});
        localStorage.setItem('jwt-token', response.data.token);
        await router.push('/');
        return {success: true};
    } catch (error) {
        let errorMessage = "Erro desconhecido";
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        }
        showToast(errorMessage, 'error');
        return {success: false, errorMessage};
    }
}
