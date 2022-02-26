import Head from "next/head";
import Link from "next/link";

export default function () {
  return (
    <>
      <Head>
        <title>404 | Not found</title>
      </Head>
      <div className="z-50 bg-color1 w-[100vw] h-[100vh] flex flex-col items-center justify-center">
        <div className="flex items-center">
          <h1 className="text-4xl font-bold p-4">404</h1>
          <span className="text-4xl">|</span>
          <h2 className="text-4xl p-4">This page could not be found.</h2>
        </div>
        <Link href="/">
          <a className="bg-color2 rounded-md p-2 text-lg mt-16 text-color4">Return to Page</a>
        </Link>
      </div>
    </>
  );
}
