import { useRouter } from "next/router";
import fetcher from "@/utils/swr/fetcher";
import useSWR from "swr";
import DetailProduk from "@/views/detailproduk";
import { ProductType } from "@/types/Product.type";

export default function HalamanProduk({product} : {product: ProductType}){
    {/digunakan client-side rendering/}
    // const { query } = useRouter();
    // const productId = typeof query.id === "string" ? query.id : null;
    // const { data, isLoading } = useSWR<{ data: ProductType }>(
    //     productId ? `/api/product/${productId}` : null,
    //     fetcher,
    // );

    // return(
    //     <>
    //         <DetailProduk product={data?.data ?? null} />
    //     </>
    // )

    return (
        <div>
            <DetailProduk product={product} />
        </div>
    )
}

{/digunakan server-side rendering/}
// export async function getServerSideProps({params}: {params: {id:string}}) {
//     const res = await fetch(`http://localhost:3000/api/produk/${params?.id}`)
//     const response = await res.json();

//     return {
    //         props: {
        //             product: response.data
        //         }
        //     }
        // }
        
{/digunakan static-side generation/}
export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3000/api/produk`);
    const response = await res.json();

    const paths = response.data.map((product: ProductType) => ({
        params: { id: product.id }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}: {params: {id:string}}) {
    const id = params?.id;

    if (typeof id !== "string") {
        return { notFound: true };
    }

    const res = await fetch(`http://localhost:3000/api/produk/${id}`);
    const response: {data: ProductType | null } = await res.json();
    
    if (!response?.data) {
        return { notFound: true };
    }

    return {
        props: {
            product: response.data,
        }
    }
}