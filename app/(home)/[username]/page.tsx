export default function UserDashboardPage({ username }: { username: string }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            hello { username }
        </div>
    )
}