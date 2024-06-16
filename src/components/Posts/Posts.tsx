'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Select from '@/components/Form/FormComponents/Select'
import SearchBar from '@/components/Posts/SearchBar'
import Post from '@/components/Posts/Post'
import { IPost, IUser, TIME_SORT } from '@/types'
import { getPosts, getPostByUser } from '@/service/posts.service'
import { debounce, useSessionUser } from '@/lib/utils'

export default function Posts({
    posts,
    userId,
}: {
    posts: IPost[]
    userId?: IUser['id']
}) {
    const currentUser = useSessionUser()

    // 時間排序選項
    const data: { value: TIME_SORT; label: string }[] = [
        { value: TIME_SORT.DESC, label: '最新' },
        { value: TIME_SORT.ASC, label: '最舊' },
    ]
    const [timeSort, setTimeSort] = React.useState(TIME_SORT.DESC)
    const [filterPost, setFilterPost] = useState<IPost[]>([])
    const [query, setQuery] = useState('')
    const page = useRef<number>(1)
    const [isLoading, setIsLoading] = useState(true)
    const [hasMore, setHasMore] = useState(true)
    const [initialLoad, setInitialLoad] = useState(true)

    // 根據是否有userId，判斷取得所有貼文還是用戶貼文
    const getPostsApi = useCallback(() => {
        const currentQuery = query
        const currentTimeSort = timeSort
        const postSearchQuery = {
            timeSort: currentTimeSort,
            q: currentQuery,
            page: page.current,
        }

        if (userId) {
            // 取得特定用戶的貼文
            return getPostByUser(currentUser!.token, userId, postSearchQuery)
        } else {
            // 取得所有用戶貼文
            return getPosts(currentUser!.token, postSearchQuery)
        }
    }, [userId, query, timeSort])

    // 刷新貼文與更新頁面狀態
    const refreshPosts = useCallback(async () => {
        setIsLoading(true)
        const res = await getPostsApi()
        setIsLoading(false)
        setFilterPost((prevPosts) => [...prevPosts, ...res])
        if (res.length < 5) {
            setHasMore(false)
        }
    }, [getPostsApi, filterPost])

    // 加載更多貼文
    const loadMorePosts = useCallback(async () => {
        if (!hasMore || isLoading) return
        page.current += 1
        await refreshPosts()
    }, [hasMore, isLoading, refreshPosts])

    const searchPostsEvent = async () => {
        initPostPageStatus()
        await refreshPosts()
    }

    const initPostPageStatus = () => {
        page.current = 1
        setHasMore(true)
        setFilterPost([])
    }

    // 當網頁滾到底部時fetch下一頁的Post，直到hasMore為false
    useEffect(() => {
        const loadMorePost = debounce(() => {
            if (
                window.innerHeight + document.documentElement.scrollTop >
                document.documentElement.offsetHeight - 50
            ) {
                loadMorePosts()
            }
        }, 200)
        window.addEventListener('scroll', loadMorePost)

        return () => {
            window.removeEventListener('scroll', loadMorePost)
        }
    }, [loadMorePosts, isLoading, hasMore])

    // 當timeSort改變時刷新貼文
    useEffect(() => {
        if (!initialLoad) {
            initPostPageStatus()
            refreshPosts()
        } else {
            setInitialLoad(false)
        }
    }, [timeSort])

    // 初次載入用
    useEffect(() => {
        setFilterPost(posts)
        setIsLoading(false)
    }, [posts])

    return (
        <>
            <div className="w-fll flex flex-col gap-3 md:flex-row">
                <Select values={timeSort} data={data} setValue={setTimeSort} />
                <SearchBar
                    value={query}
                    setValue={setQuery}
                    searchEvent={searchPostsEvent}
                />
            </div>
            <ul className="flex flex-col gap-4 py-4 md:px-4">
                {filterPost.map((post) => {
                    return <Post data={post} key={post.id} />
                })}
                {isLoading && hasMore && <Post />}
            </ul>
            {!hasMore && (
                <p className="text-center">¯\_(ツ)_/¯ 沒有更多貼文啦！</p>
            )}
        </>
    )
}
