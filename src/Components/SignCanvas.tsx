import { SignCanvasProps } from '@/Utils/types'
import { RefObject, useEffect, useRef, useState } from 'react'
import SignaturePad from 'react-signature-pad-wrapper'

const SignCanvas: React.FC<SignCanvasProps> = ({
    setSignature,
    signaturePadRef,
}) => {
    const clearSignature = () => {
        if (signaturePadRef.current) {
            signaturePadRef.current.clear()
            setSignature(null)
        }
    }

    const saveSignature = () => {
        if (signaturePadRef.current) {
            const dataUrl = signaturePadRef.current.toDataURL()
            setSignature(dataUrl)
        }
    }

    return (
        <div>
            <div className="border-2 border-md border-gray-400 rounded-t-md">
                <SignaturePad
                    ref={signaturePadRef}
                    options={{
                        minWidth: 1,
                        maxWidth: 1,
                        penColor: 'rgb(20, 33, 61)',
                    }}
                />
            </div>
            <div className="flex items-center">
                <p
                    className="flex w-full justify-center rounded-b-md bg-gray-300 text-black px-3 py-1.5 text-sm font-semibold leading-6 shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-black hover:text-white"
                    onClick={clearSignature}
                >
                    Effacer
                </p>
                <p
                    className="flex w-full justify-center rounded-b-md bg-gray-300 text-black px-3 py-1.5 text-sm font-semibold leading-6 shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-black hover:text-white"
                    onClick={saveSignature}
                >
                    Sauvegarder
                </p>
            </div>
        </div>
    )
}

export default SignCanvas
