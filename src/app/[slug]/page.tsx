import { DeleteBtn } from '@/components/DeleteBtn';
import dayjs from 'dayjs';
import Link from 'next/link';
import { PostType as PostItem } from '../../types/common'

export const metadata = {
  title: 'Post Page',
  description: 'Wright here your post',
  icons: {
    icon: 'icon.png',
    shortcut: 'shortcut-icon.png',
    apple: '/apple-icon.png',
  }
}

const getPostData = async (id: string): Promise<PostItem> => {
  const res = await fetch(`http://localhost:4000/posts/${id}`, { cache: 'no-store'});

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const post = await res.json();

  return post;
}

type Props = {
  params: {
    slug: string;
  }
};

const Post = async ({ params }: Props) => {
  const { slug } = params; 
  const p = await getPostData(slug);

  return(
    <>
      <div className="container">
        <Link className="btn btn-primary" style={{marginTop: 20, marginBottom: 20}} href={'/'}>Back</Link>
        <h1 className="header">{p.title}</h1>
        <p>
          {p.content}
        </p>
        <b>Last modified: {dayjs(p.date).format('dddd DD MMMM YYYY HH:mm')}</b>
        <div>
          <Link className="btn btn-info" style={{ marginTop: 20, marginBottom: 20 }} href={`/editor?post=${slug}`}>Edit</Link>
          <DeleteBtn id={slug} />
        </div>
      </div>
    </>
  )
}

export default Post;
