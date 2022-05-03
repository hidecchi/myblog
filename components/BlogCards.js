import Link from 'next/link'
import TagLink from './TagLink'
import TagOutput from './TagOutput'

export default function BlogCards({ blogs }) {
    return (
        <ul className='blog-list'>
            {blogs.map(blog =>
                <li key={blog.sys.id}>
                    <div className="tag">
                        {TagLink(blog) ?
                            <Link href={TagLink(blog)}>
                                <a className={blog.metadata.tags[0].sys.id}>{TagOutput(blog)}</a>
                            </Link> : ''
                        }
                    </div>
                    <Link href={`/post/${blog.fields.slug}`}>
                        <a>
                            <p className="thumbnail"><img src={'https:' + blog.fields.thumbnail.fields.file.url} width="600" height="315"/></p>
                            <h2>{blog.fields.title}</h2>
                            <p className="date">{blog.fields.date?.substr(0, 10).replace(/-/g, '.')}</p>
                        </a>
                    </Link>

                </li>)}

            <li></li>
        </ul >
    )
}