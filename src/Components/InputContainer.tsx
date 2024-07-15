import { inputContainer } from '@/Utils/types'
import React from 'react'

export const InputContainer = ({
    title,
    htmlFor,
    children,
}: inputContainer) => {
    return (
        <div className="my-3">
            <label
                htmlFor={htmlFor}
                className="block text-sm font-medium leading-6 text-gray-900"
            >
                {title}
            </label>
            <div className="mt-2">{children}</div>
        </div>
    )
}
