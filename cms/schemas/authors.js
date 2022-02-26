export default {
  name: "authors",
  title: "Authors",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "identifier",
      title: "Identifier",
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "biography",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
