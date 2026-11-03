import { useDeck } from "../context/CardContext";


export const useRepetitionManager = () => {
    const { updateCard } = useDeck();
 
    const schedule = [
        {date: new Date(2026, 7, 21), repetition: 0},
        {date: new Date(2026, 7, 21), repetition: 0},
        {date: new Date(2026, 7, 23), repetition: 0},
        {date: new Date(2026, 7, 23), repetition: 1},
        {date: new Date(2026, 7, 24), repetition: 0},
        {date: new Date(2026, 7, 24), repetition: 0},
        {date: new Date(2026, 7, 24), repetition: 1},
        {date: new Date(2026, 7, 24), repetition: 1}
    ]

    function scheduleDailyPractice(){
        const today = new Date();
        //is there any repetition cards?
    }

    function scheduleNextPractice(card){
        const date = new Date();

        switch(card.repetition){
            //useDeck..
            case 0:
                card.due = date.setDate(date.getDate() + (Math.random() < 0.5 ? 2 : 3));
                card.repetition += 1;
            case 1:
                card.due = date.setDate(date.getDate() + (card.daysSincePractice * 3))
        }
    }

  return null
}
