'use client'
import { useEffect, useMemo, useState } from 'react'
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
import { getSessionUser } from '@/lib/utils'
import { revalidateIndexPost } from '@/lib/action'
import MainButton from '@/components/Form/FormComponents/MainButton'
import TextArea from '@/components/Form/FormComponents/TextArea'
import { addPostModalStore } from '@/store/modal/modalStore'
import { addPost } from '@/service/posts.service'

export default function AddPostModal() {
    const user = getSessionUser()
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const { init } = addPostModalStore()
    useEffect(() => {
        init(isOpen, onOpen, onOpenChange)
    }, [])

    const [postTitle, setPostTitle] = useState('')
    const [postContent, setPostContent] = useState('')

    const isSubmitDisabled = useMemo(() => {
        return postContent.trim().length == 0 || postTitle.trim().length == 0
    }, [postTitle, postContent])

    const onSubmit = async () => {
        try {
            if (isSubmitDisabled || !user) {
                return
            }
            await addPost(
                { title: postTitle, content: postContent },
                user.token
            )
            setPostTitle('')
            setPostContent('')
            toast.success('新增成功！')
            await revalidateIndexPost()
            onClose()
        } catch {
            toast.error('系統錯誤，請稍後重新嘗試。')
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
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
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <MainButton
                                background="normal"
                                solid="strong"
                                className=" px-4 py-2"
                                isDisabled={isSubmitDisabled}
                                onClick={onSubmit}
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
