export default function TagLink(blog) {
    if (!blog.metadata.tags.length == 0) {
        return `/category/${blog.metadata.tags[0].sys.id}`;
    }
}