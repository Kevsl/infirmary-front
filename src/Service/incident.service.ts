import { getTimeOfDay } from '@/Utils/timeToMomentConverter'
import { incidentSubmit } from '@/Utils/types'
import axios from 'axios'

export async function getAllIncidents() {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}incident`, axiosConfig)
}
export async function getIncidentsByStaff(id: string) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}incident/by-victim/${id}`,
        axiosConfig
    )
}
export async function getIncidentsByLocation(id: string) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}incident/by-location/${id}`,
        axiosConfig
    )
}

export async function reportIncident(incident: incidentSubmit) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}incident`,
        {
            intervention_moment: getTimeOfDay(),
            victim_id: incident.victim_id,
            injury_id: incident.injury_id,
            injury_description: incident.injury_description,
            injury_situation: incident.injury_situation,
            location_id: incident.location_id,
            care_id: incident.care_id,
            samu: incident.samu || false,
            sst_id: incident.sst_id,
            sst_signature: incident.sst_signature,
            samu_departure_time: incident.samu_departure_time || null,
            samu_destination: incident.samu_destination || null,
            samu_report: incident.samu_report || null,
            employee_discharge: incident.employee_discharge || null,
            transport_id:
                incident.transport_id || '6b6d9c11-72f5-45ec-b115-23effc9e5a1b',
            employee_departure_time: incident.employee_departure_time || null,
            employee_arrival_time: incident.employee_arrival_time || null,
            notify_manager: incident.notify_manager || false,
        },
        axiosConfig
    )
}
