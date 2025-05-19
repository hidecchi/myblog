import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { getTagLink, getTagName } from "utils/utils";

import { IBlogFields } from "../@types/generated/contentful";

type Props = { blogs: Entry<IBlogFields>[] };

const BlogCards = ({ blogs }: Props): JSX.Element => {
  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <article key={blog.sys.id} className="blog-item">
          <div className="tag">
            {getTagLink(blog) ? (
              <Link
                href={getTagLink(blog)}
                className={blog.metadata.tags[0].sys.id}
              >
                {getTagName(blog)}
              </Link>
            ) : (
              ""
            )}
          </div>
          <Link href={`/post/${blog.fields.slug}`} passHref>
            <div className="thumbnail">
              <Image
                src={"https:" + blog.fields.thumbnail?.fields.file.url}
                fill
                style={{ objectFit: "cover" }}
                alt=""
                sizes={"300px"}
                loading="eager"
              />
            </div>
            <h2>{blog.fields.title}</h2>
            {blog.fields.date && (
              <time
                className="date"
                dateTime={blog.fields.date?.substring(0, 10).replace(/-/g, "-")}
              >
                {blog.fields.date?.substring(0, 10).replace(/-/g, ".")}
              </time>
            )}
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogCards;
