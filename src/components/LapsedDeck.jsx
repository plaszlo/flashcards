import { useState } from "react";
import { toast } from "react-toastify";
import { useDeck } from "../context/CardContext";
import { fetchStudyData } from "../services/cardService";
import { DeckCard } from './DeckCard';

export const LapsedDeck = ({list, getCountWidth}) => {
    const [showLapsedList, setShowLapsedList] = useState(false);
    const { removeLapsed } = useDeck();

    async function handleLapsedDelete(){
        const confirmed = window.confirm(
            `Are you sure you want to delete ${lapsedList.length} cards?`
        );

        if (!confirmed) return;

        const lapsedIds = lapsedList.map(card => card.cardId);
        try {
            await fetchStudyData("DELETE", lapsedIds);
            removeLapsed(lapsedIds);
            toast.success("Lapsed cards are deleted successfully");
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div>
        <div className="border-b border-gray-200 pb-1 m-2 mb-0 dark:border-b dark:border-gray-800">
            <span className="ml-3 dark:text-slate-300">Lapsed Cards</span>
            <span onClick={() => setShowLapsedList(!showLapsedList)} className={`inline-flex items-center justify-center pr-px h-7 ${getCountWidth(list.length)} bg-red-100 rounded-full ml-2 cursor-pointer hover:bg-[oklch(89.5%_0.032_17.717)] dark:bg-[rgb(142,98,98)] dark:hover:bg-[oklch(49.5%_0.058_19.102)]`}>{list.length}</span>
            <i onClick={handleLapsedDelete} className="bi bi-trash text-red-700 rounded-full px-2 py-0.5 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.9)]"></i>
        </div>
        { showLapsedList && (
                list.map(card => (
                    <DeckCard key={card.cardId} card={card} isLapsed={true}/>
                ))
            ) 
        }
    </div>
  )
}
