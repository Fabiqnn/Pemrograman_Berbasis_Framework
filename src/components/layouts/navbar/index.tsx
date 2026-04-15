import styles from './navbar.module.css'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image';

export default function NavBar(){
    const {data}:any = useSession();
    const displayName = data?.user?.fullname || data?.user?.name || "User";
    return(
        <div className={styles.navbar}>
            <div className={styles.navbar__brand}>
                MyApp
            </div>

            <div className={styles.navbar__right}>
                {data ? 
                    (<>
                        <div className={styles.navbar__user}>
                            Welcome, {displayName}
                            {data.user.image && (
                                <Image src={data.user.image} alt={displayName} className={styles.navbar__user__image} width={42} height={42}/>
                            )}
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
