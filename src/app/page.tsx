import { Main } from '@/components/Main'
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const Home = () => {
  return (
    <main>
      <Main />
    </main>
  )
}

export default Home;
