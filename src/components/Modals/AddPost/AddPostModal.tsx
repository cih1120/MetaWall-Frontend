'use client'
import { useEffect, useMemo, useRef, useState, ChangeEventHandler } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
} from '@nextui-org/react'
import toast from 'react-hot-toast'
import { useSessionUser } from '@/lib/utils'
import { revalidateIndexPost } from '@/lib/action'
import MainButton from '@/components/Form/FormComponents/MainButton'
import TextArea from '@/components/Form/FormComponents/TextArea'
import { addPostModalStore } from '@/store/modal/modalStore'
import { addPost, uploadPhoto } from '@/service/posts.service'
import FileInput from '@/components/Form/FormComponents/FileInput'

export default function AddPostModal() {
    const user = useSessionUser()
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const { init } = addPostModalStore()
    useEffect(() => {
        init(isOpen, onOpen, onOpenChange)
    }, [init, isOpen, onOpen, onOpenChange])

    const [postTitle, setPostTitle] = useState('')
    const [postContent, setPostContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const formDataRef = useRef<FormData | null>(null)

    const isSubmitDisabled = useMemo(() => {
        return postContent.trim().length == 0 || postTitle.trim().length == 0
    }, [postTitle, postContent])

    const onSubmit = async () => {
        try {
            if (isSubmitDisabled || !user) {
                return
            }
            setIsLoading(true)
            let photoUrl
            if (formDataRef.current) {
                photoUrl = await uploadPhoto(formDataRef.current, user.token)
            }

            await addPost(
                { title: postTitle, content: postContent, photo: photoUrl },
                user.token
            )
            setPostTitle('')
            setPostContent('')
            toast.success('新增成功！')
            setIsLoading(false)
            await revalidateIndexPost()
            onClose()
        } catch {
            toast.error('系統錯誤，請稍後重新嘗試。')
        }
    }

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('', file, file.name)
            formDataRef.current = formData
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            placement="center"
            radius="sm"
            size="lg"
            classNames={{ base: 'border-2 border-gray-dark' }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            張貼動態
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <Input
                                    autoFocus
                                    type="text"
                                    variant="underlined"
                                    placeholder="貼文標題"
                                    classNames={{ innerWrapper: 'pb-0' }}
                                    className="mb-4"
                                    value={postTitle}
                                    onChange={(e) =>
                                        setPostTitle(e.target.value)
                                    }
                                />
                                <TextArea
                                    value={postContent}
                                    setValue={setPostContent}
                                    placeholder="想說些什麼？"
                                />
                                <div className="mt-2">
                                    <FileInput
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        label="上傳圖片"
                                    />
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <MainButton
                                background="normal"
                                solid="strong"
                                className=" px-4 py-2"
                                isDisabled={isSubmitDisabled || isLoading}
                                onClick={onSubmit}
                                isLoading={isLoading}
                            >
                                發佈
                            </MainButton>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
