import Link from "next/link";
import TagLink from "../functions/tagLink";
import TagOutput from "../functions/tagOutput";
import Image from "next/image";

export default function BlogCards({ blogs }: any): JSX.Element {
  return (
    <ul className="blog-list">
      {blogs?.map((blog: any) => (
        <li key={blog.sys.id}>
          <div className="tag">
            {TagLink(blog) ? (
              <Link href={TagLink(blog)}>
                <a className={blog.metadata.tags[0].sys.id}>
                  {TagOutput(blog)}
                </a>
              </Link>
            ) : (
              ""
            )}
          </div>
          <Link href={`/post/${blog.fields.slug}`}>
            <a>
              <p className="thumbnail">
                <Image
                  src={"https:" + blog.fields.thumbnail.fields.file.url}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                  sizes={"300px"}
                />
              </p>
              <h2>{blog.fields.title}</h2>
              <p className="date">
                {blog.fields.date?.substr(0, 10).replace(/-/g, ".")}
              </p>
            </a>
          </Link>
        </li>
      ))}

      <li></li>
    </ul>
  );
}
