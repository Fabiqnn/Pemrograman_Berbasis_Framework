import { useRouter } from "next/router";
import NavBar from "../navbar";
import { Roboto } from "next/font/google";

const disableNavbar = ['/auth/login', '/auth/register', '/404']
const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"]
})

type AppshellProps = {
    children: React.ReactNode;
}

export default function Appshell(props:AppshellProps){
    const {children} = props;
    const {pathname} = useRouter();

    return(
        <main className={roboto.className}>
            {!disableNavbar.includes(pathname) && <NavBar />}
            {children}
            {/* <NavBar/>
            {children}
            <Footer/> */}
        </main>
    )
}
