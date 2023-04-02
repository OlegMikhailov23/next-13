import { Intro } from '@/components/Intro'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <main>
      <>
      <Intro />
      </>
    </main>
  )
}

export default Home;
