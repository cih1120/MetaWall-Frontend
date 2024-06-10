'use client'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import EditName from './EditName'
import ResetPassword from './ResetPassword'

export default function EditProfile() {
    return (
        <Tabs
            aria-label="Options"
            classNames={{
                base: 'bg-transparent',
                tabList: 'gap-0  w-full relative bg-transparent py-0 px-2',
                cursor: 'w-full bg-black rounded-t-none rounded-b-none',
                tab: 'max-w-fit px-4 h-12 bg-white rounded-b-none rounded-t-md border-black border-x-2 border-t-2',
                tabContent: 'group-data-[selected=true]:text-white',
                panel: 'p-0',
            }}
        >
            <Tab key="editProfile" title="暱稱修改">
                <EditName />
            </Tab>
            <Tab key="resetPassword" title="重設密碼">
                <ResetPassword />
            </Tab>
        </Tabs>
    )
}
