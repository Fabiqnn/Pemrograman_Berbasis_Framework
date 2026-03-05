import { useRouter } from "next/router"
import { useEffect, useState } from "react"

type ProductType = {
    id: string;
    name: string;
    price: number;
    size: string;
    category: string;
}

export default function TampilanProduk() {
    // const { push } = useRouter();
    // useEffect(() => {
    //     const loginStatus = localStorage.getItem("isLogin")
    //     if (!loginStatus) {
    //         push("/auth/login")
    //     }
    // }, []);
    const [products, setProducts] = useState<ProductType[]>([]);

    const fetchProduct = async () => {
        try {
            const response = await fetch("/api/produk");
            const responseData = await response.json();
            setProducts(responseData.data)
        } catch (e) {
            console.error("Error fetching produk: ", e)
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <div>
            <h1 className="text-xl font-bold">Daftar Produk</h1><br />

            <button onClick={fetchProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Refresh Data</button>

            {products.map((products:ProductType) => (
                <div key={products.id}>
                    <br />
                    <h2 className="text-lg font-bold">{products.name}</h2>
                    <p>Harga: {products.price}</p>
                    <p>Ukuran: {products.size}</p>
                    <p>Kategori: {products.category}</p>
                </div>
            ))}
        </div>
    )
}