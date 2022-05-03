import Link from 'next/link'

export default function Pager({ pagers }) {
    return (
        <ul className="pager">
            {pagers.map((value) => <li key={value} className={value == 1 ? 'active' : ''}><Link href={`/archive/${value}`}><a>{value}</a></Link></li>)}
        </ul>
    )
}
