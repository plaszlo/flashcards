export const cardReducer = (state, action) => {
    const { type, payload } = action;
    switch(type){
        case 'ADD_TO_LIST':
            return {...state, cardList: payload.cardList}

        case 'REMOVE_FROM_LIST':
            return {...state, cardList: payload.cardList}

        default:
            throw new Error('No case found!');
    }
}