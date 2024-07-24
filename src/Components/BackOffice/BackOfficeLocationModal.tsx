import React from 'react'
import Box from '@mui/material/Box'

import Modal from '@mui/material/Modal'
import { FaPlus } from 'react-icons/fa6'
import { BackOfficeLocationForm } from './BackOfficeLocationForm'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'visible',
}
export const BackOfficeLocationModal = ({ title }: { title: string }) => {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <div
                className=" h-12 w-1/2 mx-auto bg-white cursor-pointer text-black flex items-center justify-between p-4 rounded-lg shadow-md m-2"
                onClick={handleOpen}
            >
                <p className="text-center">{title}</p>
                <div className="w-8 h-8 ml-4 bg-gray-500 rounded-full flex items-center justify-center">
                    <FaPlus color="#fff" />
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <BackOfficeLocationForm handleClose={handleClose} />
                </Box>
            </Modal>
        </div>
    )
}
