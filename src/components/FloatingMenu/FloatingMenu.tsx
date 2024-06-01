'use client'
import React, { ReactNode } from 'react'
import { useResponsiveBreakpoint } from '@/lib/hooks'
import Aside from './Aside'
import TabMenu from './TabMenu'

interface BaseTabMenu {
    icon: ReactNode
    value?: string
}

interface LinkTabMenu extends BaseTabMenu {
    type: 'link'
    url: string
}

interface ModalTabMenu extends BaseTabMenu {
    type: 'modal'
    onClick: () => void
}

export type MenuType = LinkTabMenu | ModalTabMenu

export default function FloatingMenu() {
    const isAboveMdBreakpoint = useResponsiveBreakpoint('md')
    return <>{isAboveMdBreakpoint ? <Aside /> : <TabMenu />}</>
}
