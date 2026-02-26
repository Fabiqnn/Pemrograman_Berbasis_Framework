import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 px-6">
      <Head>
        <title>Praktikum Next.js Pages Router</title>
      </Head>
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Praktikum Next.js Pages Router
        </h1>

        <p className="text-slate-600 mb-6">
          Mahasiswa D4 Pengembangan Web
        </p>

        <Link
          href="/about"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          About
        </Link>
      </div>
    </div>
  );
}