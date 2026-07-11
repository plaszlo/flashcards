import { createContext, useContext, useEffect, useReducer } from "react";
import { cardReducer } from "../reducer/cardReducer";

const initialState = {
    cardList: JSON.parse(localStorage.getItem('cardList') || '[]')
}

const CardContext = createContext(initialState);

export const CardProvider = ({children}) => {
    const [state, dispatch] = useReducer(cardReducer, initialState);

	useEffect(() => {
		localStorage.setItem('cardList', JSON.stringify(state.cardList));
	}, [state.cardList]);

	function addToList(card){
		const updatedList = [card, ...state.cardList]
		dispatch({
			type: 'ADD_TO_LIST',
			payload: {
				cardList: updatedList
			}
		});
	}

	function removeFromList(id){
		const updatedList = state.cardList.filter(
			card => card.id !== id
		);
		dispatch({
			type: 'REMOVE_FROM_LIST',
			payload: {
				cardList: updatedList
			}
		})
	}

	const value = {
		cardList: state.cardList,
		addToList,
		removeFromList
	};
	
	return (
		<CardContext.Provider value={value}>
			{children}
		</CardContext.Provider>
	);
}

export const useDeck = () => useContext(CardContext);