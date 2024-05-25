'use client'
import { useEffect } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Textarea,
} from '@nextui-org/react'
import {addPostModalStore} from '@/store/modal/modalStore'

export default function AddPostModal() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { init } = addPostModalStore()
    useEffect(() => {
        init(isOpen, onOpen, onOpenChange)
    }, [])

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            張貼動態
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <h5>貼文內容</h5>
                                <Textarea
                                    isDisabled
                                    label="Description"
                                    labelPlacement="outside"
                                    placeholder="Enter your description"
                                    defaultValue="NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components."
                                    className="max-w-xs"
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="danger"
                                variant="light"
                                onPress={onClose}
                            >
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
