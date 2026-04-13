import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "next-auth/react";
// import styles from './login.module.css'
import styles from './login.module.scss'

export default function TampilanLogin() {
    const { push } = useRouter();
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlerLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            fullname: formData.fullname,
            email: formData.email,
            password: formData.password,
            redirect: false, // Jangan redirect otomatis
        });

        if (result?.ok) {
            push('/profile'); // Redirect ke halaman yang dilindungi setelah login berhasil
        } else {
            alert("Login gagal! Periksa kredensial Anda.");
        }
    };

    return (
        <div className={styles.login}>
            <h1 className="text-3xl font-bold text-blue-600">Halaman Login</h1>
            <form onSubmit={handlerLogin}>
                <label htmlFor="fullname">Full Name</label><br />
                <input 
                    type="text" 
                    id="fullname" 
                    name="fullname" 
                    value={formData.fullname} 
                    onChange={handleChange} 
                    required 
                /><br />
                
                <label htmlFor="email">Email</label><br />
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                /><br />
                
                <label htmlFor="password">Password</label><br />
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                /><br />
                
                <button type="submit">Login</button>
            </form>
            <h1 style={{color:"red",border:"1px solid red",borderRadius:"5px",padding:"5px"}}>
                Belum Punya Akun</h1>
            <Link href={'/auth/register'}>Ke Halaman Register</Link>
        </div>
    )
}