import Link from "next/link";

export default function halamanRegister() {
    return(
        <>
            <h1>Halaman Register</h1>
            <Link href={"/auth/login"}>Ke Halaman Login</Link>
        </>
    )
}