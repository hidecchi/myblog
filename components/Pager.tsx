import Link from "next/link";

type Props = {
  pagers: number[];
  pageNumber: number;
};

const Pager = ({ pagers, pageNumber }: Props): JSX.Element => {
  return (
    <ul className="pager">
      {pagers.map((value) => (
        <li key={value} className={value === pageNumber ? "active" : ""}>
          <Link href={`/archive/${value}`}>
            <a>{value}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pager;
