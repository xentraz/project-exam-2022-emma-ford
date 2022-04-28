// React / Headless
import Head from 'next/head'
// Components
import Navigation from '../components/Navigation/Navigation';
import Sidebar from '../components/Sidebar/Sidebar';
import HeroIndex from '../components/HeroIndex/HeroIndex';
import PopularCards from '../components/PopularCards/PopularCards';
import ThingsToDo from '../components/ThingsToDo/ThingsToDo';

export default function Home() {
  return (
    <>
      <Head>
        <title>Holidaze</title>
        NEEDED
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navigation />
        <Sidebar/>
      </header>
      <main>
        <HeroIndex />
        <PopularCards/>
        <ThingsToDo/>
      </main>

      <footer>
      </footer>
    </>
  )
}
