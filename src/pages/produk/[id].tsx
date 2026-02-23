import { useRouter } from "next/router";

export default function HalamanProduk(){
    // const Router =  useRouter();
    // console.log(Router);
    const {query} = useRouter();
    return(
        <>
            <h1>Halaman Produk</h1>
            <p>Produk: {query.id}</p>
        </>
    )
}