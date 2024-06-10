import {
    RefObject,
    ChangeEventHandler,
    useRef,
    Dispatch,
    useState,
} from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from '@nextui-org/react'
import toast from 'react-hot-toast'
import FileInput from '@/components/Form/FormComponents/FileInput'
import { uploadAvatar } from '@/service/auth.service'
import { useSessionUser } from '@/lib/utils'

export default function UploadAvatarModal({
    isOpen,
    onOpen,
    onOpenChange,
    fileInputRef,
    setAvatarUrl,
    onClose,
}: {
    fileInputRef: RefObject<HTMLInputElement>
    isOpen: boolean
    onOpen: () => void
    onOpenChange: () => void
    setAvatarUrl: Dispatch<string>
    onClose: () => void
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const formDataRef = useRef<FormData | null>(null)
    const user = useSessionUser()
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append('file', file, file.name)
            formDataRef.current = formData
        }
    }

    const onSubmit = async () => {
        if (formDataRef.current) {
            setIsLoading(true)
            uploadAvatar(formDataRef.current, user!.token)
                .then((url) => {
                    setAvatarUrl(url)
                    onClose()
                })
                .catch((err) => {
                    if (err.statusCode === 400) {
                        toast.error('圖片長寬不符合 1:1')
                    } else {
                        toast.error('伺服器有誤，麻煩稍後再試！')
                    }
                })
            setIsLoading(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            上傳大頭貼
                        </ModalHeader>
                        <ModalBody>
                            <FileInput
                                ref={fileInputRef}
                                label="上傳大頭貼"
                                onChange={handleFileChange}
                                crop={true}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="text-error"
                                variant="light"
                                onPress={onClose}
                            >
                                取消
                            </Button>
                            <Button
                                isLoading={isLoading}
                                color="primary"
                                onPress={onSubmit}
                            >
                                送出
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
