import TampilanProduk from "@/views/produk";
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";

export default function halamanProduk() {

    const { data, error, isLoading } = useSWR("/api/produk", fetcher);

    // const fetchProduct = async () => {
    //     try {
    //         const response = await fetch("/api/produk");
    //         const responseData = await response.json();
    //         setProducts(responseData.data)
    //     } catch (e) {
    //         console.error("Error fetching produk: ", e)
    //     }
    // }

    // useEffect(() => {
    //     fetchProduct();
    // }, []);


    return (
        <>
            <TampilanProduk products={isLoading ? [] : data.data}/>
        </>
    )
}