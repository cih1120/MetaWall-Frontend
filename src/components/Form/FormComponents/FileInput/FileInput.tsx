import { forwardRef, Dispatch, ChangeEventHandler, useState } from 'react'
import { Button } from '@nextui-org/react'
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/solid'

interface IFileInputProps {
    label: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
    ({ label, onChange, ...props }, ref) => {
        const [selectedFile, setSelectedFile] = useState<File | null>(null)
        const [previewUrl, setPreviewUrl] = useState<string | null>(null)
        const handleOnChange: ChangeEventHandler<HTMLInputElement> = (
            event
        ) => {
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0]
                setSelectedFile(file)
                const objectUrl = URL.createObjectURL(file)
                setPreviewUrl(objectUrl)
                onChange(event) // 傳遞給父組件
            }
        }

        const handleButtonClick = () => {
            ;(ref as React.RefObject<HTMLInputElement>).current?.click()
        }

        const handleReset = () => {
            setSelectedFile(null)
            setPreviewUrl(null)
        }

        return (
            <div className="w-full">
                <input
                    type="file"
                    ref={ref}
                    onChange={handleOnChange}
                    {...props}
                    className="hidden"
                    accept="image/png, image/jpeg, image/jpg"
                />
                <div
                    className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2  border-dashed px-4 py-2 hover:bg-accent/15"
                    onClick={handleButtonClick}
                >
                    {selectedFile ? (
                        <div className="relative">
                            <img
                                src={previewUrl || ''}
                                alt="Preview"
                                className=""
                            />
                            <Button
                                isIconOnly
                                radius="sm"
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                                variant="faded"
                                onClick={handleReset}
                            >
                                <TrashIcon className="size-5 text-black" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            radius="sm"
                            className="border-2 border-gray-dark bg-accent"
                            onClick={handleButtonClick}
                        >
                            <ArrowUpTrayIcon className="size-5 " />
                            {label}
                        </Button>
                    )}
                </div>
            </div>
        )
    }
)

export default FileInput
