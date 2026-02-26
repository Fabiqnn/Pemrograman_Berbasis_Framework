import { useRouter } from "next/router";
import NavBar from "../navbar";
import Footer from "../footer";

const disableNavbar = ['/auth/login', '/auth/register']

type AppshellProps = {
    children: React.ReactNode;
}

export default function Appshell(props:AppshellProps){
    const {children} = props;
    const {pathname} = useRouter();
    return(
        <main>
            {!disableNavbar.includes(pathname) && <NavBar />}
            {children}
            {/* <NavBar/>
            {children}
            <Footer/> */}
        </main>
    )
}