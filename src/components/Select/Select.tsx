'use client'
import { Select, SelectItem } from '@nextui-org/react'
type SelectProps = {
    value: string
    label: string
}
export default function CustomSelect({
    data,
    onChange,
}: {
    data: SelectProps[]
    onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined
}) {
    return (
        <>
            <Select
                aria-label="Select"
                labelPlacement="outside"
                placeholder="Select an animal"
                radius="none"
                classNames={{
                    base: 'h-fit border-2 border-gray-dark min-w-[156px]',
                    popoverContent: 'border-2 border-gray-dark rounded-none',
                }}
                defaultSelectedKeys={['desc']}
                onChange={onChange}
            >
                {data.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
        </>
    )
}
