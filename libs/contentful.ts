import { createClient } from "contentful";

import { IBlogFields } from "../@types/generated/contentful";

const getContentfulClient = (isPreview = false) => {
  if (isPreview) {
    return createClient({
      space: process.env.CONTENTFUL_PREVIEW_TOKEN as string,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
      host: "preview.contentful.com",
    });
  } else {
    return createClient({
      space: process.env.CONTENTFUL_SPACE_ID as string,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
    });
  }
};

export const getBlog = async (slug: string, isEnable = false) => {
  const client = getContentfulClient(isEnable);
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    "fields.slug": slug,
  });
  const blog = res.items[0];
  return blog;
};

type QueryOption = {
  content_type: "blog";
  order: "-sys.createdAt";
  limit?: number;
  query?: string;
  ["metadata.tags.sys.id[all]"]?: "programing" | "freelance" | "other";
};

export const getBlogList = async (option?: {
  tag?: QueryOption["metadata.tags.sys.id[all]"];
  limit?: QueryOption["limit"];
  query?: QueryOption["query"];
}) => {
  const queryOption: QueryOption = {
    content_type: "blog",
    order: "-sys.createdAt",
    limit: option?.limit,
    query: option?.query,
    ["metadata.tags.sys.id[all]"]: option?.tag,
  };
  const client = getContentfulClient();
  const res = await client.getEntries<IBlogFields>(queryOption);
  const blogList = res.items;
  return blogList;
};
