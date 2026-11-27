import { createContext, useContext, useEffect, useState } from "react";
import { fetchCardData, fetchStudyData } from "../services/cardService";
import { AuthContext } from "./AuthContext";

const CardContext = createContext();

export const CardProvider = ({children}) => {
	const [cards, setCards] = useState([]);
	const [calendarCards, setCalendarCards] = useState([]);
	const [dailyList, setDailyList] = useState([]);

	const { isLoggedIn } = useContext(AuthContext);
	
	useEffect(() => {
        if (!isLoggedIn) {
            setCards([]);
            return;
        }

        async function loadCards(){
            try {
                const data = await fetchCardData("GET");
                setCards(data);
            } catch (error) {
                console.error(error);
            }

			try {
				const data = await fetchStudyData("GET");
				setCalendarCards(data);

				const today = new Date().toISOString().split("T")[0];
				const todaysList = data.filter(card =>
					card.nextReview.split("T")[0] === today
				);

				setDailyList(todaysList);
			} catch (error) {
				console.error("Failed to fetch practice list:", error);
			}
        }
        loadCards();
    }, [isLoggedIn]);

	async function addCard(cardContent){
		try {
			const card = await fetchCardData("POST", null, cardContent);
			setCards(prevCards => [...prevCards, card]);
		} catch (error) {
			console.error(error);
		}
	}

	async function removeCard(cardId){
		try {
			await fetchCardData("DELETE", cardId);

			const updatedList = cards.filter(card => 
				card.cardId !== cardId);
				console.log(updatedList);
			setCards(updatedList);
		} catch (error) {
			console.error(error);
		}
	}

	async function updateCard(cardId, cardContent){
		try {
			await fetchCardData("PATCH", cardId, cardContent);

			const updatedList = cards.map(card => 
				card.cardId === cardId
				? { ...card, ...cardContent}
				: card
			);

			setCards(updatedList);
			console.log(updatedList);
		} catch (error) {
			console.error(error);
		}
	}

	function removeLapsed(lapsedIds) {
		setCards(prevCards =>
			prevCards.filter(card => !lapsedIds.includes(card.cardId))
		);
	}

	function updateDeck(/*amendedElements, updatedPart*/){
		

		// const updatedList = state.cardList.map(card => 
		// 	amendedElements.has(card.id)
		// 		? { ...card, ...updatedPart }
		// 		: card
		// )
		// dispatch({
		// 	type: 'UPDATE_LIST',
		// 	payload: {
		// 		cardList: updatedList
		// 	}
		// })
	}

	const value = {
		cards,
		calendarCards,
		dailyList,
		setDailyList,
		addCard,
		removeCard,
		updateCard,
		removeLapsed,
		updateDeck
	};
	
	return (
		<CardContext.Provider value={value}>
			{children}
		</CardContext.Provider>
	);
}

export const useDeck = () => useContext(CardContext);