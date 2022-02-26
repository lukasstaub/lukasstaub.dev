import sanityClient from "@sanity/client";
import builder from "@sanity/image-url";

const client = sanityClient({
  projectId: "jeuneacm",
  dataset: "production",
  apiVersion: "2021-10-21",
});

export const urlFor = (source: any) => {
  const imgBuilder = builder(client);

  return imgBuilder.image(source);
};

export default client;
