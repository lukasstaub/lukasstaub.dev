import { motion } from "framer-motion";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>lukasstaub</title>
      </Head>
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <div className="p-4 grid gap-4 lg:grid-cols-2 items-center w-full h-full">
          <div className="my-auto lg:m-auto">
            <motion.h2 initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 500, duration: 0.5, delay: 0 }} className="text-2xl sm:text-3xl text-gray-300">
              Hello,
            </motion.h2>
            <motion.h1 initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 500, duration: 0.5, delay: 0.5 }} className="text-3xl sm:text-5xl">
              I&apos;m Lukas!
            </motion.h1>
            <motion.h5 initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 500, duration: 0.5, delay: 1 }} className="text-xl sm:text-2xl text-gray-300">
              A UI/UX Designer and Web Developer from Germany.
            </motion.h5>
          </div>
          <div className="mb-auto mx-auto lg:m-auto">
            <motion.img initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 500, duration: 0.5, delay: 1.25 }} src="/assets/undraw_portfolio_website_re_jsdd.svg" alt="portfolio pic" style={{ width: "min(700px, 90vw)" }} />
          </div>
        </div>
      </div>
    </>
  );
}
