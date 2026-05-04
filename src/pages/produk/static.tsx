// import TampilanProduk from "@/views/produk";
// import { ProductType } from "@/types/Product.type";
// import { retrieveProducts } from "@/utils/db/servicefirebase";

// export default function halamanProdukStatic(props:{products:ProductType[]}) {
//     const {products} = props;
//     return (
//         <div>
//             <h1>Halaman Produk Static</h1>
//             <TampilanProduk products={products}/>
//         </div>
//     )
// }

// export async function getStaticProps() {
//     const products = await retrieveProducts("products") as ProductType[];

//     return {
//         props: {
//             products,
//         },
//         revalidate: 10,
//     }
// }
