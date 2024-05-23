import Link from "next/link";

type Props = {
  path: string;
  pagers: number[];
  pageNumber: number;
};

const Pager = ({ path, pagers, pageNumber }: Props): JSX.Element => {
  return (
    <ul className="pager">
      {pagers.map((value) => (
        <li key={value} className={value === pageNumber ? "active" : ""}>
          <Link
            href={`${path}${value === 1 ? "" : "/" + value}`}
            aria-label={`${value}ページ`}
          >
            {value}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pager;
