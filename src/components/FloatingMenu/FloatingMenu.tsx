'use client'
import { useResponsiveBreakpoint } from '@/lib/hooks'
import Aside from './Aside'
import TabMenu from './TabMenu'

export default function FloatingMenu() {
    const isAboveMdBreakpoint = useResponsiveBreakpoint('md')
    return <>{isAboveMdBreakpoint ? <Aside /> : <TabMenu />}</>
}
