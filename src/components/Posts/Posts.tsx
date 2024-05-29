'use client'
import React, { useEffect, useState } from 'react'
import Select from '@/components/Form/FormComponents/Select'
import SearchBar from '@/components/Posts/SearchBar'
import Post from '@/components/Posts/Post'
import { IPost, TIME_SORT } from '@/types'
import { getPosts } from '@/service/posts.service'
import { getSessionUser } from '@/lib/utils'

export default function Posts({ posts }: { posts: IPost[] }) {
    const data: { value: TIME_SORT; label: string }[] = [
        { value: TIME_SORT.DESC, label: '最新' },
        { value: TIME_SORT.ASC, label: '最舊' },
    ]
    const [timeSort, setTimeSort] = React.useState(TIME_SORT.DESC)
    const [filterPost, setFilterPost] = useState<IPost[]>([])
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const user = getSessionUser()

    const getFilterPost = () => {
        setIsLoading(true)
        const currentQuery = query
        getPosts(user!.token, { timeSort, q: currentQuery }).then((res) => {
            setIsLoading(false)
            setFilterPost(res)
        })
    }

    useEffect(() => {
        getFilterPost()
    }, [timeSort])

    useEffect(() => {
        setFilterPost(posts)
    }, [posts])

    return (
        <>
            <div className="flex gap-3">
                <Select values={timeSort} data={data} setValue={setTimeSort} />
                <SearchBar
                    value={query}
                    setValue={setQuery}
                    searchEvent={getFilterPost}
                />
            </div>
            <ul className="flex flex-col gap-4 p-4">
                {isLoading ? (
                    <Post />
                ) : (
                    filterPost.map((post) => {
                        return <Post data={post} key={post._id} />
                    })
                )}
            </ul>
        </>
    )
}
