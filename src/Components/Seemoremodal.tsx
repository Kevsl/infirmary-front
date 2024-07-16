import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Incident } from '@/Utils/types'
import { time } from 'console'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    // bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
}

export default function BasicModal({ incident }: { incident: Incident }) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button onClick={handleOpen}>Plus d'infos</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="flex items-center justify-center px-4">
                        <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
                            <div className="p-4 border-b">
                                <h2 className="text-2xl ">
                                    Référence : {incident.id}
                                </h2>
                                <p className="text-sm text-gray-500">Détails</p>
                            </div>
                            <div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Date de l'accident
                                    </p>
                                    <p>
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
                                    <p>{incident.victim.name}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">Equipe</p>
                                    <p>{incident.intervention_moment}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">Lieu</p>
                                    <p>{incident.location.name}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">Blessure</p>
                                    <p>{incident.injury.description}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Description de l'accident
                                    </p>
                                    <p>{incident.injury_description}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Situation amenant à l'accident
                                    </p>
                                    <p>{incident.injury_situation}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Soins apportés
                                    </p>
                                    <p>{incident.care.treatment}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Décision du SAMU
                                    </p>
                                    <p>{incident.samu_report}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Heure départ SAMU
                                    </p>
                                    <p>{incident.samu_departure_time}</p>
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
                                    <p>{incident.employee_departure_time}</p>
                                </div>
                                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                                    <p className="text-gray-600">
                                        Heure arrivée salarié
                                    </p>
                                    <p>{incident.employee_arrival_time}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
