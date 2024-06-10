import {
    forwardRef,
    ChangeEventHandler,
    ChangeEvent,
    useState,
    useRef,
} from 'react'
import { Button } from '@nextui-org/react'
import {
    ArrowUpTrayIcon,
    TrashIcon,
    ScissorsIcon,
} from '@heroicons/react/24/solid'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { dataUrlToFileUsingFetch } from '@/lib/utils'

interface IFileInputProps {
    label: string
    onChange: ChangeEventHandler<HTMLInputElement>
    crop?: boolean // 可選的Crop ，控制是否要打開1:1裁剪功能
}

const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
    ({ label, onChange, crop, ...props }, ref) => {
        const [previewUrl, setPreviewUrl] = useState<string | null>(null)
        const [isCropping, setIsCropping] = useState<boolean>(false)
        const fileInputRef = ref as React.RefObject<HTMLInputElement>

        const cropperRef = useRef<ReactCropperElement>(null)

        const handleOnChange: ChangeEventHandler<HTMLInputElement> = async (
            event
        ) => {
            if (event.target.files && event.target.files.length > 0) {
                const file = event.target.files[0]
                const objectUrl = URL.createObjectURL(file)
                setPreviewUrl(objectUrl)
                if (crop) {
                    setIsCropping(true)
                }
            }
            onChange(event)
        }

        const handleButtonClick = () => {
            if (!isCropping) {
                fileInputRef.current?.click()
            }
        }

        const handleReset = () => {
            setPreviewUrl(null)
            setIsCropping(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }

        const handleCrop = async () => {
            if (cropperRef.current && cropperRef.current.cropper) {
                const croppedCanvas =
                    cropperRef.current.cropper.getCroppedCanvas()
                const croppedImage = croppedCanvas.toDataURL('image/jpeg')
                const croppedFile = await dataUrlToFileUsingFetch(
                    croppedImage,
                    'output.jpeg',
                    'image/jpeg'
                )

                const fileList = {
                    0: croppedFile,
                    length: 1,
                    item: (index: number) => croppedFile,
                    [Symbol.iterator]: function* () {
                        yield croppedFile
                    },
                } as unknown as FileList
                const event = {
                    target: {
                        files: fileList,
                    },
                } as ChangeEvent<HTMLInputElement>
                onChange(event) // 將裁減後的圖片傳給父組件
                setPreviewUrl(croppedImage)
                setIsCropping(false)
            }
        }

        return (
            <div className="w-full">
                {/* 上傳用的file input，預設隱藏讓自定義的Button來觸發 */}
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
                    {previewUrl ? (
                        <div className="relative">
                            {isCropping ? (
                                <>
                                    <Cropper
                                        src={previewUrl || ''}
                                        style={{
                                            width: '100%',
                                        }}
                                        zoomTo={0.5}
                                        minCanvasWidth={300}
                                        minContainerWidth={300}
                                        viewMode={2}
                                        background={false}
                                        aspectRatio={1 / 1}
                                        guides={false}
                                        ref={cropperRef}
                                    />
                                    <Button
                                        isIconOnly
                                        radius="sm"
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                                        variant="faded"
                                        onClick={handleCrop}
                                    >
                                        <ScissorsIcon className="size-5 text-black" />
                                    </Button>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
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

FileInput.displayName = 'FileInput'
export default FileInput
