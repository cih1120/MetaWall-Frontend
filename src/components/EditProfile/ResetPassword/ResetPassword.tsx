import { useState } from 'react'
import toast from 'react-hot-toast'
import { signOut } from 'next-auth/react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import MainButton from '@/components/Form/FormComponents/MainButton'
import { updatePassword } from '@/service/auth.service'
import { IUpdatePasswordReq } from '@/service/types'
import { getSessionUser } from '@/lib/utils'
import Input from '@/components/Form/FormComponents/Input'

export default function ResetPassword() {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm<IUpdatePasswordReq>({
        defaultValues: { password: '', confirmPassword: '' },
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const user = getSessionUser()

    const onSubmit: SubmitHandler<IUpdatePasswordReq> = async (data) => {
        try {
            setIsLoading(true)
            await updatePassword(data, user!.token)
            toast.success('更新密碼成功🎉請重新登入！')
            signOut()
        } catch (err) {
            toast.error('系統錯誤，請稍後重新嘗試。')
            setIsLoading(false)
        }
    }

    return (
        <div className="card">
            <form
                className="mx-auto flex max-w-80 flex-col items-center gap-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="輸入新密碼"
                            type="password"
                            value={field.value}
                            labelPlacement="outside"
                            placeholder="請輸入新密碼"
                            setValue={field.onChange}
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
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="再次輸入新密碼"
                            type="password"
                            value={field.value}
                            labelPlacement="outside"
                            placeholder="請再次輸入新密碼"
                            setValue={field.onChange}
                            errorMessage={
                                errors.confirmPassword &&
                                errors.confirmPassword?.message
                            }
                            {...register('confirmPassword', {
                                required: '請再次填寫密碼',
                                minLength: {
                                    value: 8,
                                    message: '密碼長度最小為8碼',
                                },
                                validate: (val: string) => {
                                    if (watch('password') !== val) {
                                        return '密碼與確認密碼不符合！'
                                    }
                                },
                            })}
                        />
                    )}
                />

                <MainButton
                    isLoading={isLoading}
                    size="md"
                    solid="strong"
                    className="w-full"
                    buttonType="submit"
                >
                    送出修改
                </MainButton>
            </form>
        </div>
    )
}
