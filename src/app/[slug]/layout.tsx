export const metadata = {
  title: 'Post page',
}

const PostsLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  }
}) => {
  console.log(params.slug, 'dfvefrffcecece');
  return(
    <section>{children}</section>
  )
}

export default PostsLayout;