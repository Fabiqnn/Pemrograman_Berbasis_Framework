import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "@/pages/produk/product.module.scss"
import { ProductType } from "@/types/Product.type"
import Link from "next/link"
import Image from "next/image"

export default function TampilanProduk({ products }: { products: ProductType[] }) {
    // const { push } = useRouter();
    // useEffect(() => {
    //     const loginStatus = localStorage.getItem("isLogin")
    //     if (!loginStatus) {
    //         push("/auth/login")
    //     }
    // }, []);

    return (
        <div className={styles.produk}>
            <h1 className={styles.produk__title}>Daftar Produk</h1><br />

            {/* <button onClick={fetchProduct} className="bg-blue-500 text-white px-4 py-2 rounded">Refresh Data</button> */}
            <div className={styles.produk__content}>
                {products?.length > 0 ? (
                    <>
                        {products?.map((products: ProductType) => (
                            <Link href={`/produk/${products.id}`} key={products.id} className={styles.produk__content__item}>
                                <div key={products.id} className={styles.produk__content__item}>
                                    <div className={styles.produk__content__item__image}>
                                        <Image src={products.image} alt={products.name} width={200} height={200}/>
                                    </div>
                                    <h4 className={styles.produk__content__item__name}>{products.name}</h4>
                                    <p className={styles.produk__content__item__category}>Kategori: {products.category}</p>
                                    <p className={styles.produk__content__item__price}>Harga: {products.price.toLocaleString("id-ID")}</p>
                                </div>
                            </Link>
                        ))}
                    </>
                ) : (
                    <div className={styles.produk__content__skeleton}>
                        <div className={styles.produk__content__skeleton__image}></div>
                        <div className={styles.produk__content__skeleton__name}></div>
                        <div className={styles.produk__content__skeleton__category}></div>
                        <div className={styles.produk__content__skeleton__price}></div>
                    </div>
                )}
            </div>
        </div>
    )
}
