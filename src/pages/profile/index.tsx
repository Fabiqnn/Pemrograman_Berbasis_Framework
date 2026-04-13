import { useSession } from "next-auth/react";

export default function HalamanProfile() {
    const {data}:any = useSession();
    return (
        <div>
            <h1>Halaman Profile</h1>
            <h1>Selamat Datang {data?.user?.fullname}</h1>
        </div>
    )
}