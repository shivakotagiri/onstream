import LoginForm from "../components/login-form";

export default async function LoginPage() {
    return (
        <div className="w-screen h-screen flex justify-center items-center px-5 sm:px-0">
            <div className="fixed -z-10 hidden lg:flex justify-between xl:w-[95%] w-full font-bold lg:text-[9rem] xl:text-[10rem] 2xl:text-[12rem]">
                <div className="translate-x-5">ONST</div>
                <div>REAM</div>
            </div>
            <LoginForm />
        </div>
    )
}