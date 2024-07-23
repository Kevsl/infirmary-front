import { Resolver } from 'react-hook-form'
import { IncidentDate } from '../types'

export const searchIncidentResolver: Resolver<IncidentDate> = async (
    values
) => {
    const errors: Record<string, { type: string; message: string }> = {}

    if (!values.startMonth) {
        errors.startMonth = {
            type: 'required',
            message: 'Ce champ est requis.',
        }
    }
    if (!values.startYear) {
        errors.startYear = {
            type: 'required',
            message: 'Ce champ est requis.',
        }
    }
    if (!values.endMonth) {
        errors.endMonth = {
            type: 'required',
            message: 'Ce champ est requis.',
        }
    }
    if (!values.endYear) {
        errors.endYear = {
            type: 'required',
            message: 'Ce champ est requis.',
        }
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    }
}
