import * as Yup from 'yup'

export const incidentSubmitSchema = Yup.object().shape({
    intervention_moment: Yup.string().required(
        'Intervention moment is required'
    ),
    victim_id: Yup.string().required('Victim ID is required'),
    injury_id: Yup.string().required('Injury ID is required'),
    injury_description: Yup.string().required('Injury description is required'),
    injury_situation: Yup.string().required('Injury situation is required'),
    location_id: Yup.string().required('Location ID is required'),
    care_id: Yup.string().required('Care ID is required'),
    samu: Yup.boolean().required('SAMU field is required'),
    sst_id: Yup.string().required('SST ID is required'),
    sst_signature: Yup.string().required('SST signature is required'),
    samu_departure_time: Yup.string(),
    samu_destination: Yup.string(),
    samu_report: Yup.string(),
    employee_discharge: Yup.string(),
    transport_id: Yup.string().required('Transport ID is required'),
    employee_departure_time: Yup.string(),
    employee_arrival_time: Yup.string(),
    notify_manager: Yup.boolean().required('Notify manager field is required'),
    created_at: Yup.string().required('Created at field is required'),
    updated_at: Yup.string().required('Updated at field is required'),
})

export default incidentSubmitSchema
