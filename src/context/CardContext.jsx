import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { fetchCardData } from "../services/cardService";
import { AuthContext } from "./AuthContext";
// import { cardReducer } from "../reducer/cardReducer";

const CardContext = createContext(/*initialState*/);

export const CardProvider = ({children}) => {
    // const [state, dispatch] = useReducer(cardReducer, initialState);
	const [cards, setCards] = useState([]);

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
		//cardList: state.cardList,
		cards,
		addCard,
		removeCard,
		updateCard,
		updateDeck
	};
	
	return (
		<CardContext.Provider value={value}>
			{children}
		</CardContext.Provider>
	);
}

export const useDeck = () => useContext(CardContext);