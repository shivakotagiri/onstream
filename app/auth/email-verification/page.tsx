import { EmailVerificationForm } from "../components/email-verification-form";

export default async function EmailVerificationPage() {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <EmailVerificationForm />
        </div>
    )
}