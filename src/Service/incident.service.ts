import { getTimeOfDay } from '@/Utils/timeToMomentConverter'
import { IncidentDates, incidentSubmit } from '@/Utils/types'
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

export async function getIncidentsByInjury(id: string) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}incident/by-injury/${id}`,

        axiosConfig
    )
}

export async function getIncidentsByMoment(moment: string) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}incident/by-moment/${moment}`,

        axiosConfig
    )
}

export async function getAllMoments() {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}moments`, axiosConfig)
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

export async function getIncidentsDate(year: number, month: number) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
        params: {
            month: month,
            year: year,
        },
    }

    return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}incident/by-month`,
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
            care_ids: incident.care_ids,
            samu: incident.samu || false,
            sst_id: incident.sst_id,
            sst_signature: incident.sst_signature,
            samu_departure_time: incident.samu_departure_time || null,
            samu_destination: incident.samu_destination || null,
            samu_report: incident.samu_report || null,
            employee_discharge: incident.employee_discharge || null,
            transport_id: incident.transport_id,
            employee_departure_time: incident.employee_departure_time || null,
            employee_arrival_time: incident.employee_arrival_time || null,
            notify_manager: incident.notify_manager || false,
        },
        axiosConfig
    )
}

export async function searchIncident(query: string) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}incident/search/${query}`,
        axiosConfig
    )
}

//
export async function getIncidentStatsByLocation(incidentDates: IncidentDates) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}incident/stats/location`,
        {
            startMonth: Number(incidentDates.startMonth),
            startYear: Number(incidentDates.startYear),
            endMonth: Number(incidentDates.endMonth),
            endYear: Number(incidentDates.endYear),
        },
        axiosConfig
    )
}

export async function getIncidentStatsByMoments() {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}incident/stats/moments`,
        axiosConfig
    )
}

export async function getIncidentStats(
    incidentDates: IncidentDates,
    filter: string
) {
    let axiosConfig = {
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('sub')}`,
        },
    }

    return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}incident/stats/${filter}`,
        {
            startMonth: Number(incidentDates.startMonth),
            startYear: Number(incidentDates.startYear),
            endMonth: Number(incidentDates.endMonth),
            endYear: Number(incidentDates.endYear),
        },
        axiosConfig
    )
}
