import SignUpForm from '@/components/Form/SignUpForm'

export default function SignUp() {
    return (
        <div className="flex w-full flex-col justify-center md:gap-y-5">
            <div className="text-center">
                <h1 className="font-paytOne text-5xl font-black text-primary">
                    MetaWall
                </h1>
                <h2 className="text-base font-extrabold">註冊</h2>
            </div>
            <SignUpForm />
        </div>
    )
}
