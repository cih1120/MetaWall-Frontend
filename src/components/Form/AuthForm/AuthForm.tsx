import { FormEventHandler, useCallback } from 'react'
import { UseFormSetError, FieldValues } from 'react-hook-form'
import Link from 'next/link'
import toast from 'react-hot-toast'
import MainButton from '@/components/Form/FormComponents/MainButton'

interface ErrorDetails {
    fieldName: string
    type: string
    message: string
}
interface ErrorProps {
    [statusCode: string]: ErrorDetails
}

export function setErrorMessage(
    errorConfig: ErrorProps,
    setError: UseFormSetError<FieldValues>,
    statusCode: string
) {
    const error = errorConfig[statusCode]
    if (error) {
        setError(error.fieldName, {
            type: error.type,
            message: error.message,
        })
    } else {
        toast.error('系統錯誤，請稍後重新嘗試。')
    }
}

export default function AuthFormLayout({
    onSubmit,
    children,
}: {
    onSubmit: FormEventHandler
    children: React.ReactNode
}) {
    return (
        <form
            className="flex flex-col items-center gap-y-3"
            onSubmit={onSubmit}
        >
            {children}
        </form>
    )
}
