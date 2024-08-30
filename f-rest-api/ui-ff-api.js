import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:9090'
})

export async function saveData(credentials) {
        const { data } = await axiosInstance.post('/api/save', credentials)

        return data
    }

    export async function getUserData(credentials) {
        const { data } = await axiosInstance.get('/api/user')

        return data
    }
