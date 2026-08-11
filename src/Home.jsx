import { AddCard } from './AddCard';
import { Deck, Practice } from './components';

export const Home = () => {

  return (
    <main>
        <header>
            <h1 className='text-3xl my-5 text-center'>Flashcards</h1>
        </header>
        <section className='max-w-7xl mx-auto p-5'>
            <AddCard />
            <Practice />
            <Deck />
        </section>
    </main>
  )
}
