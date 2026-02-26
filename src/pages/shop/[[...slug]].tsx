import { useRouter } from "next/router";

export default function halamanToko() {
    // const Router = useRouter();
    // console.log(Router);
    const { query } = useRouter();
    return(
        <>
            <h1>Halaman Toko</h1>
            <p>
                Toko: {Array.isArray(query.slug) ? query.slug.join("-") : query.slug}
            </p>
            <p>Kategori: {query.slug ? query.slug[0] : "Semua Kategori"}</p>
        </>
    )
}