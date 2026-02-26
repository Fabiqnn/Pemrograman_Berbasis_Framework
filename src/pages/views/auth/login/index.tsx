import Link from "next/link";
import { useRouter } from "next/router";
// import styles from './login.module.css'
import styles from './login.module.scss'

export default function TampilanLogin() {
    const {push} = useRouter();
    const handlerLogin = () => {
        localStorage.setItem("isLogin", "true");
        push('/produk')
    }
    return (
        <div className={styles.login}>
            <h1 className="text-3xl font-bold text-blue-600">Halaman Login</h1>
            <label htmlFor="uname">Username</label><br />
            <input type="" id="uname"/> <br />
            <button type="button" onClick={handlerLogin}>Kirim</button>
            <h1 style={{color:"red",border:"1px solid red",borderRadius:"5px",padding:"5px"}}>
                Belum Punya Akun</h1>
            <Link href={'/auth/register'}>Ke Halaman Register</Link>
        </div>
    )
}