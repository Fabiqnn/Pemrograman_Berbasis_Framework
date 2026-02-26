import { useRouter } from "next/router";

export default function halamanKategori() {
    const router = useRouter();
    const { slug } = router.query;

    if(!Array.isArray(slug)) {
        return <p>Slug bukan</p>
    }

    return (
      <>
        <h1>Halaman Kategori</h1>
        <ul>
            {slug.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
      </>  
    );
}