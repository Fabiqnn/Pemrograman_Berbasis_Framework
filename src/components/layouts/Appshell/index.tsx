import NavBar from "../navbar";
import Footer from "../footer";

type AppshellProps = {
    children: React.ReactNode;
}

export default function Appshell(props:AppshellProps){
    const {children} = props;
    return(
        <main>
            <NavBar/>
            {children}
            <Footer/>
        </main>
    )
}