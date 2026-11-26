import { useState } from "react";

export const PageNotFound = () => {
    const repMultipliers = {
        3: 2.6,
        4: 2.3,
        5: 2.1,
        6: 2,
        7: 1.9
    }
    const testCard = {cardId: crypto.randomUUID(), userId: 57, term: 'test1', description: 'test1', reps: 1, lastReviewAt: new Date(), nextReviewAt: null };
    
    function spacedRepNextSchedule(card){
        const now = new Date();
        const MS_PER_DAY = 1000 * 60 * 60 * 24;
        
        if(card.reps === 1){
            const nextReview = now;
            nextReview.setDate(nextReview.getDate() + (Math.random() < 0.5 ? 5 : 6));

            return {
                ...card,
                lastReviewAt: now,
                nextReviewAt: nextReview,
                reps: card.reps + 1
            };
        }
        const interval = Math.floor(
            (now - new Date(card.lastReviewAt)) / MS_PER_DAY
        );

        const nextReview = new Date(now);
        nextReview.setDate(
            nextReview.getDate() + Math.floor(interval * repMultipliers[card.reps])
        );

        return {
            ...card,
            nextReviewAt: nextReview,
            lastReviewAt: now,
            reps: card.reps + 1
        };

    }

    const [card, setCard] = useState(testCard);

    function handleCardUpdate(){
        setCard(spacedRepNextSchedule(card));
    }

    return (
        <div className="text-3xl text-center flex flex-col justify-center items-center">Page Not Found 🤔
            <button 
                className="w-20 text-red-600 my-3 border-2 border-red-600 rounded px-2.5"
                onClick={handleCardUpdate}
            >Test</button>
            <h2>Card</h2>
            {Object.entries(card).map(([key, value]) => (
                <p key={key}>
                    <strong>{key}:</strong> {value instanceof Date ? value.toLocaleDateString() : String(value)}
                </p>
            ))}
        </div>
    )
}
