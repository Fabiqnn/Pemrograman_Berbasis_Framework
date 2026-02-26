import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function TampilanProduk(){
    const {push} = useRouter();
    useEffect(() => {
        const loginStatus = localStorage.getItem("isLogin")
        if(!loginStatus) {
            push("/auth/login")
        }
    },[]);

    return(
        <>
            <div>Produk User Page</div>
        </>
    )
}