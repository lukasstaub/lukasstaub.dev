import { GetServerSideProps } from "next";
import client from "../config/client";
import { PortableText } from "@portabletext/react";
import { Author } from "../types";
import Head from "next/head";

export default function ({ user }: { user: Author }) {
  return (
    <>
      <Head>
        <title>lukasstaub - About Me</title>
      </Head>
      <div className="min-h-[100vh] w-full flex flex-col lg:flex-row items-center justify-center p-4">
        <h1 className="text-4xl my-32 lg:mr-8">About Me</h1>
        <div className="prose text-color4 lg:pl-8 lg:border-l-2 lg:border-color4">
          <PortableText value={user.biography} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const user = await client.fetch('*[_type=="authors" && identifier.current == "lukas-staub"]');

  if (!user[0]) {
    return { notFound: true };
  }

  return { props: { user: user[0] } };
};
