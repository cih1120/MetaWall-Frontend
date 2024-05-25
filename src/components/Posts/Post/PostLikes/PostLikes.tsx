import { HandThumbUpIcon } from '@heroicons/react/24/outline'
import { IPost } from "@/types"

export default function PostLikes ({ likes }: { likes: IPost['likes'] }) {
  return (
      <div className="flex gap-2">
          {likes === 0 ? (
              <>
                  <HandThumbUpIcon className="size-6 text-primary" />
                  <p className="text-sm">{likes}</p>
              </>
          ) : (
              <>
                  <HandThumbUpIcon className="size-6 text-gray" />
                  <p className="text-gray">成為第一個按讚的朋友</p>
              </>
          )}
      </div>
  )
}