import { Entry } from "contentful";
import Image from "next/image";
import Link from "next/link";
import { getTagLink, getTagName } from "utils/utils";

import { IBlogFields } from "../@types/generated/contentful";

type Props = { blogs: Entry<IBlogFields>[] };

const BlogCards = ({ blogs }: Props): JSX.Element => {
  return (
    <ul className="blog-list">
      {blogs.map((blog) => (
        <li key={blog.sys.id}>
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
            <p className="thumbnail">
              <Image
                src={"https:" + blog.fields.thumbnail?.fields.file.url}
                fill
                style={{ objectFit: "cover" }}
                alt=""
                sizes={"300px"}
                loading="eager"
              />
            </p>
            <h2>{blog.fields.title}</h2>
            <p className="date">
              {blog.fields.date?.substring(0, 10).replace(/-/g, ".")}
            </p>
          </Link>
        </li>
      ))}

      <li></li>
    </ul>
  );
};

export default BlogCards;
