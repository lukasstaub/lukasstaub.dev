import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface Skill {
  title?: string;
  desc?: string;
  img?: SanityImageSource;
  color?: string;
}

export interface Author {
  name: string;
  image?: SanityImageSource;
  biography?: any[];
}

export interface Link {
  title: string;
  url: string;
}

export interface Project {
  title: string;
  slug: string;
  author?: Author;
  mainImage: SanityImageSource;
  url: string;
  desc: string;
}
