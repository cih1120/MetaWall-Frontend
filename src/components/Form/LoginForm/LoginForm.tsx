'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ISignInReq } from '@/service/types'
import Input from '@/components/Form/FormComponents/Input'
import AuthFormLayout, { setErrorMessage } from '../AuthForm'

export default function LoginForm() {
    const router = useRouter()

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
        const result = await signIn('credentials', {
            redirect: false,
            ...data,
        })
        if (result?.error) {
            setErrorMessage(errorConfig, setError, result.error)
        } else {
            toast.success('登入成功🎉 請等待跳轉！')
            setTimeout(() => {
                router.push('/')
            }, 1000)
        }
    }

    return (
        <AuthFormLayout formType="login" onSubmit={handleSubmit(onSubmit)}>
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
        </AuthFormLayout>
    )
}
