'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ISignInReq } from '@/service/types'
import Input from '@/components/Form/FormComponents/Input'
import AuthFormLayout, { setErrorMessage } from '../AuthForm'
import MainButton from '@/components/Form/FormComponents/MainButton'

export default function LoginForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<ISignInReq>({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const errorConfig = {
        406: {
            fieldName: 'email',
            type: 'emailNotFound',
            message: '找不到該Email',
        },
        407: {
            fieldName: 'password',
            type: 'passwordWrong',
            message: '密碼錯誤',
        },
    }

    const onSubmit: SubmitHandler<ISignInReq> = async (data) => {
        setIsLoading(true)
        const result = await signIn('credentials', {
            redirect: false,
            ...data,
        })
        if (result?.error) {
            setErrorMessage(errorConfig, setError, result.error)
            setIsLoading(false)
        } else {
            toast.success('登入成功🎉 請等待跳轉！', {
                duration: 1000,
            })
            setTimeout(() => {
                router.push('/')
            }, 500)
        }
    }

    return (
        <AuthFormLayout onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        value={field.value}
                        setValue={field.onChange}
                        label="Email"
                        type="email"
                        autoComplete="email"
                        isInvalid={!!errors.email}
                        errorMessage={errors.email && errors.email?.message}
                        {...register('email', {
                            required: '請填寫email',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'email 格式錯誤',
                            },
                        })}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <Input
                        value={field.value}
                        setValue={field.onChange}
                        label="密碼"
                        type="password"
                        isInvalid={!!errors.password}
                        errorMessage={
                            errors.password && errors.password?.message
                        }
                        {...register('password', {
                            required: '請填寫密碼',
                            minLength: {
                                value: 8,
                                message: '密碼長度最小為8碼',
                            },
                        })}
                    />
                )}
            />
            <div className="w-full space-y-2">
                <MainButton
                    isLoading={isLoading}
                    solid="strong"
                    buttonType="submit"
                >
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
        </AuthFormLayout>
    )
}
