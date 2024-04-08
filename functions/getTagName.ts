import { Entry } from "contentful";
import { IBlogFields } from "../@types/generated/contentful";

const getTagName = (blog: Entry<IBlogFields>): string => {
  if (blog.metadata.tags.length !== 0) {
    if (blog.metadata.tags[0].sys.id === "freelance") {
      return "フリーランス";
    } else if (blog.metadata.tags[0].sys.id === "other") {
      return "その他";
    } else if (blog.metadata.tags[0].sys.id === "programing") {
      return "プログラミング";
    }
  }
  return "";
};

export default getTagName;
