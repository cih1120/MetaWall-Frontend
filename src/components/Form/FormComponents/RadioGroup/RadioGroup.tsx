import { forwardRef, Dispatch } from 'react'
import { RadioGroup, Radio } from '@nextui-org/react'

export interface ICustomRadioGroupProps {
    radioArray: Array<{ label: string; value: string }>
    value: string
    setValue: Dispatch<string>
}

const CustomRadioGroup = forwardRef<HTMLInputElement, ICustomRadioGroupProps>(
    ({ radioArray, value, setValue, ...props }, ref) => {
        return (
            <RadioGroup
                value={value}
                onValueChange={setValue}
                orientation="horizontal"
                {...props}
            >
                {radioArray.map((radio) => {
                    return (
                        <Radio key={radio.value} value={radio.value}>
                            {radio.label}
                        </Radio>
                    )
                })}
            </RadioGroup>
        )
    }
)

CustomRadioGroup.displayName = 'CustomRadioGroup'
export default CustomRadioGroup
