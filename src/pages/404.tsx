import styles from '@/styles/404.module.scss'
import Head from 'next/head'
import Link from 'next/link'

export default function Custom404() {
    return (
        <div className={styles.error}>
            <Head>
                <title>404 - Not Found</title>
                <meta name="description" content="Halaman Tidak Dapat Ditemukan" />
            </Head>
            <img src="/page-not-found.png" alt="404" className={styles.error__image} />
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 mt-6">
                404 - Missing Page
            </h1>

            <p className="text-gray-600 text-lg mt-3 max-w-md text-center">
                Maaf, halaman yang anda cari tidak ada.
            </p>

            <Link href={"/"} className='py-2 px-5 mt-5 rounded-lg bg-green-600 hover:bg-green-500 text-white'>Kembali Ke Home</Link>
        </div>
    )
}