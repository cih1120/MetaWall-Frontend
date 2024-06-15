import { Spinner } from '@nextui-org/react'
export default function Loading() {
    return (
        <section className="z-999 fixed inset-0 h-screen w-screen bg-black/80">
            <Spinner
                label="Loading"
                color="warning"
                labelColor="warning"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
        </section>
    )
}
