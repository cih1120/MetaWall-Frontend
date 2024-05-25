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
    formType,
    children,
}: {
    onSubmit: FormEventHandler
    formType: 'login' | 'signup'
    children: React.ReactNode
}) {
    return (
        <form
            className="flex flex-col items-center gap-y-3"
            onSubmit={onSubmit}
        >
            {children}
            {formType === 'login' ? (
                <LoginActionButton />
            ) : (
                <SignupActionButton />
            )}
        </form>
    )
}

function LoginActionButton() {
    return (
        <div className="w-full space-y-2">
            <MainButton solid="strong" buttonType="submit">
                登入
            </MainButton>

            <Link
                href="/auth/signup"
                className="group relative m-6 mx-auto block w-max pb-1 text-sm"
            >
                <span className="relative z-10 px-2 group-hover:text-gray-dark">
                    註冊帳號
                </span>
                <span className="absolute bottom-0 left-0 z-0 h-0.5 w-full bg-accent transition-all group-hover:h-full "></span>
            </Link>
        </div>
    )
}

function SignupActionButton() {
    return (
        <div className="w-full space-y-2">
            <MainButton solid="strong" buttonType="submit">
                註冊
            </MainButton>

            <Link
                href="/auth/login"
                className="group relative m-6 mx-auto block w-max pb-1 text-sm"
            >
                <span className="relative z-10 px-2 group-hover:text-gray-dark">
                    登入
                </span>
                <span className="absolute bottom-0 left-0 z-0 h-0.5 w-full bg-accent transition-all group-hover:h-full "></span>
            </Link>
        </div>
    )
}
