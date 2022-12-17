import { Entry } from "contentful";
import { IBlogFields } from "../@types/generated/contentful";

const getTagLink = (blog: Entry<IBlogFields>): string => {
  if (blog.metadata.tags.length !== 0) {
    return `/category/${blog.metadata.tags[0].sys.id}`;
  }
  return "";
};

export default getTagLink;
