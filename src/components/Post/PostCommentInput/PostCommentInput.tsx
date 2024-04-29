import { Avatar, Input, Button } from '@nextui-org/react'

export default function PostCommentInput() {
    return (
        <div className="mt-3 flex items-center gap-2">
            <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                className="h-10 w-10"
            />
            <div className="flex h-fit w-full border-2 border-gray-dark">
                <Input
                    type="text"
                    placeholder="留言..."
                    classNames={{
                        inputWrapper: 'rounded-none',
                    }}
                />
                <Button className="rounded-none border-l-2 border-gray-dark bg-primary text-white">
                    留言
                </Button>
            </div>
        </div>
    )
}
