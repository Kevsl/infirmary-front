import React from 'react'

export const FormError = ({ message }: { message: string }) => {
    return (
        <p className="text-sm text-red-600 text-center my-3 italic">
            *{message}
        </p>
    )
}
