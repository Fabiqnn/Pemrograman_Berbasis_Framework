import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./login.module.scss";
import { signIn } from "next-auth/react";

export default function Tampilanlogin() {
    const [isLoading, setIsLoading] = useState(false);
    const {push, query} = useRouter();

    const callbackUrl: any = query.callbackUrl || "/";
    const [error, setError] = useState({email:"", password:""});
    const [serverErr, setServerErr] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setError({email:"", password:""});
        setServerErr("");
        setIsLoading(true);

        // const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        // const fullname = formData.get("fullname") as string;
        const password = formData.get("password") as string;
        if (!email) {
            setIsLoading(false);
            setError({
                email:"Field email tidak boleh kosong",
                password:""
            });
            return;
        } 
        if (!password) {
            setIsLoading(false);
            setError({
                email:"",
                password:"Field password tidak boleh kosong"
            });
            return;
        } 
        
        // if (password.length < 6) {
        //     setIsLoading(false);
        //     setError({
        //         email:"",
        //         password:"Password tidak boleh kurang dari 6 karakter!"
        //     });
        //     return;
        // }
        // const response = await fetch("/api/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({email, fullname, password})
        // });
        // if (response.status === 200) {
        //     form.reset();
        //     setIsLoading(false);
        //     push("/auth/login");
        // } else {
        //     setIsLoading(false);
        //     setServerErr(
        //         response.status === 400 ? "Email already exists" : "An error occured",
        //     );
        // }
        try {
            const res = await signIn("credentials", {
                redirect: false,
                email: event.target.email.value,
                password: event.target.password.value,
                callbackUrl,
            });

            if (!res?.error) {
                setIsLoading(false);
                push(callbackUrl);
            } else {
                setIsLoading(false);
                setServerErr(res?.error || "Login failed");
            }
        } catch (e) {
            setIsLoading(false);
            setServerErr("Wrong email or password")
        }
    };
    
    return(
        <div className={styles.login}>
            {serverErr && <p className={styles.login__error}>{serverErr}</p>}
            <h1 className={styles.login__title}>Halaman login</h1>
            <div className={styles.login__form}>
                <form onSubmit={handleSubmit} noValidate>
                    <div className={styles.login__form__item}>
                        <label htmlFor="email" className={styles.login__form__item__label}>Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" className={styles.login__form__item__input}/>
                        {error.email && <p className={styles.login__error}>{error.email}</p>}
                    </div>
                    <div className={styles.login__form__item}>
                        <label htmlFor="password" className={styles.login__form__item__label}>Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" className={styles.login__form__item__input} required />
                        {error.password && <p className={styles.login__error}>{error.password}</p>}
                    </div>
                    <button type="submit" className={styles.login__form__item__button} disabled={isLoading}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                    <button 
                        onClick={() => signIn("google", {callbackUrl, redirect: false})}
                        className={styles.login__form__item__button}
                        disabled={isLoading}
                        type="button">
                            {isLoading ? "Loading..." : "Sign in with Google"}
                    </button>
                    <button 
                        onClick={() => signIn("github", {callbackUrl, redirect: false})}
                        className={styles.login__form__item__button}
                        disabled={isLoading}
                        type="button">
                            {isLoading ? "Loading..." : "Sign in with Github"}
                    </button>
                </form>
                <br />
                {serverErr && <p className={styles.login__form__item__text}>{serverErr}</p>}
                <p className={styles.login__form__item__text}>Tidak punya akun? <Link href="/auth/register">Ke Halaman Register</Link></p>
            </div>
        </div>
    )
}
