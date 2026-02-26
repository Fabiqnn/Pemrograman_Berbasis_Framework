import Link from "next/link";
import { useRouter } from "next/router";

export default function hamanLogin() {
    const {push} = useRouter();
    const handlerLogin = () => {
        localStorage.setItem("isLogin", "true");
        push('/produk')
    }
    return (
        <>
            <h1>Halaman Login</h1>
            <form action="">
                <label htmlFor="uname">Username</label><br />
                <input type="text" id="uname"/> <br />
                <button type="button" onClick={handlerLogin}>Kirim</button>
            </form>
            <Link href={'/auth/register'}>Ke Halaman Register</Link>
        </>
    )
}