import { GetServerSideProps } from "next";
import Head from "next/head";
import { SocialIcon } from "react-social-icons";
import client from "../config/client";
import { Link } from "../types";

export default function ({ links }: { links: Link[] }) {
  return (
    <>
      <Head>
        <title>lukasstaub - My Social Media</title>
      </Head>
      <div className="min-h-[100vh] pt-[150px] px-4" id="skills">
        <div className="container mx-auto">
          <h1 className="text-4xl mb-16">My Social Media</h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-16">
            {links.length > 0 ? (
              links.map((el) => (
                <div className="m-auto flex flex-col items-center">
                  <SocialIcon url={el.url} target="_blank" />
                  <p className="text-lg mt-4">{el.title}</p>
                </div>
              ))
            ) : (
              <h1 className="text-3xl text-center my-12 col-span-2 lg:col-span-3 2xl:col-span-4">No Links found.</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const links = await client.fetch('*[_type=="links"]|order(title asc)');

  return { props: { links } };
};
