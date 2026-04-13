import styles from './navbar.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function NavBar(){
    const {data}:any = useSession();
    return(
        <div className={styles.navbar}>
            <div className={styles.navbar__brand}>
                MyApp
            </div>

            <div className={styles.navbar__right}>
                {data ? 
                    (<>
                        <div className={styles.navbar__user}>
                            Welcome, {data.user?.fullname}
                        </div>
                        <button 
                        className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
                        onClick={() => signOut({ callbackUrl: '/' })}>
                            Sign Out
                        </button>
                    </>) :
                    (<>
                        <button className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
                        onClick={() => signIn()}>
                            Sign In
                        </button>
                    </>)
                }
            </div>
            
        </div>
    )
}