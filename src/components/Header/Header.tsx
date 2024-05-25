import DropMenu from './DropMenu'

export default function Header() {
    return (
        <header className="border-0 border-b-3 border-gray-dark bg-white px-2 py-4">
            <div className="mx-auto flex max-w-[872px] justify-between">
                <h1 className="font-paytoneOne text-2xl">MetaWall</h1>
                <DropMenu />
            </div>
        </header>
    )
}
