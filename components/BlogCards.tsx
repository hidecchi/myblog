import Link from "next/link";
import Image from "next/image";
import getTagLink from "functions/getTagLink";
import getTagName from "functions/getTagName";
import { Entry } from "contentful";
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
                layout="fill"
                objectFit="cover"
                alt=""
                sizes={"300px"}
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
