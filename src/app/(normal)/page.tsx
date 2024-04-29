import Select from '@/components/Select'
import SearchBar from '@/components/SearchBar'
import Aside from '@/components/Aside'
import Post from '@/components/Post'

export default function IndexPage() {
    const placements = ['inside', 'outside', 'outside-left']
    const data = [
        { value: 'desc', label: '最新' },
        { value: 'asc', label: '最舊' },
        { value: 'most_popular', label: '最熱門' },
        { value: 'least_popular', label: '最冷門' },
    ]

    const posts = [
        {
            author: {
                id: 'string2',
                avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                name: '邊緣那Na',
            },
            id: 'string',
            content: '好冷！',
            date: new Date(),
            likes: 0,
        },
        {
            author: {
                id: 'string2',
                avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                name: '邊緣那Na',
            },
            id: 'string2',
            content: '好冷！1',
            date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            likes: 50,
            photo: 'https://images.unsplash.com/photo-1713453062856-6e8bb34d0520?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            comments: [
                {
                    author: {
                        id: 'string2',
                        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                        name: '邊緣那Na',
                    },
                    id: 'string',
                    content: '好冷！',
                    date: new Date(),
                },
                {
                    author: {
                        id: 'string2',
                        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                        name: '邊緣那Na',
                    },
                    id: 'string',
                    content: '好冷！',
                    date: new Date(),
                },
                {
                    author: {
                        id: 'string2',
                        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                        name: '邊緣那Na',
                    },
                    id: 'string',
                    content: '好冷！',
                    date: new Date(),
                },
            ],
        },
        {
            author: {
                id: 'string3',
                avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                name: '邊緣那Na',
            },
            id: 'string3',
            content: '好冷！3',
            date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            likes: 50,
            photo: 'https://images.unsplash.com/photo-1713453062856-6e8bb34d0520?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            comments: [
                {
                    author: {
                        id: 'string3',
                        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                        name: '邊緣那Na',
                    },
                    id: 'string',
                    content: '好冷！',
                    date: new Date(),
                },
            ],
        },
    ]

    return (
        <section className="flex w-full gap-6">
            <div className="shrink-0 basis-8/12">
                <div className="flex gap-3">
                    <Select data={data} />
                    <SearchBar />
                </div>
                <ul className="flex flex-col gap-4 p-4">
                    {posts.map((post) => {
                        return <Post data={post} key={post.id} />
                    })}
                </ul>
            </div>
            <div className="w-full shrink grow">
                <Aside />
            </div>
        </section>
    )
}
