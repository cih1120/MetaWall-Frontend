import LoginForm from '@/components/Form/LoginForm'

export default async function LoginPage() {
    return (
        <div className="flex w-full flex-col justify-center md:gap-y-5">
            <div className="text-center">
                <h1 className="font-paytOne text-5xl font-black text-primary">
                    MetaWall
                </h1>
                <h2 className="text-base font-extrabold">
                    到元宇宙展開全新社交圈
                </h2>
            </div>
            <LoginForm />
        </div>
    )
}
