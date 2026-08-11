import { useRef, useState } from "react";
import { PracticeCard } from "./PracticeCard";
import { useEffect } from "react";
import { useDeck } from "../context/CardContext";

import practiceRoundSFX from '../assets/practice_round.mp3';
import practiceCompleteSFX from '../assets/practice_complete.mp3';

export const Practice = () => {
    const { cardList, updateCard } = useDeck();

    const [practiceList, setPracticeList] = useState(
        cardList.filter(card => card.status === 'practising')
    );
    const [isPractise, setIsPractise] = useState(false);
    const [practiseRound, setPractiseRound] = useState(0);
    const [practisedCards, setPractisedCards] = useState(new Set());

    const audioRef = useRef({
        practiceRoundSFX: new Audio(practiceRoundSFX),
        practiceCompleteSFX: new Audio(practiceCompleteSFX)
    })

    function handleShuffle(e){
        e.preventDefault();
        setPracticeList(shuffle([...practiceList]));
    }

    function handleWordsSubmit(){
        practiceList.forEach(card => {
            updateCard(card.id, { status: 'learnt' });
        });
        setPracticeList([]);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    useEffect(() => {
        if(
            practiceList.length > 0 &&
            practisedCards.size === practiceList.length
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
    }, [practisedCards, practiceList.length])

  return (
    <div className="border border-gray-400 rounded-xl py-1 mb-10">
        <div className="flex justify-between">
            <div>
                <span className="text-xl font-semibold p-2">Practice</span>
                { isPractise ? (
                    <i onClick={() => setIsPractise(!isPractise)} className="bi bi-pause-circle text-2xl text-yellow-300 hover:drop-shadow-[0_0_10px_rgba(230,230,80,0.9)]"></i>
                ) : (
                    practiseRound === 2 ? (
                        <i onClick={handleWordsSubmit} className='bi bi-check-circle text-2xl text-green-700 hover:drop-shadow-[0_0_10px_rgba(80,230,80,0.9)]'></i>
                    ) : (
                        <i onClick={() => setIsPractise(!isPractise)} className='bi bi-play-circle text-2xl text-green-700 hover:drop-shadow-[0_0_10px_rgba(80,230,80,0.9)] '></i>
                    )
                    
                ) }
            </div>
            <div>
                {[...Array(2)].map((_, index) => (
                    <i
                        key={index}
                        className={`bi bi-check-square text-2xl mr-2 ${
                            index < practiseRound
                                ? "text-green-700"
                                : "text-gray-300"
                        }`}
                    ></i>
                ))}
            </div>
            <button onClick={handleShuffle} className="bg-blue-700 rounded px-4 py-1 m-2 text-white">Shuffle</button>
        </div>
        <>
            { isPractise ? (
                practiceList.map(card => (
                    <PracticeCard 
                        key={card.id}
                        card={card} 
                        isPractised={practisedCards.has(card.id)}
                        onPractised={(id) => {
                            setPractisedCards(prev => new Set(prev).add(id));
                        }}
                    />
                ))
            ) : (
                practiceList.map(card => (
                    <div className="p-2 flex gap-2.5">
                        <span className={
                            practiseRound === 2 ? (
                                'bg-emerald-100 p-1 rounded w-1/2 h-fit' 
                            ) : ( 
                                'bg-sky-100 p-1 rounded w-1/2 h-fit'
                            ) }
                        >{card.term}</span>
                        <span className={
                            practiseRound === 2 ? (
                                'bg-emerald-100 p-1 rounded w-1/2' 
                            ) : ( 
                                'bg-sky-100 p-1 rounded w-1/2 '
                            ) }
                        >{card.def}</span>
                    </div>
                ))
            ) }
        </>
    </div>
  )
}
