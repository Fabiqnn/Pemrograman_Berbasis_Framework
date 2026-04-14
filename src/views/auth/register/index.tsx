import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./register.module.scss"

export default function TampilanRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const {push} = useRouter();
    const [error, setError] = useState({email:"", password:""});
    const [serverErr, setServerErr] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError({email:"", password:""});
        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const fullname = formData.get("fullname") as string;
        const password = formData.get("password") as string;
        if (!email) {
            setIsLoading(false);
            setError({
                email:"Field email tidak boleh kosong",
                password:""
            });
            return;
        } 
        
        if (password.length < 6) {
            setIsLoading(false);
            setError({
                email:"",
                password:"Password tidak boleh kurang dari 6 karakter!"
            });
            return;
        }
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, fullname, password})
        });
        if (response.status === 200) {
            form.reset();
            setIsLoading(false);
            push("/auth/login");
        } else {
            setIsLoading(false);
            setServerErr(
                response.status === 400 ? "Email already exists" : "An error occured",
            );
        }
    };
    
    return(
        <div className={styles.register}>
            {serverErr && <p className={styles.register__error}>{serverErr}</p>}
            <h1 className={styles.register__title}>Halaman Register</h1>
            <div className={styles.register__form}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.register__form__item}>
                        <label htmlFor="email" className={styles.register__form__item__label}>Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" className={styles.register__form__item__input}/>
                        {error.email && <p className={styles.register__error}>{error.email}</p>}
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="fullname" className={styles.register__form__item__label}>Fullname</label>
                        <input type="text" id="fullname" name="fullname" placeholder="Fullname" className={styles.register__form__item__input} required />
                    </div>
                    <div className={styles.register__form__item}>
                        <label htmlFor="password" className={styles.register__form__item__label}>Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" className={styles.register__form__item__input} required />
                        {error.password && <p className={styles.register__error}>{error.password}</p>}
                    </div>
                    <button type="submit" className={styles.register__form__item__button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
                </form>
                <br />
                {serverErr && <p className={styles.register__form__item__text}>{serverErr}</p>}
                <p className={styles.register__form__item__text}>Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link></p>
            </div>
        </div>
    )
}
