'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Select from '@/components/Form/FormComponents/Select'
import SearchBar from '@/components/Posts/SearchBar'
import Post from '@/components/Posts/Post'
import { IPost, IUser, TIME_SORT } from '@/types'
import { getPosts, getPostByUser } from '@/service/posts.service'
import { getSessionUser } from '@/lib/utils'

export default function Posts({
    posts,
    userId,
}: {
    posts: IPost[]
    userId?: IUser['_id']
}) {
    const data: { value: TIME_SORT; label: string }[] = [
        { value: TIME_SORT.DESC, label: '最新' },
        { value: TIME_SORT.ASC, label: '最舊' },
    ]
    const [timeSort, setTimeSort] = React.useState(TIME_SORT.DESC)
    const [filterPost, setFilterPost] = useState<IPost[]>([])
    const [query, setQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const currentUser = getSessionUser()

    const refreshPosts = async () => {
        setIsLoading(true)
        const res = await getPostsApi()
        setIsLoading(false)
        setFilterPost(res)
    }

    const getPostsApi = useCallback(() => {
        const currentQuery = query
        if (userId) {
            return getPostByUser(currentUser!.token, userId, {
                timeSort,
                q: currentQuery,
            })
        } else {
            return getPosts(currentUser!.token, { timeSort, q: currentQuery })
        }
    }, [userId, query, timeSort])

    useEffect(() => {
        refreshPosts()
    }, [timeSort])

    useEffect(() => {
        setFilterPost(posts)
    }, [posts])

    return (
        <>
            <div className="w-fll flex flex-col gap-3 md:flex-row">
                <Select values={timeSort} data={data} setValue={setTimeSort} />
                <SearchBar
                    value={query}
                    setValue={setQuery}
                    searchEvent={refreshPosts}
                />
            </div>
            <ul className="flex flex-col gap-4 py-4 md:px-4">
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
