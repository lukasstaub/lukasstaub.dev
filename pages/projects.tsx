import { GetServerSideProps } from "next";
import Head from "next/head";
import client, { urlFor } from "../config/client";
import { Project } from "../types";

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <>
      <Head>
        <title>lukasstaub - My Projects</title>
      </Head>
      <div className="min-h-[100vh] pt-[150px] px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl mb-16">My Projects</h1>
          <div className="grid  lg:grid-cols-2 2xl:grid-cols-3 gap-16">
            {projects.length > 0 ? (
              projects.map((el) => {
                return (
                  <div className="bg-color2 rounded-sm w-full overflow-hidden p-4 flex flex-col">
                    <div className="relative h-56 w-full">
                      <img src={urlFor(el.mainImage).url()} className="h-full w-full object-cover" />
                      <h2 className="text-2xl absolute bottom-0 left-0 p-2 bg-color1">{el.title}</h2>
                    </div>
                    <p className="whitespace-pre-wrap my-4">{el.desc}</p>
                    <a href={el.url} target="_blank" className="ml-auto bg-color5 text-color4 p-2 rounded-sm">
                      Visit this project
                    </a>
                  </div>
                );
              })
            ) : (
              <h1 className="text-3xl text-center my-12 lg:col-span-2 2xl:col-span-3">No Projects found.</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const projects = await client.fetch('*[_type=="projects"]|order(_updatedAt desc)');

  return { props: { projects } };
};
