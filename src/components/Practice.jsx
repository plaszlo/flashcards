import { useRef, useState } from "react";
import { PracticeCard } from "./PracticeCard";
import { useEffect } from "react";
import { useDeck } from "../context/CardContext";

import practiceRoundSFX from '../assets/practice_round.mp3';
import practiceCompleteSFX from '../assets/practice_complete.mp3';

export const Practice = () => {
    const { dailyList } = useDeck();
    const [localDailyList, setLocalDailyList] = useState(dailyList);
    const [isPractise, setIsPractise] = useState(false);
    const [practiseRound, setPractiseRound] = useState(0);
    const [practisedCards, setPractisedCards] = useState(new Set());

    const audioRef = useRef({
        practiceRoundSFX: new Audio(practiceRoundSFX),
        practiceCompleteSFX: new Audio(practiceCompleteSFX)
    })

    function handleWordsSubmit(){
        setPractiseRound(0);
        setPractisedCards(new Set());
    }

    //TODO: Move to card utils?
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        if(
            localDailyList.length > 0 &&
            practisedCards.size === localDailyList.length
        ){
            switch (practiseRound) {
                case 0:
                    setPractisedCards(new Set());
                    setPractiseRound(prev => prev + 1);
                    audioRef.current.practiceRoundSFX.currentTime = 0;
                    audioRef.current.practiceRoundSFX.play();
                    break;
                
                case 1:
                    setPractiseRound(prev => prev + 1);
                    setIsPractise(false);
                    audioRef.current.practiceCompleteSFX.currentTime = 0;
                    audioRef.current.practiceCompleteSFX.play();
                    break;
            }
        }
    }, [practisedCards, localDailyList.length])

    useEffect(() => {
        setLocalDailyList(dailyList);
    }, [dailyList]);

  return (
    <div className="border border-gray-400 rounded-xl py-1 mb-10 dark:border-slate-800 dark:ring dark:ring-inset dark:ring-slate-800">
        <div className="grid grid-cols-3 items-center">
            <div className="flex items-center">
                <span className="text-xl font-semibold p-2 dark:text-slate-300">Practice</span>
                { isPractise ? (
                    <i onClick={() => setIsPractise(!isPractise)} className="bi bi-pause-circle text-2xl cursor-pointer text-yellow-300 hover:drop-shadow-[0_0_10px_rgba(230,230,80,0.9)]"></i>
                ) : (
                    practiseRound === 2 ? (
                        <i onClick={handleWordsSubmit} className='bi bi-check-circle text-2xl cursor-pointer text-green-700 hover:drop-shadow-[0_0_10px_rgba(80,230,80,0.9)]'></i>
                    ) : (
                        <i onClick={() => setIsPractise(!isPractise)} className='bi bi-play-circle text-2xl cursor-pointer text-green-700 hover:drop-shadow-[0_0_10px_rgba(80,230,80,0.9)] '></i>
                    )
                    
                ) }
                <i onClick={() => setLocalDailyList(shuffle([...localDailyList]))} className="bi bi-arrow-repeat text-[30px] ml-2 cursor-pointer text-blue-700 hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]"></i>
            </div>
            <div className="justify-self-center">
                {[...Array(2)].map((_, index) => (
                    <i
                        key={index}
                        className={`bi bi-check-square text-2xl mr-2 ${
                            index < practiseRound
                                ? "text-green-700"
                                : "text-gray-300 dark:text-slate-700"
                        }`}
                    ></i>
                ))}
            </div>
        </div>
        <>
            { isPractise ? (
                localDailyList.map(card => (
                    <PracticeCard 
                        key={card.cardId}
                        card={card} 
                        isPractised={practisedCards.has(card.cardId)}
                        onPractised={(cardId) => {
                            setPractisedCards(prev => new Set(prev).add(cardId));
                        }}
                    />
                ))
            ) : (
                localDailyList.map(card => (
                    <div className="p-2 flex gap-2.5" key={card.cardId}>
                        <span className={
                            practiseRound === 2 ? (
                                'bg-emerald-100 p-1 rounded w-1/2 h-fit dark:bg-mist-500' 
                            ) : ( 
                                'bg-sky-100 p-1 rounded w-1/2 h-fit dark:bg-slate-500'
                            ) }
                        >{card.term}</span>
                        <span className={
                            practiseRound === 2 ? (
                                'bg-emerald-100 p-1 rounded w-1/2 dark:bg-mist-500' 
                            ) : ( 
                                'bg-sky-100 p-1 rounded w-1/2 dark:bg-slate-500'
                            ) }
                        >{card.definition}</span>
                    </div>
                ))
            ) }
        </>
    </div>
  )
}
