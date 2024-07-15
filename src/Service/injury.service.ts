import axios from 'axios'

export async function getAllInjuries() {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}injury`, axiosConfig)
}
