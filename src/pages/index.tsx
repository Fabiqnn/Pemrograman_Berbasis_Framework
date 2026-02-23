import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <h1>Praktikum1 Next.js Pages Router</h1> <br/>
      <p>Mahasiswa D4 Pengembangan Web</p>
      <Link href={"/about"}>About</Link>
    </>
  )
}
