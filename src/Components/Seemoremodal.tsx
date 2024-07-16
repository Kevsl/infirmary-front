import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Incident } from '@/Utils/types'
import { time } from 'console'
import { FaCircleXmark } from 'react-icons/fa6'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'scroll',
    borderRadius: 2,
    p: 4,
}

export default function BasicModal({ incident }: { incident: Incident }) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div className="flex flex-col justify-center items-center pt-2">
            <button
                onClick={handleOpen}
                className="bg-blue-800 rounded-md text-white px-2"
            >
                Plus d'infos
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex items-center justify-center px-4 relative">
                        <span
                            className="fixed top-4 right-4 ml-auto block cursor-pointer"
                            onClick={handleClose}
                            aria-label="fermeture article"
                        >
                            <FaCircleXmark color="#4b5563" size={26} />
                        </span>
                        <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
                            <div className="p-4 border-b">
                                <h2 className="text-2xl text-black  ">
                                    Référence : {incident.id}
                                </h2>
                            </div>
                            <div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b text-gray-600">
                                    <p className="text-gray-600">
                                        Date de l'accident
                                    </p>
                                    <p className="text-gray-600">
                                        {new Date(
                                            incident.created_at
                                        ).toLocaleDateString('fr')}{' '}
                                        {new Date(
                                            incident.created_at
                                        ).toLocaleTimeString('fr')}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Salarié concerné
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.victim.name}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">Equipe</p>
                                    <p className="text-gray-600">
                                        {incident.intervention_moment}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">Lieu</p>
                                    <p className="text-gray-600">
                                        {incident.location.name}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">Blessure</p>
                                    <p className="text-gray-600">
                                        {incident.injury.description}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Description de l'accident
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.injury_description}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Situation amenant à l'accident
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.injury_situation}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Soins apportés
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.care.treatment}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Décision du SAMU
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.samu_report}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Heure départ SAMU
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.samu_departure_time}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Décharge salarié
                                    </p>
                                    {incident.employee_discharge && (
                                        <img
                                            src={incident.employee_discharge}
                                            // alt={incident.sst.name}
                                        />
                                    )}
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Heure départ salarié
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.employee_departure_time}
                                    </p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Heure arrivée salarié
                                    </p>
                                    <p className="text-gray-600">
                                        {incident.employee_arrival_time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
