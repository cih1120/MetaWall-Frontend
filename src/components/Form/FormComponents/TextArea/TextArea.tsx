import { Dispatch, forwardRef } from 'react'
import { Textarea } from '@nextui-org/react'

interface ITextAreaProps {
    value: string
    setValue: Dispatch<string>
    placeholder: string
}

const TextArea = forwardRef<HTMLInputElement, ITextAreaProps>(
    ({ value, setValue, placeholder, ...props }, ref) => {
        return (
            <Textarea
                labelPlacement="outside"
                placeholder={placeholder}
                className="w-full"
                radius="sm"
                value={value}
                onValueChange={setValue}
                classNames={{ inputWrapper: 'border-2 border-gray-dark' }}
                {...props}
            />
        )
    }
)

TextArea.displayName = 'TextArea'
export default TextArea
