import dayjs from 'dayjs';
import Link from 'next/link';
import { Post as PostItem } from '../../types/common'

export const metadata = {
  title: 'Post Page',
  // description: 'Wright here your post', ??
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

const getPostData = async (id: string): Promise<PostItem> => {
  console.log(id, 'HERE')
  const res = await fetch(`http://localhost:4000/posts/${id}`, { method: 'GET' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const post = await res.json();

  return post;
}

type Props = {
  params: {
    post: string;
  };
}

const Post = async(props: Props) => {
  const p = await getPostData(props.params.post);
  return(
    <>
      <div className="container">
        <Link className="btn btn-primary" style={{marginTop: 20, marginBottom: 20}} href={'/'}>Back</Link>
        <h1 className="header">{p.title}</h1>
        <p>
          {p.content}
        </p>
        <b>Date: {dayjs(p.date).format('dddd DD MMMM YYYY HH:mm')}</b>
        <div>
          <Link className="btn btn-info" style={{ marginTop: 20, marginBottom: 20 }} href={'/editor'}>Edit</Link>
        </div>
      </div>
    </>
  )
}

export default Post;