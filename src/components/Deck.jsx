import { useDeck } from "../context/CardContext";
import { DeckCard } from './DeckCard';
import { LapsedDeck } from "./LapsedDeck";

export const Deck = () => {
    const { cards } = useDeck();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { lapsedList, activeList } = cards.reduce(
        (lists, card) => {
            if (new Date(card.nextReview) < today) {
                lists.lapsedList.push(card);
            } else {
                lists.activeList.push(card);
            }

            return lists;
        },
        {
            lapsedList: [],
            activeList: []
        }
    );

    const getCountWidth = (length) => {
        if (length < 100) return 'w-7';
        if (length < 1000) return 'w-9';
        return 'w-11';
    };

  return (
    <div className='border border-gray-400 rounded-xl dark:border-slate-800 dark:ring dark:ring-inset dark:ring-slate-800'>
        <div className="m-2 flex items-center">
            <span className='text-xl font-semibold mr-1.5 dark:text-slate-300'>Deck</span>
            <span className={`bg-gray-200 rounded-full inline-flex items-center justify-center pr-px h-7 ${getCountWidth(cards.length)} dark:bg-gray-400`}>{cards.length}</span>
        </div>

        { lapsedList.length > 0 &&
            <>
                <LapsedDeck list={lapsedList} getCountWidth={getCountWidth}/>
                <div className="border-b border-gray-200 pb-1 m-2 mb-0 dark:border-slate-800">
                    <span className="ml-3 dark:text-slate-300">Active Cards</span>
                    <span className={`inline-flex items-center justify-center pr-px h-7 ${getCountWidth(activeList.length)} bg-sky-100 rounded-full ml-2 dark:bg-slate-500`}>{activeList.length}</span>
                </div>
            </>
        }

        { activeList.toReversed().map(card => (
            <DeckCard key={card.cardId} card={card} />
        )) }
    </div>
  )
}
