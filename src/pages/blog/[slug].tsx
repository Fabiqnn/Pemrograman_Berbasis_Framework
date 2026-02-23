import { useRouter } from "next/router";

export default function HalamanBlog(){
    // const Router =  useRouter();
    // console.log(Router);
    const {query} = useRouter();
    return(
        <>
            <h1>Halaman Blog</h1>
            <p>blog: {query.slug}</p>
        </>
    )
}