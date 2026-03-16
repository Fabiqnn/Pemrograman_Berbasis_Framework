import { ProductType } from "@/types/Product.type";
import styles from "../detailproduk/detailProduct.module.scss";
export default function DetailProduk({ product }: { product: ProductType | null }) {
    if (!product) {
        return (
            <div className={styles.produkdetail}>
                <p>Produk tidak ditemukan.</p>
            </div>
        );
    }

    return (
        <>
            <h1 className={styles.title}>Detail Produk</h1>
            <div className={styles.produkdetail}>
                <div className={styles.produkdetail__image}>
                    <img className={styles.produkdetail__image__img} src={product.image && product.image} alt={product.name} />
                </div>

                <div className={styles.produkdetail__info}>
                    <h1 className={styles.produkdetail__name}>{product.name}</h1>
                    <p className={styles.produkdetail__category}>{product.category}</p>
                    <p className={styles.produkdetail__price}>
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>
        </>
    )
}
