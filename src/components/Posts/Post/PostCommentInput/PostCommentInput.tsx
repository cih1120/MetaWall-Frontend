import { Input, Button } from '@nextui-org/react'
import Avatar from '@/components/Avatar'
import { useUserStore } from '@/store/user/userStore'
export default function PostCommentInput() {
    const { avatar, name } = useUserStore()
    return (
        <div className="mt-3 flex items-center gap-2">
            <Avatar isBordered={false} src={avatar} name={name} />
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
