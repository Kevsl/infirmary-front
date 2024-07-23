import { RefObject } from 'react'
import SignaturePad from 'react-signature-pad-wrapper'

export type Injury = {
    id: string
    description: string
    created_at: string
    updated_at: string
}

export type Location = {
    id: string
    name: string
    created_at: string
    updated_at: string
}

export type Care = {
    id: string
    treatment: string
    created_at: string
    updated_at: string
}

export type Victim = {
    id: string
    name: string
    sst_status: boolean
    stillEmployed: boolean
    created_at: string
    updated_at: string
}

export type Sst = {
    id: string
    name: string
    sst_status: boolean
    stillEmployed: boolean
    created_at: string
    updated_at: string
}

export type Transport = {
    id: string
    name: string
    created_at: string
    updated_at: string
}

export type Incident = {
    id: string
    incident_date: string
    intervention_moment: string
    victim_id: string
    injury_id: string
    injury_description: string
    injury_situation: string
    location_id: string
    incidentHasCare: IncidentHasCare
    samu: boolean
    sst_id: string
    sst_signature: string
    samu_departure_time: string
    samu_destination: string
    samu_report: string
    employee_discharge: string
    transport_id: string
    employee_departure_time: string
    employee_arrival_time: string
    created_at: string
    updated_at: string
    injury: Injury
    location: Location
    care: Care
    victim: Victim
    sst: Sst
    transport: Transport
}

export type IncidentResponse = {
    incidents: Incident[]
    count: number
}

export type inputContainer = {
    title: string
    htmlFor: string
    children: React.ReactNode
}

export interface SignCanvasProps {
    setSignature: (signature: string | null) => void
    signaturePadRef: RefObject<SignaturePad>
}

export interface incidentSubmit {
    intervention_moment: string
    victim_id: string
    injury_id: string
    injury_description: string
    injury_situation: string
    location_id: string
    care_ids: string[]
    samu: boolean
    sst_id: string
    sst_signature: string
    samu_departure_time?: string
    samu_destination?: string
    samu_report?: string
    employee_discharge?: string
    transport_id: string
    employee_departure_time?: string
    employee_arrival_time?: string
    notify_manager: boolean
    willVictimeGoHome: boolean
    created_at: string
    updated_at: string
    isVictimSst: string
}

export type IncidentStatProps = {
    location: string
    locationId: string
    count: number
}

export type IncidentHasCare = [
    {
        id: string
        care_id: string
        incident_id: string
        care: Care
        incident: Incident
    }
]
export type InsertOrUpdateStaffProps = {
    name: string
    sst_status: boolean
    stillEmployed: boolean
}

export type HandleCloseType = () => void

export type BackOfficeLocationFormProps = {
    handleClose: HandleCloseType
}

export type BackOfficeInjuryFormProps = {
    handleClose: HandleCloseType
}
export type BackOfficeStaffFormProps = {
    handleClose: HandleCloseType
}

export enum StatFilterOptions {
    Care = 'care',
    Location = 'location',
    Injury = 'injury',
    Staff = 'staff',
    Moment = 'moment',
}
export enum StatFilterLabels {
    Care = 'Soins apportés',
    Location = 'Secteur',
    Injury = 'Type de blessure',
    Staff = 'Personne',
    Moment = 'Moment',
}
