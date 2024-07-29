import { InsertOrUpdateStaffProps } from '@/Utils/types'
import axios from 'axios'

export async function getAllStaff() {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}staff`, axiosConfig)
}

export async function getSstStaff() {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}staff/sst`, axiosConfig)
}

export async function getStaffById(id: string) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}staff/single/${id}`,
        axiosConfig
    )
}

export async function createStaff(staff: InsertOrUpdateStaffProps) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}staff`,
        {
            name: staff.name,
            sst_status: staff.sst_status,
            stillEmployed: staff.stillEmployed,
        },
        axiosConfig
    )
}

export async function updateStaff(staff: InsertOrUpdateStaffProps, id: string) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}staff/${id}`,
        {
            name: staff.name,
            sst_status: staff.sst_status,
            stillEmployed: staff.stillEmployed,
        },
        axiosConfig
    )
}
