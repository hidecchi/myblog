import Head from 'next/head'
import { createClient } from 'contentful'
import BlogCards from '../../components/BlogCards'
import Pager2 from '../../components/Pager2'

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})
const displayNumber = 6;

export const getStaticPaths = async () => {
    const paths = []
    const res = await client.getEntries({
        content_type: 'blog',
        order: '-sys.createdAt',
    })
    const maxPageNumber = Math.ceil(res.items.length / displayNumber);
    for (let i = 1; i <= maxPageNumber; i++) {
        paths.push({ params: { id: i.toString() } });
    }
    return {
        paths: paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const res = await client.getEntries({
        content_type: 'blog',
        order: '-sys.createdAt',
    })
    const maxPageNumber = Math.ceil(res.items.length / displayNumber);
    return {
        props: {
            blogs: res.items,
            pageNumber: Number(params.id),
            maxPageNumber: maxPageNumber,
        },
        revalidate: 1
    }
}


export default function archive(blogs) {
    const startNumber = displayNumber * (blogs.pageNumber - 1);
    const displays = blogs.blogs.slice(startNumber, startNumber + displayNumber);
    const heading = "アーカイブ";
    const pagers = []
    for (let i = 1; i <= blogs.maxPageNumber; i++) {
        pagers.push(i);
    }

    return (
        <>
            <div className="main">
                <h2 className="heading">{heading}</h2>
                <BlogCards blogs={displays} />
                <Pager2 pagers={pagers} blogs={blogs} />
            </div>
        </>
    )
}