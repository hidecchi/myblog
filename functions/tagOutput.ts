export default function tagOutput(blog: any): string {
  if (blog.metadata.tags.length !== 0) {
    if (blog.metadata.tags[0].sys.id == "freelance") {
      return "フリーランス";
    } else if (blog.metadata.tags[0].sys.id == "other") {
      return "その他";
    } else if (blog.metadata.tags[0].sys.id == "programing") {
      return "プログラミング";
    }
  }
  return "";
}
