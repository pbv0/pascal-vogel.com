export type Publication = {
  year: string;
  published: string;
  title: string;
  url: string;
  lang?: string;
  translations?: Publication[];
};

export type GroupedPublications = { [year: string]: Publication[] };
