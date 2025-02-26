import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
    const { user } = useAuth();
    return (
        <>
            <div>{ user?.username}</div>
        </>
    )
}

