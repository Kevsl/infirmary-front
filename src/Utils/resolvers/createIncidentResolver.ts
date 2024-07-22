import { Resolver } from 'react-hook-form'
import { incidentSubmit } from '../types'

export const createIncidentResolver: Resolver<incidentSubmit> = async (
    values
) => {
    const errors: Record<string, { type: string; message: string }> = {}

    if (!values.victim_id) {
        errors.victim_id = {
            type: 'required',
            message: 'Qui est la victime ?',
        }
    }
    if (values.victim_id) {
        if (values.victim_id === values.sst_id) {
            errors.isVictimSst = {
                type: 'required',
                message: 'Le SST ne peut pas se traiter lui-même !',
            }
        }
    }
    if (!values.injury_id) {
        errors.injury_id = {
            type: 'required',
            message: 'Type de blessure requise',
        }
    }
    if (!values.injury_description) {
        errors.injury_description = {
            type: 'required',
            message: "Que s'est il passé ?",
        }
    }
    if (!values.sst_id) {
        errors.sst_id = {
            type: 'required',
            message: 'Qui est le sst ?',
        }
    }
    if (!values.sst_signature) {
        errors.sst_signature = {
            type: 'required',
            message:
                'La signature du sst est obligatoire, pensez à sauvegarder.',
        }
    }
    if (!values.injury_situation) {
        errors.injury_situation = {
            type: 'required',
            message: 'Que faisait le salarié?',
        }
    }
    if (!values.location_id) {
        errors.location_id = {
            type: 'required',
            message: "Ou l'accident s'est il produit?",
        }
    }
    if (!values.care_ids) {
        errors.care_ids = {
            type: 'required',
            message: 'Quel type de soins ont été apportés ?',
        }
    }

    if (values.samu === true) {
        if (!values.samu_report) {
            errors.samu_report = {
                type: 'required',
                message: 'Quelle est la décision du Samu?',
            }
        }

        if (!values.samu_departure_time) {
            errors.samu_departure_time = {
                type: 'required',
                message: 'Heure de départ du Samu ?',
            }
        }
        if (!values.samu_destination) {
            errors.samu_destination = {
                type: 'required',
                message: 'Destination du samu ?',
            }
        }
    }

    if (values.willVictimeGoHome) {
        if (!values.employee_departure_time) {
            errors.employee_departure_time = {
                type: 'required',
                message: "L'heure du départ du salarié est requise",
            }
        }
        if (!values.employee_discharge) {
            errors.employee_discharge = {
                type: 'required',
                message:
                    'La signature du salarié est requise, pensez à sauvegarder',
            }
        }
        if (!values.transport_id) {
            errors.transport_id = {
                type: 'required',
                message: "Comment le salarié rentrera t'il chez lui",
            }
        }
    }

    return {
        values: Object.keys(errors).length === 0 ? values : {},
        errors,
    }
}
