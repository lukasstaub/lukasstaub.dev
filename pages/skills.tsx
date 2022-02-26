import { GetServerSideProps } from "next";
import Head from "next/head";
import ReactTooltip from "react-tooltip";
import client, { urlFor } from "../config/client";
import { Skill } from "../types";

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <>
      <Head>
        <title>lukasstaub - My Skills</title>
      </Head>
      <div className="min-h-[100vh] pt-[150px] px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl mb-16">My Skills</h1>
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-16">
            {skills.length > 0 ? (
              skills.map((el) => {
                return (
                  <div key={el.title} className="m-auto flex flex-col items-center" data-tip={el.desc ?? ""} data-for={el.title}>
                    <div style={{ backgroundColor: el.color }} className="w-[90px] h-[90px] bg-color3 rounded-full flex items-center justify-center overflow-hidden">
                      <img className="w-[65%] h-[65%]" src={urlFor(el.img).url()} alt={el.title} />
                    </div>
                    <p className="text-lg mt-4">{el.title}</p>
                    <ReactTooltip id={el.title} effect="solid" />
                  </div>
                );
              })
            ) : (
              <h1 className="text-3xl text-center my-12 col-span-2 lg:col-span-3 2xl:col-span-4">No Skills found.</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const skills = await client.fetch('*[_type=="skills"]|order(title asc)');

  return { props: { skills } };
};
