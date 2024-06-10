import { useRef, useState, useEffect } from 'react'
import { Button, useDisclosure, RadioGroup, Radio } from '@nextui-org/react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useUserStore } from '@/store/user/userStore'
import { Gender } from '@/types'
import { IUserProfileReq } from '@/service/types'
import { editUserProfile } from '@/service/auth.service'
import { getSessionUser } from '@/lib/utils'
import Avatar from '@/components/Avatar'
import MainButton from '@/components/Form/FormComponents/MainButton'
import UploadAvatarModal from '@/components/Modals/UploadAvatar'
import Input from '@/components/Form/FormComponents/Input'

export default function EditName() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const user = getSessionUser()
    const [name, avatar, gender, init] = useUserStore((state) => [
        state.name,
        state.avatar,
        state.gender,
        state.init,
    ])

    const [avatarUrl, setAvatarUrl] = useState<string>('')

    const gendersArray: {
        value: Gender
        label: string
    }[] = [
        {
            value: 'female',
            label: '生理女',
        },
        {
            value: 'male',
            label: '生理男',
        },
    ]

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<IUserProfileReq>({
        defaultValues: { name, avatar, gender },
    })

    const onSubmit: SubmitHandler<IUserProfileReq> = async (formData) => {
        try {
            setIsLoading(true)
            const data = avatarUrl
                ? { ...formData, avatar: avatarUrl }
                : { ...formData }
            await editUserProfile(data, user!.token)
            toast.success('更新成功！')
            init(data)
        } catch {
            toast.error('伺服器有誤，麻煩稍後再試！')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setValue('name', name)
        setValue('gender', gender)
        setValue('avatar', avatar)
    }, [name])

    useEffect(() => {
        if (avatar) {
            setAvatarUrl(avatar)
        }
    }, [avatar])

    return (
        <div className="card">
            <form
                className="mx-auto flex max-w-80 flex-col items-center gap-5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-col items-center justify-center">
                    <Avatar
                        src={avatarUrl}
                        name={name}
                        className="mb-2 h-20 w-20"
                    />
                    <Button
                        color="primary"
                        radius="none"
                        size="sm"
                        onPress={onOpen}
                    >
                        上傳大頭貼
                    </Button>
                </div>

                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            value={field.value}
                            setValue={field.onChange}
                            label="暱稱"
                            type="text"
                            errorMessage={errors.name && errors.name?.message}
                            {...register('name', {
                                required: '請填寫暱稱',
                                minLength: {
                                    value: 2,
                                    message: '暱稱最少兩個字',
                                },
                                maxLength: {
                                    value: 10,
                                    message: '暱稱不得大於10個字',
                                },
                                pattern: {
                                    value: /^\S*$/,
                                    message: '暱稱出現空白字元',
                                },
                            })}
                        />
                    )}
                />

                <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            label="性別"
                            orientation="horizontal"
                            className="w-full"
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            {gendersArray.map((item) => {
                                return (
                                    <Radio value={item.value} key={item.value}>
                                        {item.label}
                                    </Radio>
                                )
                            })}
                        </RadioGroup>
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

                <UploadAvatarModal
                    setAvatarUrl={setAvatarUrl}
                    fileInputRef={fileInputRef}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onOpenChange={onOpenChange}
                    onClose={onClose}
                />
            </form>
        </div>
    )
}
