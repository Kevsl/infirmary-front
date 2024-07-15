import { Resolver } from 'react-hook-form'
import { incidentSubmit } from '../types'

export const createIncidentResolver: Resolver<incidentSubmit> = async (
    values
) => {
    const errors: Record<string, { type: string; message: string }> = {}

    if (!values.victim_id) {
        errors.victim_id = {
            type: 'required',
            message: 'Victim ID is required.',
        }
    }
    if (!values.injury_id) {
        errors.injury_id = {
            type: 'required',
            message: 'Injury ID is required.',
        }
    }
    if (!values.injury_description) {
        errors.injury_description = {
            type: 'required',
            message: 'Injury description is required.',
        }
    }
    if (!values.sst_id) {
        errors.sst_id = {
            type: 'required',
            message: 'SST ID is required.',
        }
    }
    if (!values.injury_situation) {
        errors.injury_situation = {
            type: 'required',
            message: 'Injury situation is required.',
        }
    }
    if (!values.location_id) {
        errors.location_id = {
            type: 'required',
            message: 'Location ID is required.',
        }
    }
    if (!values.care_id) {
        errors.care_id = {
            type: 'required',
            message: 'Care ID is required.',
        }
    }
    if (typeof values.samu !== 'boolean') {
        errors.samu = {
            type: 'required',
            message: 'SAMU field is required.',
        }
    }

    if (values.samu === true) {
        if (!values.samu_report) {
            errors.samu_report = {
                type: 'required',
                message: 'SAMU field is required.',
            }
        }

        if (!values.samu_departure_time) {
            errors.samu_departure_time = {
                type: 'required',
                message: 'SAMU field is required.',
            }
        }
        if (!values.samu_departure_time) {
            errors.samu_departure_time = {
                type: 'required',
                message: 'SAMU field is required.',
            }
        }
    }

    if (!values.sst_signature) {
        errors.sst_signature = {
            type: 'required',
            message: 'SST signature is required.',
        }
    }

    if (typeof values.notify_manager !== 'boolean') {
        errors.notify_manager = {
            type: 'required',
            message: 'Notify manager field is required.',
        }
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    }
}
