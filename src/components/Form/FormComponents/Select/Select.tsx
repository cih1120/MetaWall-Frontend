'use client'
import React, { Dispatch } from 'react'
import { Select, SelectItem } from '@nextui-org/react'
type SelectProps = {
    value: string
    label: string
}
export default function CustomSelect({
    data,
    setValue,
    values,
}: {
    data: SelectProps[]
    setValue: Dispatch<any>
    values: string
}) {
    const handleSelectionChange: React.ChangeEventHandler<HTMLSelectElement> = (
        e
    ) => {
        setValue(e.target.value)
    }

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
                selectedKeys={[values]}
                onChange={handleSelectionChange}
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
