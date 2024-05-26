'use client'
import { Dispatch } from 'react'
import { Button } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Input from '@/components/Form/FormComponents/Input'

export default function SearchBar({
    value,
    setValue,
    searchEvent,
}: {
    value: string
    setValue: Dispatch<string>
    searchEvent: () => void
}) {
    return (
        <div className="flex h-fit w-full border-2 border-gray-dark">
            <Input
                isCombine
                placeholder="搜尋貼文內容"
                value={value}
                setValue={setValue}
            />
            <Button
                onClick={searchEvent}
                className="rounded-none border-l-2 border-gray-dark bg-primary text-white"
            >
                <MagnifyingGlassIcon className="size-6" />
            </Button>
        </div>
    )
}
