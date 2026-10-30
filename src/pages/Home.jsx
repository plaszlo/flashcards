import { AddCard, Deck, Practice, Calendar } from '../components';

export const Home = () => {

  return (
    <main className='max-w-7xl mx-auto p-5 dark:bg-slate-900'>
      <AddCard />
      <Calendar />
      <Practice />
      <Deck />
    </main>
  )
}
