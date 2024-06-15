'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ImageLightBox({
    photoUrl,
}: {
    photoUrl: string | undefined
}) {
    const router = useRouter()
    return (
        <section
            onClick={() => router.back()}
            className=" z-999 fixed inset-0 h-screen w-screen bg-black/45"
        >
            {photoUrl && (
                <Image
                    src={photoUrl}
                    width={500}
                    height={500}
                    alt=""
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            )}
        </section>
    )
}
