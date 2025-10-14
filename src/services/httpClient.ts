import axios from 'axios';

export const httpClient = axios.create({
    baseURL: 'https://adversarially-nondisciplinable-rayne.ngrok-free.dev/api'
})