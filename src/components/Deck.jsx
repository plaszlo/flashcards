import { useDeck } from "../context/CardContext";
import { Card } from './Card';

export const Deck = () => {
    const { cardList } = useDeck();

  return (
    <div className='border border-gray-400 rounded-xl'>
        <div className="m-2 flex items-center">
            <span className='text-xl font-semibold mr-1.5'>Deck</span>
            <span className='bg-gray-200 rounded-full py-0.5 px-2.5'>{cardList.length}</span>
        </div>
        { cardList.map(card => (
            <Card key={card.id} id={card.id} term={card.term} def={card.def} />
        )) }
    </div>
  )
}
