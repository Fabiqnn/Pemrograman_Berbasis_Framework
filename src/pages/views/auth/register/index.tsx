import Link from "next/link";
import styles from "./register.module.scss"

export default function TampilanRegister() {
    return(
        <div className={styles.register}>
            <h1>Halaman Register</h1>
            <form action="" className={styles.form_regis}>
                <div className={styles.input}>
                    <label htmlFor="nama">Nama Lengkap</label>
                    <input type="text" id="nama"/>
                </div>
                <div className={styles.input}>
                    <label htmlFor="noInd">No Induk</label>
                    <input type="text" id="noInd"/>
                </div>
                <div className={styles.input}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password"/>
                </div>
                <button type="submit">Daftar</button>
            </form>
            <Link href={"/auth/login"}>Ke Halaman Login</Link>
        </div>
    )
}