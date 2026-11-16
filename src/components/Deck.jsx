import { useEffect } from "react";
import { useDeck } from "../context/CardContext";
import { DeckCard } from './DeckCard';

export const Deck = () => {
    const { cards, loadCards } = useDeck();

  return (
    <div className='border border-gray-400 rounded-xl'>
        <div className="m-2 flex items-center">
            <span className='text-xl font-semibold mr-1.5 dark:text-slate-300'>Deck</span>
            <span className='bg-gray-200 rounded-full py-0.5 px-2.5 dark:bg-slate-300'>{cards.length}</span>
        </div>
        { cards.map(card => (
            <DeckCard key={cards.id} card={card}/>
        )) }
    </div>
  )
}
