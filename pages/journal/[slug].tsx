export default function JournalEntry(): JSX.Element {
  return <h1>Hello journal</h1>
}

// export async function getStaticPaths() {
//   return {
//     paths: allBlogs.map((p) => ({ params: { slug: p.slug } })),
//     fallback: false,
//   }
// }
// TODO: fallback to journal index
