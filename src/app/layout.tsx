import dayjs from "dayjs";
import { MainStoreProvider } from "./Context/MainStoreProvider";

export const metadata = {
  title: 'Home page blog',
  description: 'Wright here your post',
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

async function getInitData() {
  const res = await fetch('http://localhost:4000/posts', { method: 'GET', cache: 'no-store'});
  const headerRes = await fetch('http://localhost:4000/markup/header');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const posts = await res.json();
  const header = await headerRes.text();

  return {
    header,
    initialStateStore: {
      posts,
      date: dayjs(new Date()).format('dddd DD MMMM YYYY'),
    }
  };
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initData = await getInitData()

  return (
    <html lang="ru">
      <head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <>
          <div dangerouslySetInnerHTML={{ __html: initData.header }} />
          <MainStoreProvider hydrationData={initData.initialStateStore}>
            {children}
          </MainStoreProvider>
        </>
      </body>
    </html>
  )
}
