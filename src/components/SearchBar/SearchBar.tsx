'use client'
import { Input, Button } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function SearchBar() {
    return (
        <div className="flex h-fit w-full  border-2 border-gray-dark">
            <Input
                type="text"
                placeholder="搜尋貼文"
                classNames={{
                    inputWrapper: 'rounded-none',
                }}
            />
            <Button className="rounded-none border-l-2 border-gray-dark bg-primary text-white">
                <MagnifyingGlassIcon className="size-6" />
            </Button>
        </div>
    )
}
