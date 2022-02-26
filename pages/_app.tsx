import { AppProps } from "next/app";
import NProgress from "nprogress";
import { useEffect } from "react";
import Router from "next/router";
import Navbar from "../components/Navbar";

import "../styles/globals.css";
import "../styles/nprogress.css";

function Application({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col w-full h-full">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default Application;
