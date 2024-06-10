import { forwardRef, Dispatch } from 'react'
import { Input } from '@nextui-org/react'

export interface ICustomInputProps {
    value: string
    setValue: Dispatch<string>
    type?: string
    isCombine?: boolean // 如果為input group就不加上Border
    [k: string]: any
}

const CustomInput = forwardRef<HTMLInputElement, ICustomInputProps>(
    ({ value, setValue, type, isCombine, ...props }, ref) => {
        const inputWrapper = isCombine ? '' : 'border-2 border-gray-dark'
        return (
            <Input
                ref={ref}
                type={type ? type : 'text'}
                classNames={{
                    inputWrapper,
                }}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                radius="none"
                {...props}
            />
        )
    }
)

CustomInput.displayName = 'CustomInput'
export default CustomInput
