export default function PageTitle({ title }: { title: string }) {
    return (
        <div className="back-rectangle relative z-10 mb-4 w-full">
            <div className="border-2 border-gray-dark bg-white py-5">
                <h2 className="text-md text-center font-bold">{title}</h2>
            </div>
        </div>
    )
}
