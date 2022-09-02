import Link from "next/link";

export default function Pager2({
  pagers,
  blogs,
}: {
  pagers: number[];
  blogs: any;
}) {
  return (
    <ul className="pager">
      {pagers.map((value) => (
        <li key={value} className={value == blogs.pageNumber ? "active" : ""}>
          <Link href={`/archive/${value}`}>
            <a>{value}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
